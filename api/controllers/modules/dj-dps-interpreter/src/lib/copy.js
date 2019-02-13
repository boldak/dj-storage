let util = require("util");
let _ = require("lodash-node")


let copy = object => {
    let res = object;
    if( util.isArray(res)) return res.map(d => d)
    if( util.isString(res)) return res
    if( util.isObject(res)) return _.defaultsDeep( {} , res )
    return res    
}

module.exports = copy

            