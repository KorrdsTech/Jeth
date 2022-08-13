const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')
const modelWarn = require('../../utils/database/collections/Warn');
const moment = require('moment')
moment.locale('pt-br')

module.exports = class History extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'History'
    this.aliases = ['warnlist', 'avisos', 'history']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const emptyMessage = new EmbedBuilder()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **History:**', `${message.author.username}`, true)
      .setDescription('Com este comando você facilmente ver a lista de avisos de um usuário.') // inline false
      .addField('*Uso do comando:*', '`history <@user>`', true)
      .addField('*Exemplo:*', '`history @Solaris#0006`', true)

    const embedA = new EmbedBuilder()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MODERATE_MEMBERS`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('MODERATE_MEMBERS')) return message.reply({ embeds: [embedA] })

    if (!args[0]) return message.reply({ embeds: [emptyMessage] })

    const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (!usuario) {
      return message.reply(`<:reinterjection:955577574304657508> » Mencione um usuário valido.`)
    }

    const documentWarn = await modelWarn.findOne({
      guildID: message.guild.id,
      memberID: usuario.id,
    }).catch(err => console.log(err))

    if (!documentWarn || !documentWarn.warnings.length) {
      return message.reply(`<:reinterjection:955577574304657508> » Esse usuário não possui warns nesse servidor.`)
    }

    const data = []

    for (let i = 0; documentWarn.warnings.length > i; i++) {
      data.push(`<:roles:963208373606682725> **Warn:** ${i + 1}`)
      data.push(`<:servers:963208373707341824> **Motivo:** ${documentWarn.warnings[i]}`)
      data.push(`<:members:963208373644447764> **Staff:** ${await message.client.users.fetch(documentWarn.staff[i]).catch(() => 'Deleted User')}`)
      data.push(`<:clock:963208373363429428> **Data:** <t:${~~(documentWarn.date[i] / 1000)}:F> \n`)
    }

    const warnembed = new EmbedBuilder()
      .setTitle(`${message.guild.name} | Avisos do usuário: ${usuario.user.username}`, this.client.user.avatarURL({ dynamic: true, size: 1024 }))
      .setDescription(data.join('\n'))
      .setThumbnail(usuario.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setColor(colors['default'])
      .setTimestamp();

    message.reply({ embeds: [warnembed] })
  }
}
