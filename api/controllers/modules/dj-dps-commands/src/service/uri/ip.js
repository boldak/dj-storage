let uriUtils = require("./utils/uri")
let util = require("util")

class UriImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "uri utils error";
  }
}




module.exports = {
    name: "service.uri.ip",

    synonims: {
        "service.uri.ip": "service.uri.ip"
    },

    "internal aliases":{
        "data": "data",
        "selector": "selector"
    },

    defaultProperty: {
        "service.uri.ip": "data"
    },

        execute: function(command, state, config) {

        command.settings.data = (command.settings.data) ? command.settings.data : state.head.data
        
        if(!command.settings.data){
            throw new UriImplError("no data available")
        }
        
        let resType;
        
        if(util.isArray(command.settings.data)){
            resType = "array"
        } else {
            if(!util.isString(command.settings.data) && !command.settings.selector){
               throw new UriImplError("uri data must be String")    
            }
            resType = "string"
            command.settings.data = [command.settings.data]    
        }

        command.settings.selector = (command.settings.selector)
                                        ? (util.isArray(command.settings.selector))
                                            ? command.settings.selector
                                            : [command.settings.selector]
                                        : [null]     

        return new Promise( (resolve, reject) => {

            Promise.all(
                command.settings.data.map( (uri, index) => {
                        return new Promise( (resolve,reject) => {
                            Promise.all(
                                command.settings.selector.map( selector => {
                                    return new Promise((resolve,reject) => {
                                       let query = (selector) ? uri[selector] : uri;
                                    
                                        if(!query){
                                           reject(new UriImplError(`selector ${selector} fetch data: ${query} from item[${index}]`))
                                        }

                                        if (selector){
                                                uriUtils.resolveUrl(command.settings.data[index][selector])
                                                .then( address => {
                                                    // uriUtils.aboutIp(address)
                                                        // .then( data => {
                                                            // data.uri = command.settings.data[index][selector]
                                                            command.settings.data[index][selector] = {
                                                                uri: JSON.parse(JSON.stringify(command.settings.data[index][selector])),
                                                                ip: address
                                                            }
                                                            resolve(true)        
                                                        // })
                                                        // .catch( e => {
                                                        //     reject(new UriImplError(e))
                                                        // })
                                                })
                                                .catch( e => {
                                                    reject(new UriImplError(e))
                                                })
                                        } else {
                                                uriUtils.resolveUrl(command.settings.data[index])
                                                .then( address => {
                                                    // uriUtils.aboutIp(address)
                                                        // .then( data => {
                                                            // data.uri = command.settings.data[index]
                                                            // command.settings.data[index] =  JSON.parse(JSON.stringify(data))     
                                                            command.settings.data[index] = {
                                                                uri: JSON.parse(JSON.stringify(command.settings.data[index])),
                                                                ip: address
                                                            }
                                                            resolve(true)   
                                                        // })
                                                        // .catch( e => {
                                                        //     reject(new UriImplError(e))
                                                        // })
                                                })
                                                .catch( e => {
                                                    reject(new UriImplError(e))
                                                })
                                        } 
                                    })
                                })    
                            )
                            .then( () => { resolve(true) } )
                            .catch( e => { reject(new UriImplError(e)) })

                        })
                    })
            )
                
            .then(() => {
                if(resType == "array"){
                    state.head = {
                        type: "json",
                        data: command.settings.data
                    }
                    resolve( state )
                } else {
                    state.head = {
                        type: "json",
                        data: command.settings.data[0]
                    }
                    resolve( state )
                }
            })
            .catch( e => {
                reject (new UriImplError(e.toString())) 
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

