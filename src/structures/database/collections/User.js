const mongoose = require('mongoose')
const Users = new mongoose.Schema({
  _id: { type: String },
  blacklist: { type: Boolean, default: false },
  blacklistReason: { type: String, default: '' },
  rep: { type: Number, default: 0 },
  repTime: { type: String, default: '000000000000' },
  gifban: { type: String, default: '' },
  cor: { type: String, default: '' },
  vip: { type: Boolean, default: false },
  strike: { type: Number, default: 0 },
  staff: { type: Boolean, default: false }
})

module.exports = mongoose.model('Users', Users)