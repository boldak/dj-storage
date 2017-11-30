var Promise = require("bluebird");
var Cache = require("../Cache");
var logger = require("dj-utils").log.global;
var I18N = require("dj-utils").i18n;
var jp = require("jsonpath");


var EchoError = function(message) {
    this.message = message;
    this.name = "Command 'cache' implementation error";
}
EchoError.prototype = Object.create(Error.prototype);
EchoError.prototype.constructor = EchoError;



var prepareCachedResult = function(d){
  d = (util.isArray(d))? d[0] : d;
  d = d || {};
  return {
    data: d.value,
    data_id: d.id,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt
  }
}

var impl = function(data, params){
	return new Promise(function(resolve,reject){
		Cache
          .save("process",params.script,data,{})
          .then(function(result){
            resolve(prepareCachedResult(result))
          })
          .catch(function(e){
            reject(new CacheImplError(e.toString()))
          })
	})
}

module.exports =  {
    name: "echo",
    synonims: {
        "echo": "echo"
    },
    
    defaultProperty: {},

    execute: function(command, state) {
        return new Promise(function(resolve, reject) {
            state.locale = (state.locale) ? state.locale : "en";
            command.settings.locale = state.locale;
            command.settings.script = state.instance.script();
            state.head = {
                        type: "json",
                        data: command
                    }
            resolve(state)
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