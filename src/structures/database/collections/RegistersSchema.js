const { Schema, model } = require('mongoose')
const RegistersSchema = new Schema({
  _id: String,
  genero: String,
  timestamp: Number
})

module.exports = RegistersSchema