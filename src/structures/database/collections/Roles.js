const { Schema, model } = require('mongoose')

const Roles = new Schema({
  _id: { type: String }
})

module.exports = model('Cargo', Roles)