module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
      primaryKey: true
    },
    schema: {
      type: 'json',
      required: true
    }
  }
};