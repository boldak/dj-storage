var util = require("util");

let _ = require("lodash-node");


var GetImplError = function(message) {
    this.message = message;
    this.name = "Command 'get' implementation error";
}
GetImplError.prototype = Object.create(Error.prototype);
GetImplError.prototype.constructor = GetImplError;


module.exports = {
    name: "get",
    synonims: {
        "get": "get",
        "return":"get"
    },

    
    "internal aliases":{
        "path": "path",
        "select": "path",
        "var":"path",
        "as": "as",
        "type":"as"
    },
    
    defaultProperty: {
        "get": "path",
        "return": "path"
    },

    help: {
        synopsis: "Get deep copy of variable and set context",
        name: {
            "default": "get",
            synonims: []
        },
        input:["any"],
        output:"type of variable",
        "default param": "path",
        params: [
            {
                name: "path",
                synopsis: "",
                type:["json-path"],
                synonims: ["path","select", "var"],
                "default value": "$"
            }, {
                name: "as",
                synopsis: "Type of variable.",
                type: ["json-path"],
                synonims: ["type", "as"],
                "default value": "$"
        }],
        example: {
            description: "Inspect variables",
            code:  "<?json \r\n    \"Hello\" \r\n?>\r\nset(\"str\")\r\n\r\n<?javascript \r\n    var notNull = function(item){\r\n        return item != undefined\r\n        \r\n    }; \r\n?>\r\nset(\"functions\")\r\n\r\nload(\r\n    ds:\"47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02\", \r\n    as:'json'\r\n)\r\n\r\nselect(\"$.metadata.dataset.commit\")\r\n\r\nset(var:\"commitNote\", val:\"$[0].note\")\r\nget(\"str\")\r\ninfo()\r\nget(\"functions.notNull\")\r\ninfo()\r\nget(\"commitNote\")\r\ninfo()\r\n// equals for previus\r\nget(\"$.commitNote\")\r\ninfo()\r\nlog()\r\n"

        }

    },


    execute: function(command, state) {
        try {
            
            let getValue = path => {
                let res = _.get(state.storage, command.settings.path);
                if( util.isArray(res)) return res.map(d => d)
                if( util.isString(res)) return res
                if( util.isObject(res)) return _.defaultsDeep( {} , res )
                return res    
            }

            if (
                    util.isUndefined(command.settings) 
                ||  util.isUndefined(command.settings.path) 
                ||  command.settings.path == "" 
                || command.settings.path == "$"
            ) {

                state.head = {
                    data: _.defaultsDeep( {}, state.storage ),
                    type: command.settings.as || "json"
            }
                
                if (util.isFunction(state.head.data)) state.head.type = 'function'
                return state;
            }
                


            

            state.head = {
                data: getValue(command.settings.path),
                type: command.settings.as || "json"
            }
            if (util.isFunction(state.head.data)) state.head.type = 'function'
                // }
            return state

        } catch (e) {
            throw new GetImplError(e.toString())
        }
    }
}
