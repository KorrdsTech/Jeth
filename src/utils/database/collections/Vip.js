const { model, Schema } = require('mongoose')
const Vip = new Schema({
  guildID: { type: String },
  userID: { type: String },
  vip: { type: Boolean, default: false },
  roleID: { type: String, default: '' },
  callID: { type: String, default: '' },
  colorVip: { type: String, default: '#ffffff' },
})

module.exports = model('Vips', Vip)