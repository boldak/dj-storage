let http = require('request-promise');




let util = require("util")

class NlpImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "nlp service error";
  }
}




module.exports = {
    name: "service.nlp.tokens",

    synonims: {
        "service.nlp.tokens": "service.nlp.tokens"
    },

    "internal aliases":{
        "text": "text"
    },

    defaultProperty: {
        "service.nlp.tokens": "text"
    },

        execute: function(command, state, config) {

	        command.settings.data = (command.settings.data) ? command.settings.data : state.head.data
	        // command.settings.selector = "persone"

	        if(!command.settings.data){
	            throw new UriImplError("no data available")
	        }
	        
	        
	        
	        return new Promise( (resolve, reject) => {

	            http({
				    uri: "http://localhost:8081/token",
				    method: "POST",
				    body: {
				        text: command.settings.data
				    },
				    json: true
				})
				.then(data => {
					let res = data //JSON.parse(data)
					return res
				})
	            .then( data => {
	                state.head = {
	                        type: "json",
	                        data
	                    }
	                    resolve( state )
	            })
	            .catch( e => {
	                reject (new NlpImplError(e.toString())) 
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

