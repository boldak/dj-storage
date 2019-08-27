let STAT = require("../lib/stat")
let util = require("util");
let s_util = require("./utils");
let StatImplError = require("./staterror");
let pca = require("../lib/pca").pca;


module.exports = {
    name: "stat.pca.loadings",

    synonims: {
        "stat.pca.loadings": "stat.pca.loadings",
        "s.pca.loadings": "stat.pca.loadings"
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

        let attr_names = [];

        if(!command.settings.mapper)
            command.settings.mapper = _.keys( state.head.data[0]).map( d => d )
        console.dir(command.settings.mapper)
            // throw new StatImplError("PCA mapper not defined")
        
        if(!util.isFunction(command.settings.mapper)){
            attr_names = (util.isArray( command.settings.mapper)) ? command.settings.mapper : [ command.settings.mapper ]
            command.settings.mapper = item => attr_names.map( d => item[d])                
        }

        command.settings.named = command.settings.named || "pc"
        

        try {
            
            let res =  
                pca(
                    s_util.matrix2floats(
                        state.head.data.map(command.settings.mapper)
                    )
                ).loadings
            
            let out = res.map(
                    (d, index) => {
                        let r = {}
                        r.variable = (attr_names.length > 0) ? attr_names[index] : index+1;
                        res[index].forEach( (v, idx) => {
                            r[ `${command.settings.named}${idx}` ] = v    
                        })        
                        return r
                });


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

