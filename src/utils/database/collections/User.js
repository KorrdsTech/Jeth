const { model, Schema } = require('mongoose')
const User = new Schema({
  _id: { type: String },
  warnreason: { type: String, default: ' ' },
  blacklist: { type: Boolean, default: false },
  blacklistReason: { type: String, default: null },
  rep: { type: Number, default: 0 },
  repTime: { type: String, default: '000000000000' },
  gifban: { type: String, default: '' },
  cor: { type: String, default: '' },
  vip: { type: Boolean, default: false },
  strike: { type: Number, default: 0 },
  staff: { type: Boolean, default: false }
})

module.exports = model('Users', User)
