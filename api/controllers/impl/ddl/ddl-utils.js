var Promise = require("bluebird");

class ReloadORMError extends Error {
  constructor(message) {
    super(message);
    this.name = "ORM reload error";
  }
}

module.exports = {
	reloadORM: (sails) => new Promise(( resolve, reject ) => {
		try {
            sails.once("hook:orm:reloaded", () => {
                       // _.forIn(sails.models, (value,key) => {
                       //      // if(util.isObject(value)) value.datastore = undefined;
                       //      console.log(key+" = "+ value.datastore)
                       //  }) 
                      resolve();
            })
            sails.hooks.orm.teardown(()=>{
                sails.hooks.orm.configure()
                // console.log("TEARDOWN drop")
                _.forIn(sails.models, (value,key) => {
                    if(util.isObject(value)) value.datastore = undefined;
                    // console.log(key+" = "+ value.datastore)
                })
                sails.hooks.orm.reload();
            })
        } catch (e) {
            reject(new ReloadORMError(e.toString())) 
        }       
	})
}