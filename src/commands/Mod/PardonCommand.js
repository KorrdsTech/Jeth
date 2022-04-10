const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class Pardon extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'Pardon'
    this.aliases = ['perdoar', 'forgive', 'removewarn', 'pardon']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const emptyMessage = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Pardon:**', `${message.author.username}`, true)
      .setDescription('Com este comando você poderá remover todos os avisos salvos de um usuário em específico.') // inline false
      .addField('*Uso do comando:*', '`pardon <@user>`', true)
      .addField('*Exemplo:*', '`pardon @Solaris#0006`', true)

    const defina = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Configuração Incompleta (PARDON):**', `${message.author.username}`, true)
      .setDescription('Configure da forma ensinada abaixo.') // inline false
      .addField('*Uso do comando:*', '`PunishmentLogs set <canal>`', true)
      .addField('*Exemplo:*', '`PunishmentLogs set #geral`', true)

    const channel = await this.client.database.guild.getOrCreate(message.guild.id)
    const log = this.client.channels.cache.get(channel.punishChannel)
    if (!log) message.reply({ embeds: [defina] })
    if (!args[0]) return message.reply({ embeds: [emptyMessage] })

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    const documento = await this.client.database.user.getOrCreate(member.id)

    const pardon = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setThumbnail(member.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTitle('Ação | Perdoar')
      .setDescription(`O usuário ${member} teve seus avisos removidos`) // inline false
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    documento.warnreason = ' '
    await documento.save()
    log.send({ embeds: [pardon] })
  }
}