let XLSX = require("node-xlsx");
let util = require("util");
let plain = require("../lib/plain");
let mime = require('mime');
let fs = require("fs");

let XLSXConverterError = function(message) {
    this.message = message;
    this.name = "XLSX converter error";
}
XLSXConverterError.prototype = Object.create(Error.prototype);
XLSXConverterError.prototype.constructor = XLSXConverterError;



let exportArray = data => {

    let product = [{ name: "data", data: [] }]

    product[0].data.push(
        plain(data[0]).map( item => item.path )
    )

    data.forEach( row => {
        product[0].data.push( plain(row).map( item => item.value ) )
    })

    return product;
}

let exportObject = data => {

    data = plain(data);
    let product = [{ name: "data", data: [] }]
    product[0].data.push(["key", "value"])
    data.forEach(function(row) {
        product[0].data.push([row.path, row.value])
    })

    return product;
}





module.exports = function(data, params, locale, script, scriptContext) {

    try {
       
        if (util.isArray(data)) {
            fs.writeFileSync("./.tmp/public/downloads/" + params.file, XLSX.build(exportArray(data)));
            return { url: "/downloads/" + params.file }
        }
        if (util.isObject(data)) {
            fs.writeFileSync("./.tmp/public/downloads/" + params.file, XLSX.build(exportObject(data)));
            return { url: "/downloads/" + params.file }
        }
        throw new XLSXConverterError(`Cannot convert ${typeof data} to xlsx`) 
    } catch (e) {
        throw new XLSXConverterError(e.toString());
    }
    throw new XLSXConverterError("converter not found. Supported context types: dataset, table, array, object.");

}
