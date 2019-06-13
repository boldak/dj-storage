const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4713697fa6024dccaee7ed8f03f728f3');
const util = require("util");
const moment = require("moment");

class GoogleNewsError extends Error {
  constructor(message) {
    super(message);
    this.name = "Google News error";
  }
}




module.exports = {
    name: "service.google.news",

    synonims: {
        "service.google.news": "service.google.news"
    },

    "internal aliases":{
        "query": "query",
        "q": "query",
        "from": "from",
        "startAt": "from",
        "to": "to",
        "stopAt": "to",
        "pageSize": "pageSize",
        "max" : "pageSize"
    },

    defaultProperty: {
         "service.google.news": "query"
    },

    execute: function(command, state, config) {

        if(!command.settings.query) throw new GoogleNewsError("empty query detected")
        
        command.settings.from = (command.settings.from)
            ? moment(new Date(command.settings.from)).format("YYYY-MM-DD")
            : moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD")  
        
        command.settings.to = (command.settings.to)
            ? moment(new Date(command.settings.to)).format("YYYY-MM-DD")
            : moment(new Date()).format("YYYY-MM-DD")  
        
        command.settings.pageSize = command.settings.pageSize || 100 

        return new Promise( (resolve, reject) => {
            newsapi.v2.everything({
              q: command.settings.query,
              // category: 'politics',
              // sources: 'bbc-news,the-verge',
              // domains: 'bbc.co.uk,techcrunch.com',
              from: command.settings.from,
              to: command.settings.to,
              // language: 'en',
              sortBy: 'relevancy',
              pageSize:command.settings.pageSize
            })
                .then( result => {
                    state.head = {
                            type: "json",
                            data: result
                        }
                    resolve( state )
                })
                .catch(e => { reject(new GoogleNewsError(e.toString())) })

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

