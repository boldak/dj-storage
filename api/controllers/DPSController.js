var conf = require("./impl")
           .concat(require("dj-dps-commands"));


var Script = require("dj-dps-interpreter");

var logger = require("dj-utils").log.global;

logger.debug("Start DJ Storage Service")

module.exports = {

    run: function(req, resp) {

        var script = req.body.script;
        var state = req.body.state;
        var locale = req.body.locale || "en";
        let host = req.host+":"+req.port;
        locale = (locale == "uk") ? "ua" : locale;

        state = (state) || {
            locale : locale 
        }
        state.client = req.body.client;
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
    }

}
