

var Promise = require("bluebird");
var parser = require("../../dj-dps-parser");
var copy = require('./lib/copy');
var $plain = require('./lib/plain');
var util = require("util");
let _ = require("lodash-node");

var ScriptError = function(message) {
    this.message = message;
    this.name = "";
}
ScriptError.prototype = Object.create(Error.prototype);
ScriptError.prototype.constructor = ScriptError;

var branchIndex = 0
var processInctruction = {
    
    "@defaults":{
        name: "@defaults",
        
        synonims: {
            "@def" : "@defaults",
            "@use" : "@defaults"
        },
        
        "internal aliases": {
            "packages": "packages"
        },

        defaultProperty: {
            "@defaults" : "packages",
            "@def" : "packages",
            "@use" : "packages"  
        },

        help: {
            synopsis: "Process instruction set usage of defaults packages ",

            name: {
                "default": "@defaults",
                synonims: []
            },

            "default param": "promise",
            
            input:["string"],
            
            output:"Promise",

            params: [{
                name: "promises",
                synopsis: "Array of async code promises thats must be resolved",
                type:["array of promises", "bindable"],
                synonims: ["promises", "branches"],
                "default value": "undefined"
            }],

            example: {
                description: "Execute async codes",
                code:  "@async(promise:'p[0]')\n<?json\n{\"index\":0}\n?>\nset('data')\n@sync(vars:['data[0]'], values:['data'])\n\n@async(promise:'p[1]')\n<?json\n{\"index\":1}\n?>\nset('data')\n@sync(vars:['data[1]'], values:['data'])\n@all({{p}})\nget('data')\n"
            }
        },  
    
        execute: (command, state, config) => {
            return new Promise( (resolve,reject) => {


                state.packages = (command.settings.packages) 
                                    ? !util.isArray(command.settings.packages)
                                        ? [command.settings.packages]
                                        : command.settings.packages
                                    : undefined;     
               

                resolve(state)
            })
        }  
    },
    
    "@all": {
        name: "@all",
        synonims: {},
        "internal aliases": {
            "promises": "promises",
            "branches": "promises",
        },

        defaultProperty: {
            "@all" : "promises"
        },
        help: {
            synopsis: "Process instruction waits ALL selected async codes",

            name: {
                "default": "@all",
                synonims: []
            },

            "default param": "promise",
            input:["string"],
            output:"Promise",

            params: [{
                name: "promises",
                synopsis: "Array of async code promises thats must be resolved",
                type:["array of promises", "bindable"],
                synonims: ["promises", "branches"],
                "default value": "undefined"
            }],

            example: {
                description: "Execute async codes",
                code:  "@async(promise:'p[0]')\n<?json\n{\"index\":0}\n?>\nset('data')\n@sync(vars:['data[0]'], values:['data'])\n\n@async(promise:'p[1]')\n<?json\n{\"index\":1}\n?>\nset('data')\n@sync(vars:['data[1]'], values:['data'])\n@all({{p}})\nget('data')\n"
            }
        },  
    
        execute: (command, state, config) => {
            return new Promise( (resolve,reject) => {
                var promises = command.settings.promises || state.head.data;
                promises = (!util.isArray(promises)) ? [promises] : promises;

                Promise.all(promises)
                    .then( st => { resolve(st[0]) })
                    .catch( e => { reject(e) })    
            })
          }  
    },

    "@any": {
           name: "@any",
            synonims: {},
            "internal aliases": {
                "promises": "promises",
                "branches": "promises",
            },

            defaultProperty: {
                "@any" : "promises"
            },
            help: {
                synopsis: "Process instruction waits ANY selected async codes",

                name: {
                    "default": "@any",
                    synonims: []
                },

                "default param": "promise",
                input:["string"],
                output:"Promise",

                params: [{
                    name: "promises",
                    synopsis: "Array of async code promises thats must be resolved",
                    type:["array of promises", "bindable"],
                    synonims: ["promises", "branches"],
                    "default value": "undefined"
                }],

                example: {
                    description: "Execute async codes",
                    code:  "@async(promise:'p[0]')\n<?json\n{\"index\":0}\n?>\nset('data')\n@sync(vars:['data[0]'], values:['data'])\n\n@async(promise:'p[1]')\n<?json\n{\"index\":1}\n?>\nset('data')\n@sync(vars:['data[1]'], values:['data'])\n@all({{p}})\nget('data')\n"
                }
            },  
          
          execute: (command, state, config) => {
            return new Promise( (resolve,reject) => {
                var promises = command.settings.promises || state.head.data;
                promises = (!util.isArray(promises)) ? [promises] : promises;
                
                Promise.any(promises)
                    .then(rr => { resolve(rr) })    
            })
          }  
    },

    "@async": {
        name: "@async",
        synonims: {},
        "internal aliases": {
            "promise": "promise",
            "branch": "promise",
        },

        defaultProperty: {
            "@async" : "promise"
        },
        help: {
            synopsis: "Process instruction starts async code between @async and @sync instruction",

            name: {
                "default": "@async",
                synonims: []
            },

            "default param": "promise",
            input:["string"],
            output:"Promise",

            params: [{
                name: "@async : promise",
                synopsis: "Scope variable path where promise will be stored. Promise not will be stored when scope variable path is undefined.",
                type:["js-path"],
                synonims: ["promise", "branch"],
                "default value": "undefined"
            },{
                name: "@sync : vars",
                synopsis: "Array of parent scope variable pathes thats will be synchronized",
                type:["array of js-path"],
                synonims: [],
                "default value": "none"
            },{
                name: "@sync : values",
                synopsis: "Array of variable pathes in async code scope  thats store values thats will be synchronized with parent scope",
                type:["array of js-path"],
                synonims: [],
                "default value": "none"
            }],

            example: {
                description: "Execute async codes",
                code:  "@async(promise:'p[0]')\n<?json\n{\"index\":0}\n?>\nset('data')\n@sync(vars:['data[0]'], values:['data'])\n\n@async(promise:'p[1]')\n<?json\n{\"index\":1}\n?>\nset('data')\n@sync(vars:['data[1]'], values:['data'])\n@all({{p}})\nget('data')\n"
            }
        },  

        execute: (command, state, config) => {
                
                var bb = branchIndex++;    
                return new Promise( (resolve, reject) => {

                    var parent = state.instance;
                    var storage = copy(state.storage);

                    var s = new Script()
                        .config(state.instance.config())

                    s._state = {
                        locale: state.locale,
                        client: state.client,
                        instance: s,
                        storage: storage,
                        promises:{},
                        _lib: state._lib,
                        head: copy(state.head)
                    }

                    
                    var result = new Promise( (resolve,reject) => {
                        s.executeBranch(
                            processInctruction.branches(command.settings.childs), 
                            s._state
                        )
                        .then( _state => {
                            if(command.settings.sync.vars)
                                command.settings.sync.vars.forEach( (_var,index) => {
                                    if(util.isString(_var)){
                                     var value = copy(
                                        _.get(
                                            _state.storage,
                                             command.settings.sync.values[index]
                                        ))
                                     state.storage = _.set(state.storage, _var, value)

                                    }
                                })
                            resolve(state)
                        })
                        .catch(e => { reject(e) })
                    })
                    
                    
                    var _v = command.settings.promise || command.settings.as;
                    
                    if(_v) state.storage = _.set(state.storage, _v, result)
                    
                    state.head = {
                        type:"promise",
                        data: result  
                    }
                    resolve(state)

                })
                .catch( e => { reject(e) })
        }
    },

    branches: cmdList => {
        cmdList = cmdList || [];
        var result = [];
        var transaction;
        var c = 0;
        var asyncCount = 0;
        var syncCount = 0;
        try{
            for (var i = 0; i < cmdList.length; i++) {
                if (["@async"].indexOf(cmdList[i].processId) >= 0) asyncCount++;
                if (["@sync"].indexOf(cmdList[i].processId) >= 0) syncCount++;
                
                if (["@async"].indexOf(cmdList[i].processId) >= 0 && c == 0) {
                    // console.log("@async settings ", cmdList[i].settings)
                    transaction = cmdList[i];
                    transaction.settings.childs = [];
                    c++;
                    continue;
                }

                if (["@async"].indexOf(cmdList[i].processId) >= 0 && c > 0) {
                    c++
                }

                if (["@sync"].indexOf(cmdList[i].processId) >= 0 && c > 0) {
                    c--
                }

                if (["@sync"].indexOf(cmdList[i].processId) >= 0 && c == 0) {
                    transaction.settings.sync = cmdList[i].settings;
                    result.push(transaction)
                    transaction == undefined;
                    continue;
                }

                if (c > 0) {
                    transaction.settings.childs.push(cmdList[i])
                } else {
                    result.push(cmdList[i])
                }

            }
        } catch(e){
            throw new ScriptError("Async codes structure not recognized")
        }    
        if( (asyncCount-syncCount) != 0)
            throw new ScriptError("Some async codes not synchronized")
        return result;
    }
} 





var Script = function(config, script, context) {

    this._script = script;
    this.id = branchIndex++;
    this._config = [
        processInctruction["@async"],
        processInctruction["@all"],
        processInctruction["@any"],
        processInctruction["@defaults"]
    ]
    
    config = config || [];
    this._config = this._config.concat(config)

    this._state = {
        locale: "en",
        instance: this,
        promises: {},
        storage: context || {},
        head: {
            type: undefined,
            data: undefined
        }
    }
    return this;
}


Script.prototype.errorState = function(msg) {
    this._state.head = {
        type: "error",
        data: msg.toString()
    }
    delete this._state.instance;
    return this._state;
}

Script.prototype.host = function(host) {
    if(host){
        this._host = host;
        return this;
    }
    return this._host
}

Script.prototype.execute = function(command, state, config) {

    var applyContext = (o, c) => {
        if (util.isObject(o)) {
            for (var key in o) {
                o[key] = applyContext(o[key], c)
            }
            return o
        }
        if (util.isArray(o)) {
            return o.map( item => applyContext(item, c) )
        }
        if (util.isString(o)) {
            if (o.match(/^\{\{[\s\S]*\}\}$/)) {
                let key = o.substring(2, o.length - 2);
                let r = _.get(c,key)

                // console.log("apply bind => \"",o,"\" :  typeof ", ((r) ? typeof r : "$undefined"))
                
                return (r) ? r : null
            } else {
                if (o.match(/^\<\?[\s\S]*\?\>$/)) {
                    let r = o.substring(2, o.length - 2);

                    try {
                        r = eval(
                            `
                            (function() { 
                              let $scope = this;
                              return (${r}) 
                            })
                            `
                          ).apply(c)  

                        return r    
                    } catch ( e ) {
                        throw new ScriptError(`Cannot evaluate scriptable: ${r} :` + e.toString())
                    }
                    
                } else {
                    return o    
                }
            }
        }
        return o;
    }

    var self = this;

    return new Promise( (resolve, reject) => {
        let executor;
        if(state.packages){
            state.packages.forEach((pkg) => {
                let executor_index = self._config.map(item => item.name).indexOf(pkg+"."+command.processId);
                if(executor && executor_index >= 0){
                    reject(new ScriptError("Dublicate command implementation: '" + command.processId ))
                }
                executor = (executor_index >=0)
                            ? self._config[executor_index]
                            : executor                
            })
        }    
    
        
        executor = (!executor)
                    ? self._config[self._config.map(item => item.name).indexOf(command.processId)]
                    : executor
        
        
        if (!executor || !executor.execute) {
            reject(new ScriptError("Command '" + command.processId + "'  not implemented"))
            return
        }

        try {
           
            if(command.processId != "@async")
                command = applyContext(command, self._state.storage)
            
            var s = executor.execute(command, self._state, config)
            if (s.then) {
                s.then(state => { resolve(state)})
                .catch(e => { reject(e) })
            } else {
                resolve(s)
            }
        } catch (e) { reject(e) }
    })
}

Script.prototype.executeBranch = function(commandList, state){
    var self = this;
    if (state) {
            self._state.locale = state.locale || self._state.locale;
            self._state.client = state.client || self._state.client;
            
            self._state.storage = state.storage || self._state.storage;
        }
    return Promise
            .reduce(commandList, (cp, command, index) => new Promise( (resolve, reject) => {
                    if(self._state.head.type == "error")
                    reject(new ScriptError(self._state.head.data.message))    
                    setTimeout( () => {
                        self.execute(command, self._state, self._config)
                            .then( newState => {
                                self._state = newState
                                resolve(self._state)
                            })
                            .catch(e => {
                                let lineIndex = parser.ErrorMapper().findLineOfCommandStart(self._script, index)+1;
                                let text = parser.ErrorMapper().findTextOfCommand(self._script, index);
                                reject(new ScriptError(
                                        `
Detect error at line ${lineIndex}:
...
${text}
^
${e.toString()}
`
                                ))        
                                        
                            })
                    }, 0)    
                })
            , 0)
}

Script.prototype.getResult = function(o){
    return copy(o)
}

Script.prototype.run = function(state) {
    var self = this;
    return new Promise( (resolve, reject) => {
        if (!self._script) {
            reject(new ScriptError("Cannot run undefined script"))
        }
        if (self._config.length == 0) {
           reject(new ScriptError("Interpretator not configured"))
        }

        try {
            var commandList = new parser()
                .config(self._config)
                .parse(self._script);
        } catch (e) {
            reject(new ScriptError(e.toString()))
        }
        commandList = processInctruction.branches(commandList, state)

        self.executeBranch(commandList, state)
            .then( () => {
                if(self._state.head.data instanceof Promise){
                    resolve({
                        type:"promise",
                        data:self._state.head.data.toString()
                    })
                }
                resolve(self.getResult(self._state.head))
            })
            .catch( e =>  { reject(new ScriptError("On "+self._host+": "+e.toString())) })
    })

}

Script.prototype.script = function() {
    if (arguments.length > 0) {
        this._script = arguments[0];
        return this;
    }
    return this._script;
}

Script.prototype.state = function() {
    if (arguments.length > 0) {
        this._state = arguments[0];
        return this;
    }
    return this._state;
}

Script.prototype.config = function() {
    if (arguments.length > 0) {
        this._config = this._config.concat(arguments[0]);
        return this;
    }
    return this._config;
}

module.exports = Script;












