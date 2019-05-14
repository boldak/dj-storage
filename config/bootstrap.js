/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */


let Promise = require('bluebird')
let writeFile = Promise.promisify(require('fs').writeFile);
let util = require("util")


let reloadORM =  sails => new Promise(( resolve, reject ) => {
    try {
            
            sails.once("hook:orm:reloaded", () => { resolve() })
            sails.hooks.orm.teardown(()=>{
                sails.hooks.orm.configure()
                _.forIn(sails.models, (value,key) => {
                    if(util.isObject(value)) value.datastore = undefined;
                })
                sails.hooks.orm.reload();
            })
        } catch (e) {
            reject(e.toString()) 
        }       
  })



module.exports.bootstrap = function (cb) {
  sails.log.debug("Process enviroment:");
  _.forIn(process.env, (value,key) => {sails.log.debug(key+" = "+ value)})
  sails.log.debug("Initialize DJ Storage service")
  sails.log.debug("Use DB " + JSON.stringify(sails.config.connections.mongodbServer))
  
  // Restore user defined models

  Entities
    .find({})
    .then((res) => {
      sails.log.debug("Restore user defined models:")
      Promise.all( res.map((model) => {
          sails.log.debug(`=> ${model.identity}`)
          return writeFile(   `./api/models/${model.identity}.js`, 
            `module.exports = ${JSON.stringify(model.model)}`
          );
      }))
      .then((res)=> {
        sails.log.debug('Reload ORM hook')
        reloadORM(sails)
          .then(() => {
            sails.log.debug('User defined models are restored')
            cb()
          })
          .catch(e => {sails.log.error(e)})
      })
    })

  // sails.services.passport.loadStrategies();

  // add default admins; you can add others later on using mongodb console
  // for (var i = 0; i < sails.config.admins.length; ++i) {
  //   var adminEmail = sails.config.admins[i];
  //   User.update({email: adminEmail}, {isAdmin: true}).exec(_.noop);
  // }
  // AppConfig.native(function (err, collection) {
    // replace with createIndex after updating to MongoDB 3.*
  //   collection.ensureIndex({name: 1}, {unique: true}, function (err) {
  //     if (err) {
  //       sails.log.error('Error happened while setting up mongo index on appconfig model: ' + err);
  //     }
  //   });
  // });

  // addDefaultAppConfigs(); // allow running async, even after bootstrap is finished
  // addDefaultPortalConfig();
  // // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  // cb();
};
