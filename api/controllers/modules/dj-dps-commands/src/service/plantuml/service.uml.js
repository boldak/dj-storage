let encodeSource = require("./util")


class PlantUMLImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "plantuml service error";
  }
}


// const GRAPHENEDB_URL = null;
// // "https://app83770167-ShU0I2:b.rIQ7MDqlCGPG.UiYEitJt5P1GbpW3@hobby-nlhgecabchbdgbkegbhaepel.dbs.graphenedb.com:24780"
// const headers = {
//                         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
//                         "Authorization": "Basic YXBwODM3NzAxNjctU2hVMEkyOmIucklRN01EcWxDR1BHLlVpWUVpdEp0NVAxR2JwVzM=",
//                         "Sec-Fetch-Site": "none",
//                         "Sec-Fetch-Mode": "cors",
//                         "Sec-Fetch-Dest": "empty",
//                         "Cookie": "_ga=GA1.2.1756611434.1587206549; ajs_user_id=null; ajs_group_id=null; ajs_anonymous_id=%22c6069a6d-ecce-4bfb-908b-40a067964ee1%22; _gid=GA1.2.1215143817.1587454556; _cio=8c5c3d2d-08a0-2eb7-d30c-c2c04d713438; _graphenedb_token=b.GdfL8KLVTAHe.IC7OrhC2gxCXLDTp0"
//                 }


module.exports = {
    name: "service.uml",

    synonims: {
        "service.uml": "service.uml",
        "service.plantuml": "service.uml",
    },

    "internal aliases":{
        "format": "format",
        "source": "source",
        "src": "source",
        "output": "format"
    },

    defaultProperty: {
        "service.uml": "format",
        "service.plantuml": "format"
    },

        execute: function(command, state, config) {

	        command.settings.source = command.settings.source || ((command.settings.data) ? command.settings.data : state.head.data)
	        command.settings.format = command.settings.format || "png" 
            
            if(!command.settings.source){
	            throw new PlantUMLImplError("no source available")
	        }
	        
	        return new Promise( (resolve, reject) => {
                try {
                    let res = `http://www.plantuml.com/plantuml/${command.settings.format}/${encodeSource(command.settings.source)}`
                    state.head = {
                            type: "text",
                            data: res
                        }
                    resolve( state )
                } catch (e) {
                    reject( new PlantUMLImplError(e.toString()))
                }
            })
        },        
  
     help: {
        synopsis: "Tokenize document",

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

