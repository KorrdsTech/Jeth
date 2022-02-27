const { model, Schema } = require('mongoose')
const userMutados = new Schema({
  _id: String,
  server: String,
  time: Number,
  channel: String
})

module.exports = model('Mutados', userMutados)