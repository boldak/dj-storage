module.exports = {
  attributes: {
    schema: {
      type: 'string',
      required: true,
      unique: true,
      primaryKey: true
    },
    
    name: {
      type: 'string',
      required: true,
      unique: true,
      primaryKey: true
    },
    
    model: {
      type: 'json',
      required: true
    }
  }
};