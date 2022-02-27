const { Schema } = require('mongoose')

const RegistradorSchema = new Schema({
  _id: String,
  membrosRegistrados: [{
    _id: String,
    genero: String,
    timestamp: Number
  }]
})

module.exports = RegistradorSchema