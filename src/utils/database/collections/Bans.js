const { model, Schema } = require('mongoose')
const Bans = new Schema({
  guildID: { type: String },
  userID: { type: String },

  // Counter Bans System

  bans: { type: Number, default: 1 },
})

module.exports = model('Bans', Bans)
