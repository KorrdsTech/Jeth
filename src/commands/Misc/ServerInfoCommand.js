const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class serverinfo extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'serverinfo'
    this.aliases = ['serverinfo', 'server', 'infoserver']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message) {
    const filterLevels = {
      DISABLED: 'Off',
      MEMBERS_WITHOUT_ROLES: 'No Role',
      ALL_MEMBERS: 'Everyone'
    };

    const verificationLevels = {
      NONE: 'None',
      LOW: 'Low',
      MEDIUM: 'Medium',
      HIGH: '(╯°□°）╯︵ ┻━┻',
      VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
    };

    if (!message.guild.me.permissions.has('SEND_MESSAGES')) return console.log('DISCORD: Estou sem permissão em um servidor.')
    const embed = new MessageEmbed()

      .setTimestamp()
      .setColor(colors.default)
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle('🧭 **Informações do Servidor:**')
      .setDescription(`🙋🏻 **| Nome:** \n${message.guild.name} \n \n  🤹🏼‍♂️ **| Membros:** \n ${message.guild.memberCount} \n \n ⌛️ **| Criado:** \n ${message.guild.createdAt} \n \n🔐 ** | Nível de verificação:** ${verificationLevels[message.guild.verificationLevel]} \n \n🔞 ** | Filtro de conteúdo explícito:** ${filterLevels[message.guild.explicitContentFilter]}`) // inline false
      .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

    message.channel.send({ embeds: [embed] })
  }
}

exports.help = {
  name: 'serverinfo'
}