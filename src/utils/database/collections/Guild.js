const { model, Schema } = require('mongoose')
const RegistradorSchema = require('./RegistradorSchema')
const Guild = new Schema({
  _id: { type: String },
  //extras
  timerSpam: { type: String, default: '10m' },
  linkanuncio: { type: String, default: ' ' },
  prefix: { type: String, default: '-' },
  partner: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
  blacklistModule: { type: Boolean, default: false },
  //módulos welcome,contador etc
  welcomeModule: { type: Boolean, default: false },
  saidaModule: { type: Boolean, default: false },
  leaveModule: { type: Boolean, default: false },
  vipGuild: { type: Boolean, default: true },
  count: { type: Boolean, default: false },
  antInvite: { type: Boolean, default: false },
  antSpam: { type: Boolean, default: false },
  sugesModule: { type: Boolean, default: false },
  //messagem dos módulos
  infoantspam: { type: String, default: '[AUTOMOD] Spam/Flood em canais de texto.' },
  welcomeMessage: { type: String, default: '' },
  countMessage: { type: String, default: '{azul}' },
  leaveMessage: { type: String, default: '' },
  saidaMessage: { type: String, default: '' },
  //canais para info:
  infoantinv: { type: String, default: '' },
  countChannel: { type: String, default: '' },
  sugesChannel: { type: String, default: '' },
  punishChannel: { type: String, default: '' },
  channelWelcome: { type: String, default: '' },
  channelLeave: { type: String, default: '' },
  channelRegister: { type: String, default: '' },
  channelsaida: { type: String, default: '' },

  
// NEW SYSTEM COUNTER!!!!
    counterChannel: { type: String, default: '' },
  counterMessage: { type: String, default: '{contador}' },
  counterType: { type: String, default: '{azul}' },
  counterStatus: { type: Boolean, default: false },
})

module.exports = model('Guilds', Guild)
