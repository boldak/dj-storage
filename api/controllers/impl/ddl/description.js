var Promise = require("bluebird");


class DefImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "ddl.description error";
  }
}



module.exports = {
    name: "ddl.description",
    synonims: {
        "ddl.description": "ddl.description",
        "ddl.definition":"ddl.description",
        "ddl.def": "ddl.description",
        "ddl.desc": "ddl.description"
    },

    "internal aliases":{
        "model":"model",
        "for":"model",
        "entity": "model",
        "collection": "model"
    },

    defaultProperty: {
        "ddl.description":"model",
        "ddl.def": "model",
        "ddl.definition": "model",
        "ddl.desc": "model"
    },

   

    execute: function(command, state) {

        return new Promise(function(resolve, reject) {

            let model = command.settings.model;
            console.log("run description")
                if(model){
                    Entities.findOne({name:model})
                    .then((res) => {
                        if (!res) reject(new DefImplError(`Cannot find model '${model}'`))
                        state.head = {
                            data: res,
                            type: "json"
                        }
                        resolve(state)    
                    })
                    .catch( e => reject(new DefImplError(e.toString())))
                } else {
                    Entities.find({})
                    .then((res) => {
                        state.head = {
                            data: res,
                            type: "json"
                        }
                        resolve(state)    
                    })
                    .catch( e => reject(new DefImplError(e.toString())))
                }    



            // try {
            //     let res = [];
            //     let model = command.settings.model;
            //     if(model){
            //         if(sails.models[model] && typeof sails.models[model] == "object"){
            //             res.push({model:model,schema:sails.models[model].definition})//_schema.schema})
            //         }else{
            //              reject(new DefImplError(`Cannot find model '${model}'`))
            //         }
            //     }else{
            //         for (key in sails.models){
            //             console.log(`@ ${key} \n ${sails.models[key]}`)
            //             if(typeof sails.models[key] == "object"){
            //                 console.log(sails.models[key])
            //                 res.push({model:key,schema:sails.models[key].definition})//_schema.schema})
            //             }    
            //         }
            //     } 
                
            //     state.head = {
            //         data: res,
            //         type: "json"
            //     }
            //     resolve(state)
            // } catch (e) {
            //     reject(new DefImplError(e.toString()))
            // }

        })
    },

    help: {
        synopsis: "Get Description for Stored Collections",
        name: {
            "default": "ddl.definition",
            synonims: ["ddl.definition", "ddl.def"]
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
