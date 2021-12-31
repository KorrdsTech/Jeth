const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class ServerInfoCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'serverinfo'
    this.aliases = ['server', 'infoserver']
    this.category = 'misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const embed = new MessageEmbed()
    embed.setTimestamp()
    embed.setColor(colors['default'])
    embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
    embed.setTitle('🧭 **Informações do Servidor:**')
    embed.setDescription(`🙋🏻 **| Nome:** ${message.guild.name}\n👑 **| Dono:** <@${message.guild.ownerId}>\n🤹🏼‍♂️ **| Membros:**${message.guild.memberCount}\n🗺 **| Membros em call:** ${message.guild.members.cache.filter(({ voice }) => voice.channelId !== null).size}\n⌛️ **| Criado:** ${message.guild.createdAt}`)
    embed.setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

    message.channel.send({ embeds: [embed] })
  }
}

exports.help = {
  name: 'serverinfo'
}