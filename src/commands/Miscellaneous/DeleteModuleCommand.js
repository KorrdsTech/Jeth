const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class deleteModule extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'deletemodule'
    this.aliases = ['deletemodule', 'delete']
    this.category = 'Miscellaneous'
  }

  async run(message) {
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)
    if (!guildDocument) {
      new this.client.database.Users({
        _id: message.guild.id
      }).save()
    }
    if (guildDocument.delete) {
      guildDocument.delete = false
      guildDocument.save().then(async () => {
        message.channel.send('Módulo de auto-delete desativado!')
      })
    } else {
      guildDocument.delete = true
      guildDocument.save().then(async () => {
        message.channel.send('Módulo de auto-delete ativado!')
      })
    }
  }
}