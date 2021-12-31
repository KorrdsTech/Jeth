const { Command, colors } = require('../../utils');
const { MessageEmbed } = require('discord.js');
const moment = require('moment')
moment.locale('pt-br')
require('moment-duration-format')

module.exports = class BotInfoCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'botinfo'
    this.aliases = ['informação', 'info', 'informações']
    this.category = 'misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const embed = new MessageEmbed()
    embed.setDescription('<:info:695503582342152273> **Informações:**')
    embed.setThumbnail(this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
    embed.setTimestamp()
    embed.setColor(colors['default'])
    embed.setImage('https://media.giphy.com/media/3NnnS6Q8hVPZC/giphy.gif')
    embed.setDescription('**💖 Uma pequena bot focada em moderação sendo desenvolvida dentro deste vasto mundo conhecido como Discord 👧**')
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
    embed.addFields([
      { name: `<:7377_Discordbutcool:832746857159196672> Meu nome: **${this.client.user.tag}**`, value: `Estou online à: ${moment.duration(this.client.uptime).format('D [dias], H [horas], m [min], s [segundos]')}`, inline: true },
      { name: '<:9461systemmessageuser:832746852633149460> Programadores:', value: '<@753778869013577739> \n <@395788326835322882>', inline: false }
    ])

    message.channel.send({ embeds: [embed] })
  }
};
