const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class serverinfo extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'serverinfo'
    this.aliases = ['serverinfo', 'server', 'infoserver']
    this.category = 'Fun'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    if (!message.guild.me.permissions.has('SEND_MESSAGES')) return console.log('DISCORD: Estou sem permissão em um servidor.')
    const embed = new Discord.MessageEmbed()

      .setTimestamp()
      .setColor(colors.default)
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle('🧭 **Informações do Servidor:**')
      .setDescription(`🙋🏻 **| Nome:** \n${message.guild.name} \n \n 👑 **| Dono:** \n ${message.guild.owner.user} \n \n  🤹🏼‍♂️ **| Membros:** \n ${message.guild.memberCount} \n \n 🗺 **| Região do Servidor:** \n ${message.guild.region} \n \n ⌛️ **| Criado:** \n ${message.guild.createdAt}`) // inline false
      .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

    message.channel.send({ embeds: [embed] })
  }
}

exports.help = {
  name: 'serverinfo'
}