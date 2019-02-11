const util = require('util');

const values = [];

class ParserUtils {
  constructor() {
  }

  lookup(o, keywords) {
      keywords =  keywords || {};

      if (util.isDate(o))
          return o;

      if (util.isString(o))
          return ((keywords[o.toLowerCase()]) ? keywords[o.toLowerCase()] : o);

      if (util.isArray(o)) {
          const res = [];
          o.forEach(item => {
              res.push(this.lookup(item,keywords))
          });

          return res;
      }

      if (util.isObject(o)) {
          const res = {};
          Object.keys(o).forEach(key => res[this.lookup(key,keywords)] = this.lookup(o[key],keywords));

          return res;
      }

      return o;
  }

  varIndex(tag) {
      let key = tag.substring(1, tag.length - 1);

      if (key.indexOf("?") == 0) {
          key = key
              .replace(/\"/gim, '\\"');

          let postProcess;
          key = key.replace(
              /(?:\?)(javascript|json|text|html|dps|xml|csv|dot)/,
                  m => {
                      postProcess = m.substring(1);

                      return "";
                  }
              )
              .replace(/(^\?)|(\?$)/g, "")
              .replace(/\r/gim, "\\r")
              .replace(/\n/gim, "\\n")
              .replace(/\t/gim, "\\t")
              //.replace(/\"/gim, "'")

          values.push(key);

          return `context(value:^${values.length - 1});${postProcess}();`;
      } else {
          key = key.replace(/\"/gi, "'");
          values.push(key);

          return `^${values.length - 1}`;
      }
  }


  pushUrl(tag) {
      values.push(tag);

      return `^${values.length - 1}`;
  }


  getUrl(key) {
    return values[Number(key.substring(1))];
  }


  varValue(tag) {

      let key = tag.substring(1);
      let r = values[Number(key)];

      while (r.indexOf("^") == 0) {
          key = r.substring(1);
          r = values[Number(key)];
      }

      return `"${r}"`;
  }
}

module.exports = new ParserUtils();
