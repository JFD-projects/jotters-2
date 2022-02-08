const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: String,
  email: {type: String, require: true, unique: true},
  password: String,
  image: String,
  isAdmin: {type: Boolean, default: false}
}, {
  timestamps: true
})

module.exports = model('User', schema)
