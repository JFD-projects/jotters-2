const {Schema, model} = require('mongoose')

const schema = new Schema({
  jotterId: {type: Schema.Types.ObjectId, ref: 'Jotter', required: true},
  title: String,
  content: {type: String, default: ''},
  isPublic: {type: Boolean, default: false},
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('Note', schema)
