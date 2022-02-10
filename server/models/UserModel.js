const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: String,
  email: {type: String, require: true, unique: true},
  password: {type: String, select: false},
  image: String,
  isAdmin: {type: Boolean, default: false}
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('User', schema)
