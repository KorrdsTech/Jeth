const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')

module.exports = class SlowMode extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'slowmode'
    this.aliases = ['slowmode', 'modolento']
    this.category = 'Mod'
  }

  async run(message, args) {
    const embedA = new EmbedBuilder()

      .setTimestamp()
      .setColor(colors['default'])
      .setTitle('**Err:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addFields('*Verifique se você possui a permissão:*', '`MANAGE_GUILD`', true)
      .setFooter({ text: 'Moderando Discord', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
    if (!message.member.permissions.has('MANAGE_GUILD'))
      return message.reply({ embeds: [embedA] })
    const time = args[0]
    if (!time) return message.reply(`Indique um numero válido.`)
    if (time > 600) return message.reply(`Você não pode colocar 600 segundos de slowmode burrinho.`)
    if (0 < time) {
      message.channel.setRateLimitPerUser(time).then(() => {
        message.reply(`Slow mode ativado em: ${time}.`)
      })
    } else {
      message.channel.setRateLimitPerUser(time).then(() => {
        message.reply(`Slow mode desativado.`)
      })
    }
  }
}