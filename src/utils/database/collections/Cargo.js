const { model, Schema } = require('mongoose')
const Cargo = new Schema({
  _id: { type: String }
})

module.exports = model('Cargo', Cargo)