let util = require("util");

let plain = object => {
    let result = [];

    let pathes = (o, p) => {
        if (util.isFunction(o) || util.isDate(o) || util.isString(o) || util.isNumber(o) || util.isBoolean(o) || util.isNull(o)) {
            result.push({ path: p, value: o })
            return
        }

        if (o instanceof Promise) {
            result.push({ path: p, value: o })
            return
        }

        if (util.isArray(o)) {
            o.forEach(function(item, index) {
                pathes(item, p + ".[" + index + "]")
            })
            return
        }

        if (util.isObject(o)) {
            for (key in o) {
                pathes(o[key], p + "." + key)
            }
            return
        }


    }

    if (util.isFunction(object) ||
        util.isDate(object) ||
        util.isString(object) ||
        util.isNumber(object) ||
        util.isBoolean(object) ||
        util.isNull(object) ||
        object instanceof Promise
    ) {
        result.push({
            path: ".",
            value: object
        })
    } else {
        pathes(object, []);
    }

    return result.map( item =>  ({
            path: item.path.substring(1, item.path.length),
            value: item.value
    }))

}

module.exports = plain