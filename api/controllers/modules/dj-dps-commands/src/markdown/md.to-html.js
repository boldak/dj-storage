let marky = require( "marky-markdown")


class MdImplError extends Error {
    constructor(message) {
        super(message);
        this.name = "markdown transform error";
    }
}




module.exports = {
    name: "md.toHtml",

    synonims: {
        "md.toHtml": "md.toHtml"
    },

    "internal aliases": {},

    defaultProperty: {},

    execute: function(command, state, config) {

        command.settings.source = command.settings.source || ((command.settings.data) ? command.settings.data : state.head.data)
        
        if (!command.settings.source) {
            throw new SqlImplError("no query available")
        }

        return new Promise((resolve, reject) => {
            try {
              let html = marky(command.settings.source, {highlightSyntax:true})
              state.head = {
                  type: "html",
                  data: html
              }
              resolve(state)
            } catch (e) {
              reject( new MdImplError(e.toString()))
            }
        })
     },

    help: {
        synopsis: "Tokenize document",

        name: {
            "default": "rank",
            synonims: []
        },
        input: ["table"],
        output: "table",
        "default param": "indexes",
        params: [{
            name: "direction",
            synopsis: "Direction of iteration (optional)",
            type: ["Rows", "row", "Columns", "col"],
            synonims: ["direction", "dir", "for"],
            "default value": "Columns"
        }, {
            name: "indexes",
            synopsis: "Array of 0-based indexes of items that will be ranked (optional)",
            type: ["array of numbers"],
            synonims: ["indexes", "items"],
            "default value": []
        }, {
            name: "asc",
            synopsis: "Define order (optional)",
            type: ["A-Z", "az", "direct", "Z-A", "za", "inverse"],
            synonims: ["order", "as"],
            "default value": "A-Z"
        }],
        example: {
            description: "Rank first column values",
            code: "load(\r\n    ds:'47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02',\r\n    as:\"dataset\"\r\n)\r\nproj([\r\n  { dim:'time', role:'row', items:[] },\r\n  { dim:'indicator', role:'col', items:[] }\r\n])\r\n\r\nrank(for:\"col\",items:[0],as:\"az\")\r\n\r\norder(by:0, as:\"az\")\r\n\r\n"
        }
    }
}