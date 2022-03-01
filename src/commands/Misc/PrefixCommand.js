const { Command } = require('../../utils')

module.exports = class Prefix extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'prefix'
    this.aliases = ['prefix', 'prefixo', 'setprefix', 'set.prefix', 'prefix.set']
    this.category = 'Fun'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const documento = await this.client.database.guild.getOrCreate(message.guild.id)
    if (!args[0]) { return message.channel.send(`${message.author}, defina um novo prefixo! **${documento.prefix}prefix <novo prefix>**`) } // Tell them if they didn't supply any arguments.

    if (args.join(' ').length > 2) return message.channel.send(`${message.author}, eu possuo um limite máximo de 2 caracteres em meu prefix, tente novamente amiguinho(a).`)

    documento.prefix = args.join(' ')
    documento.save()

    message.channel.send(`<:concludo:739830713792331817> ${message.author}, meu prefix foi alterado para **${documento.prefix}**`)
  }
}