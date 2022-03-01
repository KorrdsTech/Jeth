const { Command, colors } = require('../../utils')
const { Discord } = require('discord.js')

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

    const erroDePermissão = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor(colors.mod)
      .setTitle('**Err:**', `${message.author}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`ADMINISTRATOR`', true)
      .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

    if (!args[0]) { return message.channel.send(`${message.author}, defina um novo prefixo! **${documento.prefix}prefix <novo prefix>**`) } // Tell them if they didn't supply any arguments.

    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({ embeds: [erroDePermissão] })

    if (args.join(' ').length > 2) return message.channel.send(`${message.author}, eu possuo um limite máximo de 2 caracteres em meu prefix, tente novamente amiguinho(a).`)

    documento.prefix = args.join(' ')
    documento.save()

    message.channel.send(`<:concludo:739830713792331817> ${message.author}, meu prefix foi alterado para **${documento.prefix}**`)
  }
}