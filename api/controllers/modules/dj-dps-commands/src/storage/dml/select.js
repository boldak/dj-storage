
let Promise = require("bluebird");
let jp = require("jsonpath");
let util = require("util");
let storageUtils = require("../utils");

class DMLSelectImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "dml.select error";
  }
}


var getModelAssociations = (model) => {
        let res = [];
        for(key in model.definition){
            if(model.attributes[key].model) res.push(key)
        }
        return res;
}

var impl = function(params, state){
	return new Promise(function(resolve,reject){
        
        if(!params.collection){
                reject(new DMLSelectImplError("Entity collection is undefined"))
                return
        }
        
        var model = params.collection;

        
        storageUtils.access(state.client, model, 'select')
            .then(() => {
                if(!sails.models[model]){
                    reject(new DMLSelectImplError("Entity collection '" + model + "' is not available"))
                    return
                }
                if(typeof sails.models[model] != "object"){
                    reject(new DMLSelectImplError("Entity collection '" + model + "' is not available"))
                    return
                }
                 
                    let ctx = sails.models[params.collection].find({});
                    params.populate.forEach(key => ctx = ctx.populate(key));
                    ctx.then((founded) =>{
                            try{
                                // console.log(founded)
                                if(util.isFunction(params.path)){
                                    let data =  founded.filter(params.path).map(params.map);
                                    // console.log(data)
                                    resolve(data)
                                } else {
                                    let data = jp.query(founded,params.path).map(params.map);
                                    // console.log(data)
                                    resolve(jp.query(founded,params.path).map(params.map))    
                                }
                            }catch (e) {
                                reject (new DMLSelectImplError(e.toString()))
                            }
                        })
            })
            .catch((e) => { reject(new DMLSelectImplError(e.toString()))})
    })
}

module.exports =  {
    name: "dml.select",
    synonims: {
        "dml.select": "dml.select",
        "dml.get": "dml.select"
    },

    "internal aliases":{
        "collection": "collection",
        "type": "collection",
        "entity":"collection",
        "from": "collection",

        "path": "path",
        "where": "path",
        "filter": "path",

        "as": "map",
        "map":"map",
        "return":"map",

        "ref":"ref",
        "populate": "populate",

        "into": "into"

    },
    
    defaultProperty: {
        "dml.select": "collection",
        "dml.get": "collection",
    },

    execute: function(command, state) {
        return new Promise(function(resolve, reject) {
            
            
            command.settings.path = command.settings.path || "$.*"
            command.settings.map = command.settings.map || ((item) => item)

            if(!util.isFunction(command.settings.map)){
                let attr_names = (util.isArray( command.settings.map)) ? command.settings.map : [ command.settings.map ]
                command.settings.map = item => {
                    let res = {}
                    if(attr_names.length>1){
                        attr_names.forEach( d => {
                            res[d] = item[d]
                        })    
                    } else {
                        res = item[attr_names[0]]
                    }
                    
                    return res
                }                    
            }


            
            command.settings.populate = (command.settings.populate)
                                            ? (command.settings.populate == "*")
                                                ? getModelAssociations(sails.models[command.settings.collection])
                                                : command.settings.populate.split(",").map(item => item.trim())
                                            : [];    


            
            impl(command.settings, state)
                .then(function(result) {
                    state.head = {
                        type: "json",
                        data: result || []
                    }
                    resolve(state);
                })
                .catch(function(e) {
                    reject(e)
                })
        })
    },

    help: {
        synopsis: "Save context into cache",
        name: {
            "default": "cache",
            synonims: ["cache","save"]
        },
        "default param": "none",
        params: [],
        example: {
            description: "Save context into cache",
            code: "load(\n    ds:'47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02',\n    as:'json'\n)\nselect('$.metadata')\nextend()\ntranslate()\ncache()\nselect(\"$.data_id\")\n"
        }

    }
} 