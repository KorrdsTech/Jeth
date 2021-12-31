const { Command } = require('../../utils')

module.exports = class CreateInviteCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'createinvite'
    this.aliases = []
    this.category = 'magic'
    this.adminOnly = true
  }

  async run(message, args) {

    const guild = args.join(' ')
    if (!guild) return message.channel.send(`<:JethVerificado:666762183249494027> **|** ${message.author} Indique o ID ou nome do servidor que você deseja pegar o convite.`)
    const guilds = this.client.guilds.cache.get(args[0]) || this.client.guilds.find(g => g.name === guild)
    if (!guilds.me.permissions.has('CREATE_INSTANT_INVITE')) return message.channel.send(`<:JethVerificado:666762183249494027> **|** ${message.author} Eu não tenho permissão para criar convites nesse servidor.`)
    const invite = await this.client.guilds.cache.get(guilds.id).channels.random().createInvite()

    message.channel.send(`<:JethVerificado:666762183249494027> **|** ${message.author} Aqui está o convite: ${invite}`)
  }
}