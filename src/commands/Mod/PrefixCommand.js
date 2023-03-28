const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class Prefix extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'prefix'
    this.aliases = ['prefix', 'prefixo', 'setprefix', 'set.prefix', 'prefix.set']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const documento = await this.client.database.guild.getOrCreate(message.guild.id)

    const erroDePermissão = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${message.author}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_GUILD`', true)
        

    if (!args[0]) { return message.reply(`${message.author}, defina um novo prefixo! **${documento.prefix}prefix <novo prefix>**`) } // Tell them if they didn't supply any arguments.

    if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply({ embeds: [erroDePermissão] })

    if (args.join(' ').length > 2) return message.reply(`${message.author}, eu possuo um limite máximo de 2 caracteres em meu prefix, tente novamente amiguinho(a).`)

    documento.prefix = args.join(' ')
    documento.save()

    message.reply(`<:concludinho:1040860364251877427> ${message.author}, meu prefix foi alterado para **${documento.prefix}**`)
  }
}