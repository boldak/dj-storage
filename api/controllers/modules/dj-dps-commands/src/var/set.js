var util = require("util");
var Promise =require('bluebird');
let _ = require("lodash-node")

var SetImplError = function(message) {
    this.message = message;
    this.name = "Command 'set' implementation error";
}
SetImplError.prototype = Object.create(Error.prototype);
SetImplError.prototype.constructor = SetImplError;

var implementation = function(_var, value, state) {
    if (util.isUndefined(value) || value == "" || value == "$") {
        state.storage = 
            _.set(
                state.storage, 
                _var, 
                ( (state.head.data instanceof Promise) ? state.head.data : _.defaultsDeep(state.head.data) )
            )

        return state;
    } else {
        if (value instanceof Promise) {
            
            _.set(
                state.storage, 
                _var, 
                state.head.data
            )

            return state;
        }

        if (util.isFunction(value) || util.isPrimitive(value)) {
            
            _.set(
                state.storage, 
                _var, 
               _.defaultsDeep( _.get(state.head.data, value) )
            )

            return state;
        }
        if (util.isArray(value)) {
            
            _.set(
                state.storage, 
                _var, 
                []
            )
               _.defaultsDeep( _.get(state.head.data, value) ) 

            value.forEach(function(item, index) {
                let p = _var + "[" + index + "]"
                _.set(
                    state.storage, 
                    p, 
                   _.defaultsDeep( _.get(state.head.data, item) )
                )
            })
            return state;
        }
        if (util.isObject(value)) {
            
            _.set(
                state.storage, 
                _var, 
                {}
            )

            
            for (var key in value) {
                let p =  _var + '["' + key+'"]'
                _.set(
                    state.storage, 
                    p, 
                    _.defaultsDeep( _.get(state.head.data, value[key]) )   
                )                

            }
            return state;
        }
    }
}

module.exports = {
    name: "set",
    synonims: {
        "set": "set",
        "put": "set",
        "let": "set"
    },
    "internal aliases": {
        "var": "var",
        "variable": "var",
        "value": "value",
        "val": "value"
    },
    defaultProperty: {
        "set": "var",
        "put": "var",
        "let": "var"
    },

    help: {
        synopsis: "Set variable value",
        name: {
            "default": "set",
            synonims: ["set", "put", "let"]
        },
        input: ["any"],
        output: "type of input context",
        "default param": "var",
        params: [{
            name: "var",
            synopsis: "Variable name (required).",
            type: ["string"],
            synonims: ["var", "variable"],
            "default value": "undefined"
        }, {
            name: "value",
            synopsis: "Json path to selected value (optional). If 'value' is not assigned then input context will be stored.",
            type: ["json-path"],
            synonims: ["value", "val"],
            "default value": "'$'"
        }],
        example: {
            description: "Variable usage",
            code: "<?json \r\n    \"Hello\" \r\n?>\r\nset(\"str\")\r\n\r\n<?javascript \r\n    var notNull = function(item){\r\n        return item != undefined\r\n        \r\n    }; \r\n?>\r\nset(\"functions\")\r\n\r\nload(\r\n    ds:\"47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02\", \r\n    as:'json'\r\n)\r\n\r\nselect(\"$.metadata.dataset.commit\")\r\n\r\nset(var:\"commitNote\", val:\"$[0].note\")\r\nget(\"str\")\r\ninfo()\r\nget(\"functions.notNull\")\r\ninfo()\r\nget(\"commitNote\")\r\ninfo()\r\n// equals for previus\r\nget(\"$.commitNote\")\r\ninfo()\r\nlog()\r\n"
        }

    },

    implementation: implementation, 

    execute: function(command, state) {
        try {
            if (command.settings.var) 
                return(implementation(command.settings.var,command.settings.value,state))
            throw new SetImplError("Variable is not defined.")
        } catch (e) {
            throw new SetImplError(e.toString())
        }
    }
}
