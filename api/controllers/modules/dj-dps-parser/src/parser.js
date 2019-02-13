
// TODO refactor all code

const util = require('util');
const ParserError = require('./exceptions/parserError');
const ParserUtils = require('./utils/parserUtils');
const ErrorMapper = require('./utils/errorMapper');


const valuesRE = /'((?:\\\\[\'bfnrt/\\\\]|\\\\u[a-fA-F0-9]{4}|[^\'\\\\])*)'|\"((?:\\\\[\"bfnrt/\\\\]|\\\\u[a-fA-F0-9]{4}|[^\"\\\\])*)\"/gim;

const lineRE = /[\r\n\t\s]*/gim;

const lineCommentRE = /\/\/[\w\S\ .\t\:\,;\'\"\(\)\{\}\[\]0-9-_]*(?:[\n\r]*)/gi;
const inlineCommentRE = /\/\*[\w\W\b\.\t\:\,;\'\"\(\)\{\}\[\]\*0-9-_]*(?:\*\/)/gim;

const commandSplitRE = /(\))([a-zA-Z@])/gim;
const nonbrackedParamsRE = /\(([\w\b\.\t\:\,\'\"0-9-_]+[\w\b\.\t\:\,\'\"\[\]\^0-9-_]*)\)/gi;
const propertyNameRE = /((@[a-zA-Z\-_\.]+|[a-zA-Z\-_\.]+)(?=[\(\)\{\}\:\[\]\s]+))/gim;
const emptyPropsListRE = /\(\s*\)/gi;
const defaultValueRE = /\:\{\^*[0-9]+\};/gi;
const defaultStoredValueRE = /\:\^[0-9]+;/gi;
const urlLookup = /\^[0-9]+/gi;
const commandNameRE = /"@*([a-zA-Z0_-]+[a-zA-Z0-9_-]*\.*)+":/gi;
const paramsRE = /:[\{\^\[]+[a-zA-Z0-9_:",\^\{\}\[\]-]*[\}\]]+;*|:\^[0-9]+;*/gi;

const scriptRE = /(\<\?([^?]|(\?+[^?\>]))*\?\>)/g;

const bindableRE = /({{[a-zA-Z\$\_]+[a-zA-Z0-9\$\_\.\[\]\"\']*}})/g;

const urlRE = /((https?:\/\/)([a-zA-Z0-9]+[a-zA-Z0-9_-]*)(:\d{0,4})?([a-zA-Z0-9_\-\/\%\=\{\}\?\+\&\.\:]*))/g;

class ScriptParser {
    static ErrorMapper() { return ErrorMapper}
    
    constructor() {
        this.defaultPropName = {}
        this.keywords = {};
        this.commands = {};
    }

    config(commands) {
        if (!commands)
          return this;

        if (!util.isArray(commands)) commands = [commands]

        commands.forEach(command => {
            Object.keys(command.defaultProperty).forEach(k => this.defaultPropName[k] = command.defaultProperty[k]);

            Object.keys(command.synonims).forEach(k => this.keywords[k] = command.synonims[k]);

            this.commands[command.name] = command;
        });

        return this;
    }

    parse(str) {
        const self = this;

        let p = str
            .replace(scriptRE, ParserUtils.varIndex)
            .replace(urlRE, ParserUtils.pushUrl)
            .replace(bindableRE,"\"$1\"")

            .replace(lineCommentRE, "")
            .replace(valuesRE, ParserUtils.varIndex)
            .replace(lineRE, "")
            .replace(inlineCommentRE, "")

            .replace(commandSplitRE, "$1;$2")
            .replace(nonbrackedParamsRE, "({$1})")
            .replace(propertyNameRE, "\"$1\"")
            .replace(/\'/gim, "\"")
            .replace(emptyPropsListRE, "({})")
            .replace(/\(/gim, ":")
            .replace(/\)/gim, "");

        try {
            p = p
                .split(";")
                .map(item => `${item};`)
                .map((cmd, i) => {
                    if (cmd == ";") {
                        return cmd
                    }
                    try {

                      let cmdName = cmd.match(commandNameRE)[0];
                      cmdName = cmdName.substring(1, cmdName.length - 2);

                      const params = cmd.match(paramsRE).map(item => {
                        if (item.match(defaultValueRE)) {
                          let p;
                          if (item.match(/\:\{\^/gi)) {
                            p = item.substring(3, item.length - 3);
                          } else if (item.match(/\:\{/gi)) {
                            p = item.substring(2, item.length - 2);
                          }

                          return `:{"${self.defaultPropName[cmdName]}":${p}}`
                        }
                        if (item.match(defaultStoredValueRE)) {
                          const p = item.substring(1, item.length - 1);

                          return `:{"${self.defaultPropName[cmdName]}":${p}}`;
                        }
                        return item;
                      });

                      return `"${cmdName}"${params[0]}`;
                    } catch (e) {

                      throw new ParserError(e.message, i, ErrorMapper.findLineOfCommandStart(str, i));
                    }
                })
                .join(";")
                .replace(/;;/gi, ";");


            const script = [];
            const cmd = p.split(";");
            cmd.forEach((cm, i) => {
                try {
                  const t = JSON.parse(`{${cm.replace(/\^[0-9]+/gim, ParserUtils.varValue)}}`);
                  script.push(t);
                } catch(e) {

                  throw new ParserError(e.message, i, ErrorMapper.findLineOfCommandStart(str, i));
                }

            })

            const result = script.map(c => {

                const res = {
                    processId: ParserUtils.lookup(Object.keys(c)[0],self.keywords),
                    settings: c[Object.keys(c)[0]]
                };

                if(self.commands[res.processId]){
                    res.settings = ParserUtils.lookup(res.settings, self.commands[res.processId]["internal aliases"])
                }

                return res;
            })
            .filter(c => c.processId);

        result.forEach(c => {
            if (c.processId == "context" && c.settings.value.replace) {
                c.settings.value = c.settings.value.replace(urlLookup, ParserUtils.getUrl)
            }
        });

        return result;
      } catch (e) {
        if (!(e instanceof ParserError))
          throw new ParserError(e.toString());

        else
          throw e;
      }
    }


    stringify(script) {
        return script.map(c => `${c.processId}(${JSON.stringify(c.settings)})`).join(";");
    }


    applyContext(template, context) {
        const getContextValue = function() {
            const tags = arguments[1].split(".");
            let value = context;

            tags.forEach(tag => {
                tag = tag.trim();
                value = value[tag];
            })

            return value;
        };

        return template.replace(/(?:\{\{\s*)([a-zA-Z0-9_\.]*)(?:\s*\}\})/gim, getContextValue);
    }
}

module.exports = ScriptParser;
