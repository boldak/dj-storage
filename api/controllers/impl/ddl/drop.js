var fs = require('fs');
var Promise = require("bluebird");
var del = require("del");

class DDLDropImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "ddl.drop error";
  }
}

module.exports = {
    name: "ddl.drop",
    synonims: {
        "ddl.drop":"ddl.drop",
        "ddl.destroy":"ddl.drop"
    },

    "internal aliases":{
        "model":"model",
        "for":"model",
        "entity":"model",
        "collection":"model"
    },

    defaultProperty: {
        "ddl.drop":"model",
        "ddl.destroy":"model"
    },

   

    execute: function(command, state) {
        return new Promise((resolve, reject) => {
            Entities
                .findOne({name:command.settings.model.toLowerCase()})
                .then((col) => {
                    if (!col){
                        reject(new DDLDropImplError(`Collection '${command.settings.model}' not found`))
                        return
                    }

                    del(`./api/models/${command.settings.model}.js`)
                    .then (() => {
                        try {
                            Entities.destroy({name: command.settings.model})
                            .then((res) => {
                                try {
                                    sails.hooks.orm.reload();
                                    state.head = {
                                                data: res,
                                                type: "json"
                                             }
                                    sails.once("hook:orm:reloaded", () => {
                                      console.log("drop:hook:orm:reloaded")  
                                      resolve(state);
                                    })
                                } catch (e) {
                                    reject(new DDLDropImplError(e.toString())) 
                                }                
                            })             
                        } catch (e) {
                            reject(new DDLDropImplError(e.toString())) 
                        }    
                    })
                    .catch (e =>  reject (new DDLDropError(e.toString())))
                })         
        })
    },

    help: {
        synopsis: "Create new entity collection",
        name: {
            "default": "ddl.create",
            synonims: ["ddl.entity"]
        },
        input: ["waterline model description"],
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
