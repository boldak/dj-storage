let util = require("util");
let StatImplError = require("./staterror")
let regression = require("regression")


module.exports = {
    name: "stat.reg",

    synonims: {
        "stat.regression": "stat.reg",
        "s.reg": "stat.reg"        
    },

    "internal aliases":{
        "data": "data",
        "points": "data",
        "type": "type"
    },

    defaultProperty: {
      "stat.regression": "type",
      "s.reg":  "type"
    },

    execute: function(command, state, config) {

        command.settings.data = (command.settings.data) ? command.settings.data : state.head.data; 

        if (!command.settings.data || !_.isArray(command.settings.data)) throw new StatImplError("Data must be array")

        try {
            
            state.head = {
                type: "json",
                data: regression[command.settings.type](command.settings.data)
                }
        } catch (e) {
            throw new StatImplError(e.toString())
        }
        return state;
    },

    help: {
        synopsis: "Add rank",

        name: {
            "default": "rank",
            synonims: []
        },
        input:["table"],
        output:"table",
        "default param": "indexes",
        params: [{
            name: "direction",
            synopsis: "Direction of iteration (optional)",
            type:["Rows", "row", "Columns", "col"],
            synonims: ["direction", "dir", "for"],
            "default value": "Columns"
        }, {
            name: "indexes",
            synopsis: "Array of 0-based indexes of items that will be ranked (optional)",
            type:["array of numbers"],
            synonims: ["indexes", "items"],
            "default value": []
        }, {
            name: "asc",
            synopsis: "Define order (optional)",
            type:["A-Z", "az", "direct", "Z-A", "za", "inverse"],
            synonims: ["order", "as"],
            "default value": "A-Z"
        }],
        example: {
            description: "Rank first column values",
            code:   "load(\r\n    ds:'47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02',\r\n    as:\"dataset\"\r\n)\r\nproj([\r\n  { dim:'time', role:'row', items:[] },\r\n  { dim:'indicator', role:'col', items:[] }\r\n])\r\n\r\nrank(for:\"col\",items:[0],as:\"az\")\r\n\r\norder(by:0, as:\"az\")\r\n\r\n"
        }
    }
}


