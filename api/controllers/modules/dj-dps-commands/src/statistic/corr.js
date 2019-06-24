let STAT = require("../lib/stat")
let util = require("util");
let s_util = require("./utils");
let StatImplError = require("./staterror");



module.exports = {
    name: "stat.correlation",

    synonims: {
        "stat.correlation": "stat.correlation",
        "s.correlation": "stat.correlation",
        "stat.corr": "stat.correlation",
        "s.corr": "stat.correlation"
    },

    "internal aliases":{
        "mapper": "mapper",
        "by": "mapper"
    },

    defaultProperty: {},

    execute: function(command, state, config) {

         command.settings.mapper  = command.settings.mapper || Object.keys(state.head.data[0]) 
        
        if(!command.settings.mapper)
            throw new StatImplError("Correlation mapper not defined")
        
        let mapper = command.settings.mapper;

        let attr_names = [];

        if(!util.isFunction(mapper)){
            attr_names = (util.isArray( mapper)) ? mapper : [ mapper ]
            mapper = item => attr_names.map( d => item[d])                
        }

       
        try {
            
            let data =  s_util.transpose(
                            s_util.matrix2floats(
                                state.head.data.map(mapper)
                            )
                        )    
            let out = []

            data.forEach( (v1, idx1) => {
                let row = {
                    source: (attr_names.length > 0) ? attr_names[idx1] : idx1 + 1
                }
                data.forEach( (v2, idx2) => {
                    let prop = (attr_names.length > 0) ? attr_names[idx2] : idx2 + 1
                    row[prop] = STAT.corr(v1,v2)
                })
                out.push(row)
            })    
            
            state.head = {
                type: "json",
                data: out
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

