const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class PunishmentLogs extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'ban'
    this.aliases = ['punishmentlogs']
    this.category = 'Mod'
  }

  async run(message, args) {
    const emptyMessage = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **PunishmentLogs:**', `${message.author.username}`, true)
      .setDescription('Criado para facilitar o envio de logs dentro de seu servidor, desta forma facilitando o gerenciamento de auditoria de seu servidor.') // inline false
      .addField('*Uso do comando:*', '`punishmentlogs set <#canal>`', true)
      .addField('*Uso do comando:*', '`punishmentlogs remove <#canal>`', true)
      .addField('*Exemplo:*', '`punishmentlogs set #geral`', true)

    if (!args[0]) return message.reply({ embeds: [emptyMessage] })

    const guildDocument = await this.client.database.Guilds.findById(message.guild)
    if (args[0] === 'set') {
      guildDocument.punishChannel = args[1]
      guildDocument.save()
      message.reply('Canal definido com sucesso!')
      return (0);
    }
    else if (args[0] === 'remove') {
      guildDocument.punishChannel = ''
      guildDocument.save()
      message.reply('Canal removido com sucesso!')
      return (0);
    }
  }
}