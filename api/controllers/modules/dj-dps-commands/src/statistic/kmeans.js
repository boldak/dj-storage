let STAT = require("../lib/stat")
let util = require("util");
let s_util = require("./utils");
let StatImplError = require("./staterror");
let CLUSTER = require("../lib/cluster").CLUSTER


module.exports = {
    name: "stat.cluster",

    synonims: {
        "stat.cluster": "stat.cluster",
        "s.cluster": "stat.cluster",
        "stat.kmeans": "stat.cluster",
        "s.kmeans": "stat.cluster",
        "stat.cluster.assignment": "stat.cluster",
        "s.cluster.assignment": "stat.cluster",
        "stat.kmeans.assignment": "stat.cluster",
        "s.kmeans.assignment": "stat.cluster"
                
    },

    "internal aliases":{
        "mapper": "mapper",
        "by": "mapper",
        "named": "named",
        "name": "named",
        "return": "named"
    },

    defaultProperty: {},

    execute: function(command, state, config) {

        command.settings.mapper  = command.settings.mapper || Object.keys(state.head.data[0]) 
        // if(!command.settings.mapper)
        //     throw new StatImplError("Cluster mapper not defined")
        
        if(!util.isFunction(command.settings.mapper)){
            let attr_names = (util.isArray( command.settings.mapper)) ? command.settings.mapper : [ command.settings.mapper ]
            command.settings.mapper = item => attr_names.map( d => item[d])                
        }

        command.settings.named = command.settings.named || "cluster"
        command.settings.count = command.settings.count || 2    

        try {
            
            let data = s_util.matrix2floats(
                state.head.data.map(command.settings.mapper)
            )
            CLUSTER.KMEANS_MAX_ITERATIONS = command.settings.count * data.length
            
            let res = CLUSTER.kmeans(command.settings.count, data).assignments.map( d => d+1 );
           
            state.head = {
                type: "json",
                data: state.head.data.map( ( r, index ) => {
                    r[ command.settings.named ] = res[ index ]
                    return r
                })
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



