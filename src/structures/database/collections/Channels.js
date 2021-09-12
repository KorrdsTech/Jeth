const { Schema, model } = require('mongoose')

const Channels = new Schema({
  _id: { type: String }
})

module.exports = model('Canal', Channels)