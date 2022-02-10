const {Schema, model} = require('mongoose')

const schema = new Schema({
  lng: {type: String, enum: ['en', 'ru'], required: true, unique: true},
  content: String
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('InfoNote', schema)
