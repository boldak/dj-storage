var iconv = require('iconv-lite');
// iconv.extendNodeEncodings();


var Promise = require("bluebird");
var http = require('request-promise');
var js = require("../../javascript/eval").implementation;
var set = require("../..//var/set").implementation;
let util = require("util");


var SourceImplError = function(message) {
    this.message = message;
    this.name = "Command 'source' implementation error";
}
SourceImplError.prototype = Object.create(Error.prototype);
SourceImplError.prototype.constructor = SourceImplError;



var getUrl = function(url,encode) {
    return new Promise(function(resolve, reject) {
        try {
            encode = encode || "utf8";
            if(['win1251','utf8'].indexOf(encode)<0){
                reject(new SourceImplError("Encoding "+ encode+" not recognized. Use 'win1251' or 'utf8'"))
                
            }else{

                var options = {
                    // localAddress: url,
                    uri: url,
                    method: "get",
                    encoding: encode
                }

                http(options)
                    .then(function(result) {
                       resolve(result)
                    })
                    .catch(function(e) {
                        reject(new SourceImplError(e.toString()))
                    })
            }
                    
        } catch(e) {
            reject(new SourceImplError(e.toString()))
        }    
    })
}


var impl = function(params) {

    if (params.url) {
        return getUrl(params.url, params.encode)
    }

    throw new SourceImplError("Data not found");
}

module.exports = {
    name: "dml.load",

    synonims: {
        "dml.load": "dml.load"
    },

    "internal aliases": {
        "url":      "url",
        "uri":      "url",
        "href":     "url",
        "as":       "as",
        "type":     "as",
        "cast":     "as",
        "to":       "var",
        "var":      "var",
        "into":     "var",
        "encode":       "encode",
        "encoding":     "encode"
    },

    defaultProperty: {
        "dml.load" : "url"
    },

    execute: function(command, state) {
       return new Promise(function(resolve, reject) {
            state.locale = (state.locale) ? state.locale : "en";
            command.settings.locale = state.locale;
            command.settings.as = command.settings.as || "string"
            impl(command.settings)
                .then(function(result) {
                    if (command.settings.as == "json") {
                        
                        if (util.isString(result)) {
                            result = JSON.stringify(result)
                            result = JSON.parse(result)
                        }
                        
                        state.head = {
                            type: "json",
                            data: result
                        }
                        if (command.settings.var) {
                            state = set(command.settings.var, '', state)
                        }
                        resolve(state);
                    } else if (command.settings.as == "javascript") {
                        if (util.isString(result)) {
                            state.head = {
                                type: typeof result,
                                data: result
                            };
                            state = js(state);
                            if (command.settings.var) {
                                state = set(command.settings.var, '', state)
                            }

                            resolve(state)
                        }
                    } else {
                        state.head = {
                            type: command.settings.as,
                            data: result
                        }
                        if (command.settings.var) {
                            state = set(command.settings.var, '', state)
                        }
                        resolve(state);
                    }
                })
                .catch(function(e) {
                    reject(e)
                })
        })
    },

    help: {
        synopsis: "Get data from source. Available sources: dataset, cached data, external url",
        name: {
            "default": "source",
            synonims: ["source", "src"]
        },
        "default param": "None. Shuld be assigned one from: 'dataset', 'cache', 'url'",

        input: ["any"],
        output: "type of fetched data",

        params: [{
            name: "dataset",
            synopsis: "UUID for dataset (optional). Use command 'meta()' for find datasets.",
            type: ["dataset UUID"],
            synonims: ["dataset", "ds"],
            "default value": "undefined"
        }, {
            name: "cache",
            synopsis: "UUID for cached data (optional). Use command 'cache()' for cache context. ",
            type: ["cached data UUID"],
            synonims: [],
            "default value": "undefined"
        }, {
            name: "url",
            synopsis: "Url for data (optional). You can process external data via url.",
            type: ["url"],
            synonims: ["url", "uri", "ref"],
            "default value": "undefined"
        }],
        example: {
            description: "Get data from various sources",
            code: "load(\n    ds:'47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02',\n    as:'dataset')\n\nload(\n    cache:'5855481930d9ae60277a474a',\n    as:'table'\n)\n\nimport(\n    url:'http://127.0.0.1:8080/api/resource/scripting-js.js',\n    as:'javascript'\n)\n\nload(\n    url:'http://127.0.0.1:8080/api/resource/scripting-csv.csv',\n    as:'csv'\n)\n\nload(\n    url:'http://127.0.0.1:8080/api/resource/scripting-xml.xml',\n    as:'xml'\n)\n\nload(\n    url:'http://127.0.0.1:8088',\n    as:'html'\n)\n"

        }

    }
}
