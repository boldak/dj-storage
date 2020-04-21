let http = require('request-promise');
let util = require("util")
let getSelection = require("./util").getSelection


class CypherImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "cypher service error";
  }
}


const GRAPHENEDB_URL = null;
// "https://app83770167-ShU0I2:b.rIQ7MDqlCGPG.UiYEitJt5P1GbpW3@hobby-nlhgecabchbdgbkegbhaepel.dbs.graphenedb.com:24780"
const headers = {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
                        "Authorization": "Basic YXBwODM3NzAxNjctU2hVMEkyOmIucklRN01EcWxDR1BHLlVpWUVpdEp0NVAxR2JwVzM=",
                        "Sec-Fetch-Site": "none",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Dest": "empty",
                        "Cookie": "_ga=GA1.2.1756611434.1587206549; ajs_user_id=null; ajs_group_id=null; ajs_anonymous_id=%22c6069a6d-ecce-4bfb-908b-40a067964ee1%22; _gid=GA1.2.1215143817.1587454556; _cio=8c5c3d2d-08a0-2eb7-d30c-c2c04d713438; _graphenedb_token=b.GdfL8KLVTAHe.IC7OrhC2gxCXLDTp0"
                }


module.exports = {
    name: "service.cypher",

    synonims: {
        "service.neo4j": "service.cypher"
    },

    "internal aliases":{
        "query": "query",
        "selector": "query",
        "on": "url",
        "at": "url",
        "url": "url"
          
    },

    defaultProperty: {
        "service.cypher": "query",
        "service.neo4j": "query"
    },

        execute: function(command, state, config) {

	        command.settings.query = command.settings.query || ((command.settings.data) ? command.settings.data : state.head.data)
	        
            command.settings.url = (
                    command.settings.url 
                    || 
                    GRAPHENEDB_URL
                    ||
                    process.env.GRAPHENEDB_URL 
                    || "http://127.0.0.1:7474"
            )+"/db/data/cypher"
            
            command.settings.populate = command.settings.populate || []
            command.settings.populate = _.isArray(command.settings.populate) ? command.settings.populate : [command.settings.populate]

	        if(!command.settings.query){
	            throw new CypherImplError("no query available")
	        }
	        
	        return new Promise( (resolve, reject) => {

                http({
                    uri: command.settings.url,
                    method: "POST",
                    headers,
                    body: {
                        query: command.settings.query
                    },
                    json: true
                })
                .then( res => {
                    // console.log("POPULATE")
                    let promises = _.flatten(command.settings.populate.map( p => getSelection(res,p))).map(p => 
                        http({
                            uri: p.value,
                            method: "GET",
                            headers,
                            json: true
                        }).then( d => {
                            // console.log("populate",d)
                            _.set( res, p.path, d )
                        }).catch( e => {
                            reject( new CypherImplError(e.toString()))
                        })
                    )

//                     command.settings.populate.forEach( p => {
                        
                        




























//                         let value = _.get(res,p) 
//                         if( value ) {

//                             if( _.isString(value) ){
//                                 promises.push (
//                                     http({
//                                         uri: value,
//                                         method: "GET",
//                                         json: true
//                                     }).then( d => {
//                                         _.set( res, p, d )
//                                     }).catch( e => new CypherImplError(e.toString()))
//                                 )
//                             } else if( _.isArray(value) ){
//                                 value.forEach( (p1, idx1) => {
//                                     promises.push (
//                                         http({
//                                         uri: p1,
//                                         method: "GET",
//                                         json: true
//                                         }).then( d => {
//                                             _.set( res,`${p}[${idx1}]`, d )
//                                         }).catch( e => new CypherImplError(e.toString()))
//                                     )        
//                                 })
//                             } else promises.push( new Promise( () =>{
//                                 reject(new CypherImplError(`Populated attribute "${p}" is not a String or an Array: 
// ${JSON.stringify(_.get(res, p), null, " ")}`))
//                             }))

//                         } else {

//                             promises.push( new Promise( () => {
//                                 reject(new CypherImplError(`Populated property "${p}" not found.`))
//                             }))        
//                         }
//                     })    

                    Promise.all(promises).then( () => {
                        state.head = {
                            type: "json",
                            data: res
                        }
                        resolve( state )    
                    })
                    .catch( e => {
                        reject (new CypherImplError(e.toString())) 
                    })
                }) 
                .catch( e => {
                    reject (new CypherImplError(e.toString())) 
                })
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

