const { Schema, model } = require('mongoose')

const Users = new Schema({
  _id: String,
  server: String,
  time: Number,
  channel: String
})

module.exports = model('Mutados', Users)