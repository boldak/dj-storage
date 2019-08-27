const util = require("util");
const moment = require("moment");
const elasticsearch = require('elasticsearch');

class ElasticsearchError extends Error {
  constructor(message) {
    super(message);
    this.name = "Elasticsearch error";
  }
}




module.exports = {
    name: "service.elasticsearch",

    synonims: {
        "service.elasticsearch": "service.elasticsearch",
        "service.esearch": "service.elasticsearch",
        "service.es": "service.elasticsearch",
            
    },

    "internal aliases":{
        "command":"command",
        "cmd":"command",
        "params": "params",
        "args": "params",
        
        "from": "from",
        "options": "from",
        
        "map": "map",
        "return":"map",
        "returns":"map"
    },

    defaultProperty: {},

    execute: function(command, state, config) {
        console.log(command)
        command.settings.command = command.settings.command || "ping" 
        command.settings.command = command.settings.command.trim()

        command.settings.params = command.settings.params || {} 



        // if(!command.settings.from) throw new ElasticsearchError("empty options detected")    
        // if(!command.settings.from.host) throw new ElasticsearchError("empty options.host detected")

        command.settings.from = command.settings.from || { host : "https://scoaoq6kst:l2emn6tqdl@alder-369811443.eu-west-1.bonsaisearch.net:443"}   

        command.settings.map = (command.settings.map) ? command.settings.map : (d => d)
        if(!_.isFunction(command.settings.map)) throw new ElasticsearchError("map is not a function")

        console.log(command.settings.from)    
        return new Promise( (resolve, reject) => {

            // let invoker = new elasticsearch.Client(command.settings.from);
            // try {
            //     command.settings.command.forEach( c => {
            //         invoker = invoker[c]
            //     })    
            // } catch (e) {
            //     throw new ElasticsearchError(`command ${command.settings.command.join(".")} not available`) 
            // }
            
            // if(!invoker) throw new ElasticsearchError(`command ${command.settings.command.join(".")} not available`) 
            // console.log("invoker for ", command.settings.command.join("."), invoker)   

            let options = _.extend({}, command.settings.from)

            let client = new elasticsearch.Client(options);
            let scriptable = `(() => 
                client.${command.settings.command}(${JSON.stringify(command.settings.params)})
            ).apply(this)
            `
            console.log(scriptable)
            eval(scriptable)
                .then( response => {
                     state.head = {
                            type: "json",
                            data: command.settings.map(response)
                        }
                    resolve( state )
                })
                .catch( e => {
                    reject(new ElasticsearchError(e.toString()))
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

