const { model, Schema } = require('mongoose')
const Warn = new Schema({
  guildID: { type: String },
  memberID: { type: String },
  warnings: { type: Array },
  staff: { type: Array },
  date: { type: Array },
})

module.exports = model('Warns', Warn)