// get the client
const mysql = require('mysql2');
// create the connection
const connectionUrl =
    process.env.JAWSDB_URL ||
    'mysql://root:boldak@localhost:3306/x4mspp0ssyvlauv8'

class SqlImplError extends Error {
    constructor(message) {
        super(message);
        this.name = "sql service error";
    }
}


const lineCommentRE = /(-- [\w\S\ .\t\:\,;\'\"\(\)\{\}\[\]0-9-_]*)(?:[\n\r]*)/gi;
const inlineCommentRE = /(\/\*[\w\W\b\.\t\:\,;\'\"\(\)\{\}\[\]\*0-9-_]*)(?:\*\/)/gim;


module.exports = {
    name: "service.sql",

    synonims: {
        "service.sql": "service.sql",
        "service.mysql": "service.sql",
    },

    "internal aliases": {
        "query": "query",
        "selector": "query",
        "permission":"permission",
        "available":"permission"
    },

    defaultProperty: {
        "service.sql": "query",
        "service.mysql": "query"
    },

    execute: function(command, state, config) {

        command.settings.query = command.settings.query || ((command.settings.data) ? command.settings.data : state.head.data)
        command.settings.permission = command.settings.permission || [] 
        command.settings.permission = command.settings.permission.map( p => p.toUpperCase())
        if (!command.settings.query) {
            throw new SqlImplError("no query available")
        }

        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection(connectionUrl)
            command.settings.query = command.settings.query.replace(lineCommentRE,"").replace(inlineCommentRE,"")
            // console.log(command.settings.query)
            command.settings.query = command.settings.query.split(";").map(q => q.trim()).filter(q => q)
            
            let p = command.settings.query.map( q => {
                let statement = q.split(/\s/)[0].toUpperCase()
                // console.log(statement, " ", command.settings.permission.join(", "),)
                if(!_.find(command.settings.permission, p => p == statement))
                return new SqlImplError(`No permission for execute ${statement} \n ${q}\n`)
            }).filter( p => p)

            if(p.length>0){
                reject(p[0])
                return
            }


            let Table = require('cli-table3')
            let res = []


            Promise.all(

                command.settings.query.map((q, index) =>

                    connection.promise().query(q)
                      .then(([results, fields]) => {
                          if (!_.isArray(results)) {
                              res.push({
                                  query: q,
                                  text: _.keys(results).map(k => `${k}: ${JSON.stringify(results[k])}`).join(", ") + "\n"
                              })
                          } else {
                              var table = new Table();
                              table.push(fields.map(f => f.name))
                              results.forEach(row => {
                                  table.push(_.values(row).map(v => v.toString()))
                              })
                              res.push({
                                  query: q,
                                  data: results,
                                  text: table.toString().replace(/\u001b\[90m/g,"").replace(/\u001b\[39m/g, "") + "\n"
                              })
                          }
                      })
                    .catch(err => {
                        reject(new SqlImplError(`
SQL Error ${err.errno}: ${err.sqlMessage}
${(command.settings.query[index-1]) ? command.settings.query[index-1] : ""}
----------------------------------------------
${q}
----------------------------------------------
${(command.settings.query[index-1]) ? command.settings.query[index-1] : ""}
        
              `))})))
            .then(() => {
                // console.log(res.map(r => r.query+"\n"+r.text).join("\n"))
                connection.end()
                state.head = {
                    type: "json",
                    data: res
                }
                resolve(state)
            })
            .catch(e => {
                console.log(e)
                connection.end()
                // reject(e)
            })
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