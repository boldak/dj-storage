var fs = require('fs');
var Promise = require("bluebird");

class DDLCreateImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "ddl.create error";
  }
}

module.exports = {
    name: "ddl.create",
    synonims: {
        "ddl.create":"ddl.create"
    },

    "internal aliases":{
        "model":"model",
        "for":"model",
        "entity":"model",
        "collection":"model",
        "schema":"schema",
        "as": "model",
        "type": "name"
    },

    // ddl.create(type: "user", as:{{schema}})
    // ddl.create(type: "user", schema:{{schema}})

    defaultProperty: {
        "ddl.create":"schema"
    },

   

    execute: function(command, state) {
        return new Promise((resolve, reject) => {

            command.settings = command.settings || {};
            
            if(command.settings.name && !command.settings.model) reject(new DDLCreateImplError(`Type description for collection ${command.settings.name} is undefined.`))
            if(!command.settings.name && command.settings.model) reject(new DDLCreateImplError(`Collection name for ${JSON.stringify(command.settings.model)} is undefined.`))
            if (command.settings.schema && !command.settings.schema.name) reject(new DDLCreateImplError(`Schema name for ${JSON.stringify(command.settings.schema.collections)} is undefined.`))      
            if (command.settings.schema && !command.settings.schema.collections) reject(new DDLCreateImplError(`Collections description for schema ${command.settings.schema.name} is undefined.`))      
            
            let models = [];

            if (command.settings.schema){
                for(let [name, model] of Object.entries(command.settings.schema.collections)) {
                    models.push({
                       name:name,
                       schema: command.settings.schema.name,
                       model: model 
                    })
                }
            }else if (command.settings.model){
                models.push({
                    schema:"GLOBAL",
                    name: command.settings.name,
                    model: command.settings.model
                })
            }

            Promise.all( models.map((model) => {
                return new Promise((resolve,reject) =>{
                        Entities
                        .findOne({name:model.name.toLowerCase()})
                        .then((col) => {
                            if (col){
                                reject(new DDLCreateImplError(`Doublicate '${model.name}' collection`))
                                return
                            }

                            fs.writeFileSync(   `./api/models/${model.name}.js`, 
                                        `module.exports = ${JSON.stringify(model.model)}`
                                    );

                            Entities
                                .create(model)
                                .then((res) => {
                                    resolve(res)
                                })
                                .catch((e) => {
                                    reject (new DDLCreateImplError(e.toString()))
                                })
                        })
                    })
                })
            )
            .then(() => {
                state.head = {
                    data: models,
                    type: "json"
                }
                resolve(state)
            })
            .catch((e) => {
                reject(new DDLCreateImplError(e.toString())) 
            })
        })
    },    
            
            // Entities
            //     .findOne({name:command.settings.name.toLowerCase()})
            //     .then((col) => {
            //         if (col){
            //             reject(new DDLCreateImplError(`Doublicate '${command.settings.name}' collection`))
            //             return
            //         }

            //         fs.writeFileSync(   `./api/models/${command.settings.name}.js`, 
            //                     `module.exports = ${JSON.stringify(command.settings.model)}`
            //                 );
            //         try {
            //             Entities.create({
            //                 name: command.settings.name,
            //                 schema: command.settings.model
            //             }).then((res) => {
            //                 try {
            //                     sails.hooks.orm.reload();
            //                     state.head = {
            //                                 data: res,
            //                                 type: "json"
            //                              }
            //                     sails.once("hook:orm:reloaded", () => {
            //                       console.log("create:hook:orm:reloaded")  
            //                       resolve(state);
            //                     })
            //                 } catch (e) {
            //                     reject(new DDLCreateImplError(e.toString())) 
            //                 }                
            //             })             
            //         } catch (e) {
            //             reject(new DDLCreateImplError(e.toString())) 
            //         }        
            //     })         
    //     })
    // },

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
