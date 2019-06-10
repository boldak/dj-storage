let natural = require("natural")
let StemmerUK = require('../lib/stemmers/porter_stemmer_uk');
let TokenizerUK = require('../lib/tokenizers/aggressive_tokenizer_uk');
let _=require("lodash-node");

let util = require("util");

class WordsImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "nlp stemmer error";
  }
}




module.exports = {
    name: "nlp.content.tokens",

    synonims: {
        "nlp.content.tokens": "nlp.content.tokens"
    },

    "internal aliases":{
        "locale": "locale",
        
        "doc": "doc",
        "docs": "doc"
    },

    defaultProperty: {
        "nlp.content.tokens": "doc"
    },

    execute: function(command, state, config) {

        command.settings.doc = (command.settings.doc) ? command.settings.doc : state.head.data
        command.settings.doc = (util.isArray(command.settings.doc)) ? command.settings.doc : [command.settings.doc]
        let originalLength = command.settings.doc.length 
        command.settings.doc = command.settings.doc.filter(item => util.isString(item))
        if(command.settings.doc.length < originalLength){
            throw new WordsImplError("no string data detected")
        }

        command.settings.locale = (command.settings.locale) ? command.settings.locale.toLowerCase() : "en"; //en ru uk 
        
        let stemmer = (command.settings.locale == "en")
                            ? natural.PorterStemmer
                            : (command.settings.locale == "ru")
                                ? natural.PorterStemmerRu
                                : (command.settings.locale == "uk")
                                    ? StemmerUK
                                    : natural.PorterStemmer;

        let tokenizer = (command.settings.locale == "en")
                            ? new natural.AggressiveTokenizer()
                            : (command.settings.locale == "ru")
                                ? new natural.AggressiveTokenizerRu()
                                : (command.settings.locale == "uk")
                                    ? new TokenizerUK()
                                    : new natural.AggressiveTokenizer();                            

        
        let tokens =  command.settings.doc.map(item => tokenizer.tokenize(item))
        let temp = []
        tokens.forEach( item => { temp = _.union(temp,item)})
        tokens = temp.map( item => item)
        tokens = _.sortByOrder(tokens)
        
        let stems =  command.settings.doc.map(item => stemmer.tokenizeAndStem(item))
        temp = []
        stems.forEach( item => { temp = _.union(temp,item)})
        stems = temp.map( item => item)

        stems = _.sortByOrder(stems)    

        let result = _.object(tokens.map(item => [item,'']))
        tokens.forEach( t => {
            let d = stems.map( s => {
                let a,b;
                if(s.length >= t.length){
                    a = s; b = t.toLowerCase();
                } else {
                    b = s; a = t.toLowerCase();
                }

                let measure = natural.LevenshteinDistance(a,b, {search: true})
                if(measure.substring != s ||  a[0]!=b[0]) measure.distance = 32000


                return {stem:s, distance:measure.distance }
            })
            let min = _.min(d,"distance")
            // console.log(min)
            if(min.distance < 32000) result[t] = min.stem//.push(t)//({token:t, distance:min.distance})
        })


        try {
            
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

