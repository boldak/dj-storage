
let util = require("util")
let dict = require("i18n-iso-countries");



class ServiceCountriesError extends Error {
  constructor(message) {
    super(message);
    this.name = "Service Countries Error";
  }
}


let transform = (_from, _to, value, language) => {
    if(_from.toUpperCase() == "ALPHA2" && _to.toUpperCase() == "ALPHA3") return dict.alpha2ToAlpha3(value)
    if(_from.toUpperCase() == "ALPHA2" && _to.toUpperCase() == "NUMERIC") return dict.alpha3ToNumeric(value)
    if(_from.toUpperCase() == "ALPHA2" && _to.toUpperCase() == "NAME") return dict.getName(value, language)

    if(_from.toUpperCase() == "ALPHA3" && _to.toUpperCase() == "ALPHA2") return dict.alpha3ToAlpha2(value)
    if(_from.toUpperCase() == "ALPHA3" && _to.toUpperCase() == "NUMERIC") return dict.alpha3ToNumeric(value)
    if(_from.toUpperCase() == "ALPHA3" && _to.toUpperCase() == "NAME") return dict.getName(value, language)
    
    if(_from.toUpperCase() == "NUMERIC" && _to.toUpperCase() == "ALPHA2") return dict.numericToAlpha2(value)
    if(_from.toUpperCase() == "NUMERIC" && _to.toUpperCase() == "ALPHA3") return dict.numericToAlpha3(value)
    if(_from.toUpperCase() == "NUMERIC" && _to.toUpperCase() == "NAME") return dict.getName(value, language)


    
    return value          
}



module.exports = {
    name: "dict.countries.map",

    synonims: {
        "dict.countries.map": "dict.countries.map"
    },

    "internal aliases":{
        "from": "from",
        "to": "to",
        
        "selector": "selector",
        "fields": "selector",
        "field": "selector",
        "source":"selector",
        "sources":"selector",
        
        "dest": "dest",
        "destinaton": "dest",
        "destinatons": "dest",
        
        
        
        "data": "data",

        "language":"language",
        "lang":"language",
       
        "sLang":"language",
        "sLanguage":"language",
        
        "sourceLang":"language",
        "sourceLanguage":"language",
        
        "destLang":"destlanguage",
        "destLanguage":"destlanguage",
        
        "dLang":"destlanguage",
        "dLanguage":"destlanguage"
        


    },

    defaultProperty: {
        "dict.countries.map": "data"
    },

        execute: function(command, state, config) {

        command.settings.data = (command.settings.data) ? command.settings.data : state.head.data
        
        if(!command.settings.data){
            throw new ServiceCountriesError("no data available")
        }
        
        if(!command.settings.from){
            throw new ServiceCountriesError("source type not defined")
        }

        if(!command.settings.to){
            throw new ServiceCountriesError("destination type not defined")
        }

        command.settings.language = command.settings.language || "en" 
        command.settings.language = (command.settings.language == "ua") ? "uk" : command.settings.language

        
        
        
        let resType;
        
        if(util.isArray(command.settings.data)){
            resType = "array"
        } else {
            if(!util.isString(command.settings.data) && !command.settings.selector){
               throw new ServiceCountriesError("uri data must be String")    
            }
            resType = "string"
            command.settings.data = [command.settings.data]    
        }

        command.settings.selector = (command.settings.selector)
                                        ? (util.isArray(command.settings.selector))
                                            ? command.settings.selector
                                            : [command.settings.selector]
                                        : [null] 

        command.settings.dest = (command.settings.dest)
                                        ? (util.isArray(command.settings.dest))
                                            ? command.settings.dest
                                            : [command.settings.dest]
                                        : command.settings.selector 

        if(command.settings.selector.length != command.settings.dest.length){
            throw new ServiceCountriesError("sources and destinations is mismatch")
        }                                
                                            

        return new Promise( (resolve, reject) => {

            command.settings.data.map( (item, index) => {
                command.settings.selector.forEach( (s, sIndex) => {
                    item[command.settings.dest[sIndex]] = transform(command.settings.from, command.settings.to, item[s], command.settings.language)
                })
            })
            
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

