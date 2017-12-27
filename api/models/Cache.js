/**
 * Cache.js
 *
 * @description :: Model for cached data
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    value: {
      type: 'json',
      required: true
    },
    hash: {
      type: 'string',
      required: false,
      unique: true
    }
  }
};

