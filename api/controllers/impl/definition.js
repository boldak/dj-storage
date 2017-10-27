var Promise = require("bluebird");
var logger = require("dj-utils").log.global;
var jp = require("jsonpath");

var DefImplError = function(message) {
    this.message = message;
    this.name = "Command 'definition' implementation error";
}
DefImplError.prototype = Object.create(Error.prototype);
DefImplError.prototype.constructor = DefImplError;


var impl = function(data, params) {
    return new Promise(function(resolve) {
        resolve(sails.models.keys)
    })
}

module.exports = {
    name: "definition",
    synonims: {
        "definition":"definition",
        "def": "definition"
    },

    "internal aliases":{
        "model":"model",
        "for":"model"
    },

    defaultProperty: {
        "definition":"model",
        "def": "model"
    },

   

    execute: function(command, state) {
        return new Promise(function(resolve, reject) {
            try {
                let res = [];
                let model = command.settings.model;
                if(model){
                    if(sails.models[model] && typeof sails.models[model] == "object"){
                        res.push({model:model,schema:sails.models[model]._schema.schema})
                    }else{
                         reject(new DefImplError("Cannot find model '"+model+"'"))
                    }
                }else{
                    for (key in sails.models){
                        if(typeof sails.models[key] == "object")
                        res.push({model:key,schema:sails.models[key]._schema.schema})
                    }
                } 
                
                state.head = {
                    data: res,
                    type: "json"
                }
                resolve(state)
            } catch (e) {
                reject(new DefImplError(e.toString()))
            }

        })
    },

    help: {
        synopsis: "Get Definition for Stored Collections",
        name: {
            "default": "definition",
            synonims: ["definition", "def"]
        },
        input: ["none"],
        output: "json",
        "default param": "model",
        params: [{
            name: "model",
            synopsis: "Collection name. Retuns all definitions when collection name is undefined",
            type: ["string"],
            synonims: ["model", "for"],
            "default value": "undefined"
        }],
        example: {
            description: "Get Definition for All Stored Collections",
            code: "def()"
        }

    }
}
