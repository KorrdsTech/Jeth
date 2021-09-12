const { Schema, model } = require('mongoose')
const RegistersSchema = require('./RegistersSchema')
const Guild = new Schema({
  _id: { type: String },
  linkanuncio: { type: String, default: '' },
  prefix: { type: String, default: process.env.PREFIX },
  partner: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
  welcomeModule: { type: Boolean, default: false },
  saidaModule: { type: Boolean, default: false },
  leaveModule: { type: Boolean, default: false },
  vip: { type: Boolean, default: false },
  count: { type: Boolean, default: false },
  antInvite: { type: Boolean, default: false },
  sugesModule: { type: Boolean, default: false },
  welcomeMessage: { type: String, default: '' },
  countMessage: { type: String, default: '{azul}' },
  leaveMessage: { type: String, default: '' },
  saidaMessage: { type: String, default: '' },
  infoantinv: { type: String, default: '' },
  countChannel: { type: String, default: '' },
  sugesChannel: { type: String, default: '' },
  channelWelcome: { type: String, default: '' },
  channelLeave: { type: String, default: '' },
  channelRegister: { type: String, default: '' },
  channelsaida: { type: String, default: '' },
  masculino: { type: String, default: '' },
  registrado: { type: String, default: '' },
  nbinario: { type: String, default: '' },
  novato: { type: String, default: '' },
  registradores: [RegistersSchema]
})

module.exports = model('Guilds', Guild)