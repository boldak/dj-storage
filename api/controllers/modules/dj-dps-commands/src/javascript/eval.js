require('string-natural-compare');
var util = require("util");
var Promise = require("bluebird");
var vm = require("vm");
var uuid = require('uuid');
let _ = require("lodash-node");
let moment = require("moment")


var EvalImplError = function(message) {
    this.message = message;
    this.name = "Command 'evaluate' implementation error";
}
EvalImplError.prototype = Object.create(Error.prototype);
EvalImplError.prototype.constructor = EvalImplError;
var implementation = function(state, config){
        try {

                const sandbox = {};
                sandbox.$scope = state.storage;
                sandbox.$file = state.file;
                

                sandbox._ = _;
                sandbox.moment = moment

                sandbox._util = {

                    
                    uuid:uuid,

                    extractAbbreviation(s) {
                      let m = s.match(/\(([a-zA-Z0-9\_\.]*)\)/g)
                      return (m) ? m[0].substring(1,m[0].length-1) : null
                    },

                    extractTag(s){
                      let m = s.match(/\#([a-zA-Z0-9\_]*)\b/g)
                      return (m) ? m[0].substring(1) : null
                    },
                    
                    numberPrecisionMapper(digits,fields){
                        return item => {
                            fields = (fields) ? fields : Object.keys(item);
                            fields = ( util.isArray(fields) ) ? fields : [ fields ]
                            fields.forEach( v => {
                               item[v] =  (_.isNumber(item[v])) ? Number.parseFloat((item[v]/1).toFixed(digits)) : item[v]
                            })
                            return item
                        }
                    },

                    dateFormatMapper(format, fields){
                        return item => {
                            fields = (fields) ? fields : [] 
                            fields = ( util.isArray(fields) ) ? fields : [ fields ]
                            fields.forEach( v => {
                               item[v] = moment(new Date(item[v])).format(format)
                            })
                            return item
                        }
                    },

                    dateParseMapper(format, fields){
                        return item => {
                            fields = (fields) ? fields : [] 
                            fields = ( util.isArray(fields) ) ? fields : [ fields ]
                            fields.forEach( v => {
                               item[v] = moment(item[v], format)
                            })
                            return item
                        }
                    },

                    selectFieldsMapper(fields){
                        return item => {
                            fields = (fields) ? fields : [] 
                            fields = ( util.isArray(fields) ) ? fields : [ fields ]
                            let res = {}
                            fields.forEach( v => {
                               res[v] = item[v]
                            })
                            return res
                        }
                    },




                    format:{
                        date: (value,format) => {
                           format = format || "YYYY MM DD";
                           return  moment(new Date(value)).format(format)
                        }
                    },
                    
                    parse:{
                        number: value => (value / 1),
                        date: (value,format) => {
                            format = format || "YYYY MM DD";
                            return moment(value,format)
                        }
                    },

                    comparator:{

                      "String": {
                        
                        "A-Z" : selector => {
                          if(!selector){
                              return (a,b) => String.naturalCompare((a+'').toLowerCase(),(b+'').toLowerCase())
                            }  
                          return (a,b) => String.naturalCompare((selector(a)+'').toLowerCase(),(selector(b)+'').toLowerCase())
                        },
                        
                        "Z-A": selector => {
                          if(!selector){
                           return (a,b) => String.naturalCompare((b+'').toLowerCase(),(a+'').toLowerCase())
                          }
                          return (a,b) => String.naturalCompare((selector(b)+'').toLowerCase(),(selector(a)+'').toLowerCase())
                        }   
                      },

                      "Number": {
                        
                        "A-Z" : selector => {
                          if(!selector){
                              return (a,b) => a-b
                          }
                          return (a,b) => selector(a)-selector(b)
                        },
                        
                        "Z-A": selector => {
                            if(!selector){
                              return (a,b) => b-a
                            }  
                            return (a,b) => selector(b)-selector(a)
                        }     
                      },

                      "Date": {
                        
                        "A-Z" : selector => {
                          if(!selector){
                           return (a,b) => 
                            moment(new Date(a)).isBefore(moment(new Date(b)))
                          }
                          return (a,b) =>
                            moment(new Date(selector(a))).isBefore(moment(new Date(selector(b)))) 
                        },  
                        
                        "Z-A": selector => {
                          if(!selector){
                           return (a,b) =>
                             moment(new Date(b)).isBefore(moment(new Date(a)))
                          }
                          return (a,b) => 
                          moment(new Date(selector(b))).isBefore(moment(new Date(selector(a))))
                        }    
                      } 
                    }

                    
                };

                const script = new vm.Script(state.head.data);
                const context = new vm.createContext(sandbox);
                script.runInContext(context);
                                
                state.head = {
                    data: sandbox,
                    type: typeof sandbox
                }
                
                return state


            } catch (e) {
               throw new EvalImplError(e.toString())
            }
    }

module.exports = {
    name: "eval",
    synonims: {
        "eval": "eval",
        "evaluate": "eval",
        "js": "eval",
        "javascript": "eval"
    },

    defaultProperty: {},

    implementation:implementation,

    execute: function(command, state, config) {

        return new Promise(function(resolve, reject) {
            if (state.head.type != "string") reject( new EvalImplError("Incompatible context type: " + state.head.type+". Use context injection or 'str()' command to convert context to 'string' type"))
            try{
                resolve(implementation(state, config))
            } catch (e) {
                reject(new EvalImplError(e.toString()))
            }
        })
    },

    help: {
        synopsis: "Evaluate context as javascript",

        name: {
            "default": "eval",
            synonims: ["eval", "evaluate", "js","javascript"]
        },

        "default param": "none",
        input:["string"],
        output:"object",

        params: [],

        example: {
            description: "Create javascript callbacks",
            code:  "<?javascript\n    \n    var eqFirstMeta = function(a,b){\n      return a.metadata[0].id == b.metadata[0].id\n    }\n    \n    var nullCount = function(values){\n        return values.filter(function(d){\n            return d == null\n        }).length\n    };\n\n?>\n\nset('f')\n\nget('f.eqFirstMeta')\ninfo('eqFirstMeta')\ninfo()\n\nget('f.nullCount')\ninfo('nullCount')\ninfo()\n\nlog()\n"
        }
    }
}
