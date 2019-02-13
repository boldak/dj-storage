var util = require("util");
var flat = require("../lib/plain");
var json2csv = require('json2csv');
var iconv = require('iconv-lite');
var fs = require("fs");
let _ = require("lodash-node");
let path = require("path");


var CSVConverterError = function(message) {
    this.message = message;
    this.name = "CSV converter error";
}
CSVConverterError.prototype = Object.create(Error.prototype);
CSVConverterError.prototype.constructor = CSVConverterError;


var exportArray = function(data) {

    var fields = _.pairs(data[0]).map(item => item[0])
    var res = []

    res = data;
    return iconv.encode(
        new Buffer(
            json2csv({ data: res, fields: fields, del: ";" })
        ),
        "win1251");
}

var exportObject = function(data) {


    let res = flat(data).map( d => ({
        key: d.path,
        value: d.value
    }));
    return iconv.encode(
        new Buffer(
            json2csv({ data: res, fields: ["key", "value"], del: ";" })
        ),
        "win1251"); 
}





module.exports = function(data, params, locale, script, scriptContext) {

    

    

  
    try {
        
        if (util.isArray(data)) {
            fs.writeFileSync("./.tmp/public/downloads/" + params.file, exportArray(data));
            return { url: "/downloads/" + params.file }
        }
        if (util.isObject(data)) {
            fs.writeFileSync("./.tmp/public/downloads/" + params.file, exportObject(data));
            return { url: "/downloads/" + params.file }
        }
         throw new CSVConverterError(`Cannot convert ${typeof data} to csv`) 
    } catch (e) {
        throw new CSVConverterError(e.toString())
    }
    throw new CSVConverterError("CSV converter not found. Supported context types: dataset, table, array, object.")
}
