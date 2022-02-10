const {Schema, model} = require('mongoose')

const schema = new Schema({
  content: {type: String, required: true},
  noteId: {type: Schema.Types.ObjectId, ref: 'NoteModel', required: true},
  userId: {type: Schema.Types.ObjectId, ref: 'UserModel', required: true}
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('Comment', schema)
