const {Schema, model} = require('mongoose')

const schema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  refreshToken: {type: String, required: true}
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('Token', schema)
