const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class History extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'History'
    this.aliases = ['warnlist', 'avisos', 'history']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const emptyMessage = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **History:**', `${message.author.username}`, true)
      .setDescription('Com este comando você facilmente ver a lista de avisos de um usuário.') // inline false
      .addField('*Uso do comando:*', '`history <@user>`', true)
      .addField('*Exemplo:*', '`history @Solaris#0006`', true)

    if (!args[0]) return message.reply({ embeds: [emptyMessage] })

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    const documento = await this.client.database.guild.getOrCreate(message.guild)
    const user = await documento.getOrCreate(member.id)

    const warnlist = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setThumbnail(member.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTitle('Ação | Lista de Punições')
      .setDescription(`O usuário ${member} possui as seguintes punições:`) // inline false
      .addField('`Punições:`', `**${user.warnreason} | Data: | Servidor:**`)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (user.warnreason === ' ') return message.reply('Este usuário não possui avisos neste servidor.')
    else message.reply({ embeds: [warnlist] })
  }
}