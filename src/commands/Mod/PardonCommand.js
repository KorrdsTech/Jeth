const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')
const modelWarn = require('../../utils/database/collections/Warn');
const moment = require('moment')
moment.locale('pt-br')

module.exports = class Pardon extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'Pardon'
    this.aliases = ['perdoar', 'forgive', 'removewarn', 'pardon', 'unwarn']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const defina = new EmbedBuilder()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Configuração Incompleta (BAN):**', `${message.author.username}`, true)
      .setDescription('Configure da forma ensinada abaixo.') // inline false
      .addFields('*Uso do comando:*', '`PunishmentLogs set <canal>`', true)
      .addFields('*Exemplo:*', '`PunishmentLogs set #geral`', true)

    const emptyMessage = new EmbedBuilder()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Pardon:**', `${message.author.username}`, true)
      .setDescription('Com este comando você poderá remover todos os avisos salvos de um usuário em específico.') // inline false
      .addFields('*Uso do comando:*', '`pardon <@user>`', true)
      .addFields('*Exemplo:*', '`pardon @Solaris#0006`', true)

    const embedA = new EmbedBuilder()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addFields('*Verifique se você possui a permissão:*', '`MODERATE_MEMBERS`', true)
      .setFooter({ text: 'Moderando Discord', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('MODERATE_MEMBERS')) return message.reply({ embeds: [embedA] })

    const channel = await this.client.database.guild.getOrCreate(message.guild.id)
    const log = this.client.channels.cache.get(channel.punishChannel)
    if (!log) message.reply({ embeds: [defina] })
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
      return message.reply(`<:reinterjection:955577574304657508> » Esse usuário não possui avisos.`)
    }

    documentWarn.warnings.splice(-1)  //Fixed bug
    documentWarn.staff.splice(-1)  //Fixed bug
    documentWarn.date.splice(-1) //Fixed bug

    await documentWarn.save().catch(err => console.log(err))

    const unwarnembed = new EmbedBuilder()
      .setTitle(`Ação | Perdoar`, this.client.user.avatarURL({ dynamic: true, size: 1024 }))
      .addFields(`<:members:963208373644447764> **Usuário:**`, `${usuario}`)
      .addFields(`<:roles:963208373606682725> **Descrição:**`, `O usuário teve seu aviso mais recente perdoado e removido do histórico pelo moderador: ${message.author}`)
      .setThumbnail(usuario.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `Staff: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setColor(colors['mod'])
      .setTimestamp();

    log.send({ embeds: [unwarnembed] })
  }
}