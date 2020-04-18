let STAT = require("../lib/stat")
let util = require("util");
let s_util = require("./utils");
let StatImplError = require("./staterror");
let CLUSTER = require("../lib/cluster").CLUSTER

let distance = {
    EUCLIDIAN_DISTANCE: ( vec1, vec2 ) => {
        var N = vec1.length;
        var d = 0;
        for (var i = 0; i < N; i++)
          d += Math.pow(vec1[i] - vec2[i], 2)
        d = Math.sqrt(d);
        return d;
    },
    MANHATTAN_DISTANCE: ( vec1, vec2 ) => {
        var N = vec1.length;
        var d = 0;
        for (var i = 0; i < N; i++)
          d += Math.abs(vec1[i] - vec2[i])
        return d;
    },
    MAX_DISTANCE: ( vec1, vec2 ) => {
        var N = vec1.length;
        var d = 0;
        for (var i = 0; i < N; i++)
          d = Math.max(d, Math.abs(vec1[i] - vec2[i]));
        return d;
      }
}


module.exports = {
    name: "stat.clusterization",

    synonims: {
        "stat.clusterization": "stat.clusterization",
        "s.clusterization": "stat.clusterization"
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

        
        if(!command.settings.mapper)
            throw new StatImplError("Cluster mapper not defined")
        let mapper = command.settings.mapper
        if(!util.isFunction(mapper)){
            let attr_names = (util.isArray(mapper)) ? mapper : [ mapper ]
            mapper = item => attr_names.map( d => item[d])                
        }

        command.settings.named = command.settings.named || "cluster"
        command.settings.count = command.settings.count || 2  
        command.settings.distance = command.settings.distance || "EUCLIDIAN_DISTANCE"   

        try {
            
            let data = s_util.matrix2floats(
                state.head.data.map(mapper)
            )
            
            CLUSTER.KMEANS_MAX_ITERATIONS = command.settings.count * data.length

            let temp = []

            for(let i = 0; i <= Math.max(500,command.settings.count) / command.settings.count; i++ ){
                temp = temp.concat(
                    CLUSTER.kmeans(command.settings.count, data, CLUSTER[command.settings.distance]).centroids
                )
            }

            let initialPos = CLUSTER.kmeans(command.settings.count, temp, CLUSTER[command.settings.distance]).centroids 
            let cls = CLUSTER.kmeans(command.settings.count, data, CLUSTER[command.settings.distance], initialPos)

            let res = {
                centroids: cls.centroids.map(
                    (d, index) => {
                        let res = {}
                        res[command.settings.named] = index;
                        if(!util.isFunction(command.settings.mapper)){
                            let attr_names = (util.isArray( command.settings.mapper)) ? command.settings.mapper : [ command.settings.mapper ]
                            attr_names.forEach( (a, idx) => {
                                res[a] = d[idx]
                            })
                        } else {
                            res.coordinates = d    
                        }

                        return res
                    }),
                data: state.head.data.map( ( r, index ) => {
                        r[ command.settings.named ] = cls.assignments[ index ]
                        let _clusters = cls.centroids.map( c => distance[command.settings.distance](c, mapper(r)))
                        let sum = _.max(_clusters)
                        clusters = _clusters.map( c => 1 - c / sum)
                        sum = _.sum(clusters)
                        clusters = clusters.map( c => c / sum)
                        let p = 1
                        clusters.forEach( (c, ci) => {
                            p *= (cls.assignments[ index ] == ci) ? c : 1-c
                        })
                        p*=command.settings.count
                        r.fuzzy = {
                            value: ( p>1 ) ? 1 : p,
                            entropy: STAT.entropy([clusters[cls.assignments[ index ]], 1-clusters[cls.assignments[ index ]]]),
                            clusters,
                            distance: _clusters
                        }

                        return r
                    })
            }

            
            state.head = {
                type: "json",
                data: res
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



