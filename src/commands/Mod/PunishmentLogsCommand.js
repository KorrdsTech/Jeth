const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')

module.exports = class punishmentlogs extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'punishmentlogs'
    this.aliases = ['punishmentlogs']
    this.category = 'Mod'
  }

  async run(message, args) {
    const emptyMessage = new EmbedBuilder()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **PunishmentLogs:**', `${message.author.username}`, true)
      .setDescription('Criado para facilitar o envio de logs dentro de seu servidor, desta forma facilitando o gerenciamento de auditoria de seu servidor.') // inline false
      .addField('*Uso do comando:*', '`punishmentlogs set <#canal>`', true)
      .addField('*Uso do comando:*', '`punishmentlogs remove <#canal>`', true)
      .addField('*Exemplo:*', '`punishmentlogs set #geral`', true)

    const embedA = new EmbedBuilder()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`ADMINISTRATOR`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ embeds: [embedA] })

    if (!args[0]) return message.reply({ embeds: [emptyMessage] })

    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)
    if (args[0] === 'set') {
      const channel = message.guild.channels.cache.find(c => c.name === args.slice(1).join(' ')) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
      if (!channel || channel.type === 'category') return message.reply('Coloque um canal válido!')
      guildDocument.punishChannel = channel.id
      guildDocument.save()
      message.reply('Canal definido com sucesso!')
    } else if (args[0] === 'remove') {
      guildDocument.punishChannel = ''
      guildDocument.save()
      message.reply('Canal removido com sucesso!')
      return (0);
    }
  }
}