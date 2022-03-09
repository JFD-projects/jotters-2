const {Schema, model} = require('mongoose')

const schema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  title: String,
  color: String,
  hasPublicNote: {type: Boolean, default: false},
  notesNumber: {type: Number, default: 0}
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('Jotter', schema)
