const { model, Schema } = require('mongoose')

const canal = new Schema({
  _id: { type: String }
})

module.exports = model('Canal', canal)