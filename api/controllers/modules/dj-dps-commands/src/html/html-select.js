var util = require("util");
var cheerio = require("cheerio")


class HtmlSelectorError extends Error {
  constructor(message) {
    super(message);
    this.name = "html.selector error";
  }
}


module.exports = {
  name: "html.select",
  synonims:{
    "html.select" : "html.select",
    "html.query" : "html.select"
    
  },
  "internal aliases": {
    "selector" : "selector",
    "where" : "selector",
    "data" : "data",
    "from" : "data",
    "get" : "returns",
    "return":"returns"
    
  },
  defaultProperty:{
    "html.select":"selector",
    "html.query":"selector"
  },

  execute:function(command,state,config){
    
    command.settings.data = (command.settings.data) ? command.settings.data : state.head.data
    command.settings.selector = command.settings.selector || "*"
    command.settings.returns = (command.settings.returns) || "text"
    command.settings.returns = (util.isArray(command.settings.returns)) 
      ? command.settings.returns 
      : command.settings.returns.split(",").map( d => d.trim() )

try {
    let dom = cheerio.load(command.settings.data)
   
    state.head = {
      type: "json",
      data : dom(command.settings.selector).get().map(item => {
        let result = {}
        command.settings.returns.forEach( r => {
          if(r == "tagName" || r == "tag"){
            result.tagName = item.tagName
            return
          }
          if(r == "html"){
            result.html = dom(item).html()
            return
          }
          if(r == "data"){
            result.data = dom(item).data()
            return
          }
          if(r == "val"){
            result.val = dom(item).val()
            return
          }
          if(r.startsWith("@")){
            result[r] = dom(item).attr(r.substring(1))
            return
          }
          
          result.text = dom(item).text()
        })
        return result
      })
    }  


      return state;  
    } catch(e) {
      throw new HtmlSelectorError(e.toString())
    }
    
  },

  help:{
    synopsis:"Wrap context into html tag",
    
    name:{
      "default" : "wrapHtml",
      synonims:["wrapHtml","wrap"]
    },
    input:["string", "html"],
    output:"html",
    "default param": "tag",
    
    params:[{
            name: "tag",
            synopsis: "Wrapper tag name (required)",
            type:["string"],
            synonims: [],
            "default value": "none"
        },
        {
            name: "style",
            synopsis: "Wrapper inline css style (optional)",
            type:["string"],
            synonims: [],
            "default value": "none"
        },
        {
            name: "class",
            synopsis: "Wrapper class (optional)",
            type:["string"],
            synonims: [],
            "default value": "none"
        }
        ],
    
    example:{
      description:"Build HTML table",
      code:   "<?javascript\r\n    \r\n    $context.rowMapper = function(d){\r\n      return \"<tr>\"+ d.value.map(function(v){\r\n         return \"<td style=\\\\\"font-size:x-small\\\\\">\"+v+\"</td>\"\r\n      }).join(\"\")+\"</tr>\"\r\n    };\r\n\r\n?>\r\n\r\n<?dps\r\n\r\n    map({{rowMapper}})\r\n    concat()\r\n    html()\r\n    wrapHtml(tag:\"table\", class:\"skin\", style:'background:#ded;')\r\n\r\n?>\r\nset(\"t2html\")\r\n\r\n\r\n\r\nload(\r\n    ds:\"47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02\",\r\n    as:'dataset'\r\n)\r\n\r\nproj([\r\n    {dim:\"time\", as:\"row\"},\r\n    {dim:\"indicator\",as:\"col\"}\r\n])\r\n\r\nformat(2)\r\njson()\r\nselect(\"$.body.*\")\r\nrun({{t2html}})\r\n"
    }
  }
}