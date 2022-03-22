const { Command, colors } = require('../../utils')
const moment = require('moment')
const { MessageEmbed } = require('discord.js')
moment.locale('pt-br')

module.exports = class Reps extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'reps'
    this.aliases = ['reps']
    this.category = 'Social'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    if (!member) return message.reply('Algum erro terrível aconteceu, entre em contato com skedaddle via /bug')
    const user = await this.client.database.user.getOrCreate(member.id)
    const embed = new MessageEmbed()
      .setColor(colors.default)
      .setTimestamp()
      .setThumbnail('https://cdn.discordapp.com/emojis/763532885935259688.png?v=1')
      .setDescription('**REPUTAÇÃO TOTAL:**')
      .addField('Usuário:', `${member}`)
      .addField('Reps:', `${user.rep}`)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
    message.reply({ embeds: [embed] })
  }
}