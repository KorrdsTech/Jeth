const { Command } = require('../../utils')

module.exports = class createInvite extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'createinvite'
    this.aliases = ['createinvite', 'invite']
    this.category = 'Magic'
    this.adminOnly = true
  }

  async run(message, args) {

    const guild = args.join(' ')
    if (!guild) return message.reply(`<:JethVerificado:666762183249494027> **|** ${message.author} Indique o ID ou nome do servidor que você deseja pegar o convite.`)
    const guilds = this.client.guilds.get(args[0]) || this.client.guilds.find(g => g.name === guild)
    if (!guilds.member(this.client.user).permissions.has('CREATE_INSTANT_INVITE')) return message.reply(`<:JethVerificado:666762183249494027> **|** ${message.author} Eu não tenho permissão para criar convites nesse servidor.`)
    const invite = await this.client.guilds.get(guilds.id).channels.random().createInvite()

    message.reply(`<:JethVerificado:666762183249494027> **|** ${message.author} Aqui está o convite: ${invite}`)
  }
}