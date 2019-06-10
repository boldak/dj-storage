let natural = require("natural")
let TokenizerUK = require('../lib/tokenizers/aggressive_tokenizer_uk');
let util = require("util");

class TokenizeImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "nlp tokenizer error";
  }
}




module.exports = {
    name: "nlp.content.ngrams",

    synonims: {
        "nlp.content.ngrams": "nlp.content.ngrams"
    },

    "internal aliases":{
        "locale": "locale",
        
        "doc": "doc",
        "docs": "doc"
    },

    defaultProperty: {
        "nlp.content.ngrams": "doc"
    },

    execute: function(command, state, config) {

        command.settings.doc = (command.settings.doc) ? command.settings.doc : state.head.data
        command.settings.doc = (util.isArray(command.settings.doc)) ? command.settings.doc : [command.settings.doc]
        let originalLength = command.settings.doc.length 
        command.settings.doc = command.settings.doc.filter(item => util.isString(item))
        if(command.settings.doc.length < originalLength){
            throw new TokenizeImplError("no string data detected")
        }

        command.settings.locale = (command.settings.locale) ? command.settings.locale.toLowerCase() : "en"; //en ru uk 
        
        command.settings.length = (command.settings.length) ? command.settings.length : 2 


        let tokenizer = (command.settings.locale == "en")
                            ? new natural.AggressiveTokenizer()
                            : (command.settings.locale == "ru")
                                ? new natural.AggressiveTokenizerRu()
                                : (command.settings.locale == "uk")
                                    ? new TokenizerUK()
                                    : new natural.AggressiveTokenizer();

                                    

        try {
            
            state.head = {
                type: "json",
                data: command.settings.doc.map(item => natural.NGrams.ngrams(tokenizer.tokenize(item),command.settings.length))
            }

        } catch (e) {
            throw new TokenizeImplError(e.toString())
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

