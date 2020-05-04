var conf = require("./modules/dj-dps-commands");


var Script = require("./modules/dj-dps-interpreter");

// var logger = require("dj-utils").log.global;

// logger.debug("Start DJ Storage Service")

module.exports = {

    run: function(req, resp) {
        
        // console.log("RUN")
        var host, script, locale, state;

        // console.log("REQ.FILE",req.file('file'))

        req.file('file').upload({}, (err, uploadedFiles) => {
            
            if (uploadedFiles.length>0) {
                
                let file = uploadedFiles[0]
                // console.log("FILE", file)
                let fileContent = require("fs").readFileSync(file.fd)
                // console.log(fileContent)
                // let config = JSON.parse(req.body.config)
                
                // console.log("SCRIPT", req.body.script)

                // script = JSON.parse(JSON.stringify(req.body.script));
                script = JSON.parse(decodeURIComponent(req.body.script));
                
                // console.log("STATE", req.body.state)
                if(!req.body.state=="undefined") state =  JSON.parse(decodeURIComponent(req.body.state))
                
                // console.log("LOCALE", req.body.locale)
                
                if(req.body.locale) locale = JSON.parse(req.body.locale) 
                
                locale = locale|| "en";
                
                host = req.host+":"+req.port;
                locale = (locale == "uk") ? "ua" : locale;
                state = (state) || {
                    locale : locale 
                }
                
                // console.log("CLIENT", req.body.client)
                state.client = JSON.parse(req.body.client);
                state.storage = state.storage || {};
                let text  = fileContent.toString()
                state.storage.$file = {
                    binary: fileContent,
                    text: text,
                    name: file.fd
                };

                // console.log("FILE CONTENT ", state.storage.$file)
            
            } else {
                // console.log("req.body.script", req.body.script)
                // console.log("-----------------------------------------------")
                // console.log(decodeURIComponent(req.body.script))
                // console.log("-----------------------------------------------")
                
                script = JSON.parse(decodeURIComponent(req.body.script));
                // console.log("Run script", script)

                // console.log("req.body.state", req.body.state)
                // console.log("-----------------------------------------------")
                // console.log(decodeURIComponent(req.body.state))
                // console.log("-----------------------------------------------")
                
                state = JSON.parse(decodeURIComponent(req.body.state));
                locale = req.body.locale || "en";
                host = req.host+":"+req.port;
                locale = (locale == "uk") ? "ua" : locale;

                state = (state) || {
                    locale : locale 
                }
                state.client = req.body.client;
            
            }
            
            // console.log("host", host)
            // console.log("script", JSON.stringify(script))
            
            // console.log("-----------------------------------------------")
            // console.log("state", JSON.stringify(state))
            // console.log("-----------------------------------------------")
            

            // console.log(req.host, script, state)
            var executable = new Script()
                .host(host)
                .config(conf)
                .script(script)
                // .state(state)
                .run(state)
                .then(function(result) {
                    resp.send(result)
                })
                .catch(function(error) {
                    resp.send({ type: "error", data: error })
                })
            })    
            // var file = uploadedFiles[0];



        
    }

}
