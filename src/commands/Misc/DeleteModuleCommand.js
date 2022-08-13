const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')

module.exports = class deleteModule extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'deletemodule'
    this.aliases = ['deletemodule', 'delete']
    this.category = 'Misc'
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    const embedA = new EmbedBuilder()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addFields('*Verifique se você possui a permissão:*', '`ADMINISTRATOR`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ embeds: [embedA] })

    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)
    if (guildDocument.delete) {
      guildDocument.delete = false
      guildDocument.save().then(async () => {
        message.reply('Módulo de auto-delete desativado!')
      })
    } else {
      guildDocument.delete = true
      guildDocument.save().then(async () => {
        message.reply('Módulo de auto-delete ativado!')
      })
    }
  }
}