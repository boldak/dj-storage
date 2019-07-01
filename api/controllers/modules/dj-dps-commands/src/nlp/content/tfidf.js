let natural = require("natural")
let TfIdf = natural.TfIdf;
let tfidf = new TfIdf();
let _=require("lodash-node");



let util = require("util");

class WordsImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "nlp content error";
  }
}




module.exports = {
    name: "nlp.content.tfidf",

    synonims: {
        "nlp.content.tfidf": "nlp.content.tfidf"
    },

    "internal aliases":{
        
        "doc": "doc",
        "docs": "doc",
        "tokens":"keywords",
        "keywords": "keywords"
    },

    defaultProperty: {
        "nlp.content.tfidf": "doc"
    },

    execute: function(command, state, config) {
        
        if(!command.settings.doc){
            throw new WordsImplError("no documents detected")
        }

        command.settings.doc = (util.isArray(command.settings.doc)) ? command.settings.doc : [command.settings.doc]
        
        
        command.settings.keywords = (command.settings.keywords) ? command.settings.keywords : state.head.data
        command.settings.keywords = (util.isArray(command.settings.keywords)) ? command.settings.keywords : [command.settings.keywords]
        
        command.settings.doc.forEach( d => {
            tfidf.addDocument(d)
        })

        try {

            let result = command.settings.keywords.map( k =>  {
                return {
                    keyword: k,
                    tfidf: command.settings.doc.map( (d,idx) => tfidf.tfidf(k, idx))//.reduce((s,item) => s+item, 0)/command.settings.doc.length          
                }
            })
            
            
            state.head = {
                type: "json",
                data: result
            }

        } catch (e) {
            throw new WordsImplError(e.toString())
        }
        return state;
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

