var conf = require("./impl")
           .concat(require("dj-dps-commands"));


var Script = require("dj-dps-interpreter");

var logger = require("dj-utils").log.global;

logger.debug("Start DJ Storage Service")

module.exports = {

    run: function(req, resp) {
        
        // console.log("RUN")
        var host, script, locale, state;

        req.file('file').upload({}, (err, uploadedFiles) => {
            
            if (uploadedFiles.length>0) {
                
                let file = uploadedFiles[0]
                let fileContent = require("fs").readFileSync(file.fd)
                // let config = JSON.parse(req.body.config)
                
                script = JSON.parse(req.body.script);
                state =  JSON.parse(req.body.state)
                locale = JSON.parse(req.body.locale) || "en";
                host = req.host+":"+req.port;
                locale = (locale == "uk") ? "ua" : locale;
                state = (state) || {
                    locale : locale 
                }
                state.client = JSON.parse(req.body.client);
                state.storage.$file = fileContent;
            
            } else {

                script = req.body.script;
                state = req.body.state;
                locale = req.body.locale || "en";
                host = req.host+":"+req.port;
                locale = (locale == "uk") ? "ua" : locale;

                state = (state) || {
                    locale : locale 
                }
                state.client = req.body.client;
            
            }
            
            // console.log("host", host)
            // console.log("script", script)
            // console.log("state", state)


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
