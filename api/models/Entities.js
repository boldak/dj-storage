module.exports = {
  attributes: {
    schema: {
      type: 'string',
      required: true,
      unique: true,
      primaryKey: true
    },
    
    identity: {
      type: 'string',
      required: true,
      unique: true,
      primaryKey: true
    },
    
    model: {
      type: 'json',
      required: true
    },

    owner:{
      type: 'json',
      required: true
    },

    permissions: {
      type: 'json'
    }
    
  }
};