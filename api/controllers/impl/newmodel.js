var logger = require("dj-utils")log..global;
var jp = require("jsonpath");
var Waterline = require("waterline");
var fs = require('fs');

var NMImplError = function(message) {
    this.message = message;
    this.name = "Command 'model' implementation error";
}
NMImplError.prototype = Object.create(Error.prototype);
NMImplError.prototype.constructor = NMImplError;


var impl = function(data, params) {
    return new Promise(function(resolve) {
        resolve(sails.models.keys)
    })
}

module.exports = {
    name: "model",
    synonims: {
        "model":"model"
    },

    "internal aliases":{
        "model":"model",
        "for":"model"
    },

    defaultProperty: {
        "model":"model"
    },

   

    execute: function(command, state) {
        // let res = Object.keys(sails.hooks.orm);
        // let res = Object.keys(sails.models);
        fs.writeFileSync("./api/models/"+command.settings.name+".js", "module.exports = "+JSON.stringify(command.settings.model));
        sails.hooks.orm.reload();
        state.head = {
                            data: sails.models,
                            type: "json"
                        }

        return state;
                        
        // return new Promise( function(resolve,reject){
        //     try{
        //         sails.hooks.orm.normalizeModelDef(command.settings.model);
        //         newModel = Waterline.Collection.extend(sails.models[command.settings.name]);
        //         new newModel({}, function(err, collection) {
        //             sails.models[command.settings.name] = collection;
        //             state.head = {
        //                     data: sails.models[command.settings.name],
        //                     type: "json"
        //                 }
        //             resolve(state);        
        //         })
        //     }catch (e){
        //         reject (new NMImplError(e.toString()))
        //     }
        // })    
        
        // return new Promise(function(resolve, reject) {
        //     try {
        //         let res = [];
        //         let model = command.settings.model;
        //         if(model){
        //             if(sails.models[model] && typeof sails.models[model] == "object"){
        //                 res.push({model:model,schema:sails.models[model]._schema.schema})
        //             }else{
        //                  reject(new NMImplError("Cannot find model '"+model+"'"))
        //             }
        //         }else{
        //             for (key in sails.models){
        //                 if(typeof sails.models[key] == "object")
        //                 res.push({model:key,schema:sails.models[key]._schema.schema})
        //             }
        //         } 
                
        //         state.head = {
        //             data: res,
        //             type: "json"
        //         }
        //         resolve(state)
        //     } catch (e) {
        //         reject(new NMImplError(e.toString()))
        //     }

        // })
    },

    help: {
        synopsis: "Get Definition for Stored Collections",
        name: {
            "default": "model",
            synonims: ["model"]
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
