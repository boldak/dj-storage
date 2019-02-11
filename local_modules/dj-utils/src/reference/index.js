var ReferenceParserError = function(message) {
    this.message = message;
    this.name = "Reference parser error";
}
ReferenceParserError.prototype = Object.create(Error.prototype);
ReferenceParserError.prototype.constructor = ReferenceParserError;

module.exports = {
	parse: (str) => {

	    let filterRE        = /(?!\(){([\S\s]*)}(?=\))/gi;
	    let collectionRE    = /([a-zA-Z_]+[a-zA-Z_0-9]*)(?=\?)/gi;
	    let pathRE          = /(?!}\.)([a-zA-Z_0-9\[\]][a-zA-Z_0-9\[\]\.]*)$/gi; 

	    let collection = str.match(collectionRE);
	    if (collection == null) throw new ReferenceParserError('Collection or filter cannot be recognized');

	    let filter = str.match(filterRE);
	    if (filter == null) throw new ReferenceParserError('Collection or filter cannot be recognized');


	    let path = str.match(pathRE);
	    eval("var filterObject = " + filter[0]);
	    
	    return {
	        collection: collection[0],
	        filter: filterObject,
	        path: (path) ? path[0] : null
	    } 

	}
}