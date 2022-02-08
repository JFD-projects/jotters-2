const {Schema, model} = require('mongoose')

const schema = new Schema({
  jotterId: {type: Schema.Types.ObjectId, ref: 'JotterModel', required: true},
  title: String,
  content: String,
  isPublic: {type: Boolean, default: false},
}, {
  timestamps: true
})

module.exports = model('Note', schema)
