let http = require('request-promise');




let util = require("util")

class NlpImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "nlp service error";
  }
}

// let createTagSequence = (text, tags) => {
//     let res = []
//     tags.forEach( (p, index) => {
//         let prev = tags[index-1]
//         let textSpan = {
//             start: (!prev) ? 0 : prev.span.start+prev.span.length + 1 ,
//             length: (!prev) ? p.span.start -1 : p.span.start - 1 - prev.span.start - prev.span.length - 1 
//         }
//         res.push({
//             token:"UNRECOGNIZED",
//             value: text.substr(textSpan.start,textSpan.length),
//             span: textSpan
//         })
//         res.push(p)
//     })
//     let last = _.last(tags)
//     res.push({
//             token:"UNRECOGNIZED",
//             value: text.substring(last.span.start+last.span.length+1),
//             span: {
//                 start: last.span.start+last.span.length+1,
//                 length: text.length - (last.span.start+last.span.length+1)
//             }
//     })
//     return res.filter( r => r.span.length > 0)
// }

let createTagSequence = (text, tags) => {

    let res = []
    tags.forEach( (p, index) => {
        let prev = tags[index-1]
        let textSpan = {
            start: (!prev) ? 0 : prev.span.start+prev.span.length ,//+ 1 ,
            length: (!prev) ? p.span.start -1 : p.span.start - 1 - prev.span.start - prev.span.length //- 1 
        }
        res.push({
            token:"UNRECOGNIZED",
            value: text.substr(textSpan.start,textSpan.length),
            span: textSpan
        })
        p.text = text.substr(p.span.start,p.span.length)
        res.push(p)
    })
    
    let last = _.last(tags)
    res.push({
            token:"UNRECOGNIZED",
            value: text.substring(last.span.start+last.span.length),//+1),
            span: {
                start: last.span.start+last.span.length, //+1,
                length: text.length - (last.span.start+last.span.length+1)
            }
    })
    
    res = res.filter( r => r.span.length > 0).map( t => new Promise((resolve, reject) => {
        if(t.token == "UNRECOGNIZED"){
            http({
                uri: `http://localhost:8081/token`,
                method: "POST",
                body: {
                    text: t.value
                },
                json: true
            })
            .then(res => {
                resolve( res.map( r => ({
                    token: "UNRECOGNIZED",
                    value: r.value,
                    span:{
                        start: t.span.start + r.span.start,
                        length: r.span.length
                    }
                })))
            })
            .catch( e => {
                reject (new NlpImplError(e.toString())) 
            })
        } else {
            resolve([t])
        }
    }))

    return Promise.all(res)
    .then( tokens => {
        let result = []
                        
        tokens.forEach( r => {
            result = result.concat(r)
        })

        return result.sort((a,b) => a.span.start - b.span.start)
    })
    .catch( e => {
        reject (new NlpImplError(e.toString())) 
    })
}


module.exports = {
    name: "service.nlp.ner",

    synonims: {
        "service.nlp.entities": "service.nlp.ner"
    },

    "internal aliases":{
        "selector": "selector",
        "type": "selector",
        "text": "data",
        "data": "data"
          
    },

    defaultProperty: {
        "service.nlp.ner": "selector",
        "service.nlp.entities": "selector"
    },

        execute: function(command, state, config) {

	        command.settings.data = (command.settings.data) ? command.settings.data : state.head.data
	        command.settings.selector = command.settings.selector || "all"

            
	        if(!command.settings.data){
	            throw new UriImplError("no data available")
	        }
	        
	        
	        
	        return new Promise( (resolve, reject) => {

                if( command.settings.selector == "all"){
                    Promise.all( 
                        ["persone", "position", "date", "geo", "uri", "number"].map( p => 
                            http({
                                uri: `http://localhost:8081/ner/${p}`,
                                method: "POST",
                                body: {
                                    text: command.settings.data
                                },
                                json: true
                            })
                            .catch( e => {
                                reject (new NlpImplError(e.toString())) 
                            })
                        )    
                    )
                    .then( res => {
                        let result = []
                        
                        res.forEach( r => {
                            result = result.concat(r)
                        })

                        createTagSequence(command.settings.data, result.sort((a,b) => a.span.start - b.span.start))
                        .then(res => {
                            state.head = {
                                type: "json",
                                data: res
                            }
                            resolve( state )    
                        })
                        .catch( e => {
                            reject (new NlpImplError(e.toString())) 
                        })    
                    })
                    .catch( e => {
                        reject (new NlpImplError(e.toString())) 
                    })
                   
                } else {
        
                    http({
                        uri: "http://localhost:8081/ner/"+command.settings.selector,
                        method: "POST",
                        body: {
                            text: command.settings.data,
                            rules: command.settings.rules
                        },
                        json: true
                    })
                    .then( data => {
                        return createTagSequence( command.settings.data, data )
                        .then( res => {
                            state.head = {
                                    type: "json",
                                    data: res //(command.settings.selector == "custom") ? data : createTagSequence( command.settings.data, data )
                                }
                                resolve( state )
                        })
                        .catch( e => {
                            reject (new NlpImplError(e.toString())) 
                        })
                    })
                    
                    .catch( e => {
                        reject (new NlpImplError(e.toString())) 
                    })
    
                }
	        })
    	},

    help: {
        synopsis: "Tokenize document",

        name: {
            "default": "rank",
            synonims: []
        },
        input:["table"],
        output:"table",
        "default param": "indexes",
        params: [{
            name: "direction",
            synopsis: "Direction of iteration (optional)",
            type:["Rows", "row", "Columns", "col"],
            synonims: ["direction", "dir", "for"],
            "default value": "Columns"
        }, {
            name: "indexes",
            synopsis: "Array of 0-based indexes of items that will be ranked (optional)",
            type:["array of numbers"],
            synonims: ["indexes", "items"],
            "default value": []
        }, {
            name: "asc",
            synopsis: "Define order (optional)",
            type:["A-Z", "az", "direct", "Z-A", "za", "inverse"],
            synonims: ["order", "as"],
            "default value": "A-Z"
        }],
        example: {
            description: "Rank first column values",
            code:   "load(\r\n    ds:'47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02',\r\n    as:\"dataset\"\r\n)\r\nproj([\r\n  { dim:'time', role:'row', items:[] },\r\n  { dim:'indicator', role:'col', items:[] }\r\n])\r\n\r\nrank(for:\"col\",items:[0],as:\"az\")\r\n\r\norder(by:0, as:\"az\")\r\n\r\n"
        }
    }
}

