const { Command } = require('../../utils')

module.exports = class DeleteModuleCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'deletemodule'
    this.aliases = ['delete']
    this.category = 'misc'
  }

  async run(message) {
    const guildDocument = await this.client.database.Guilds.findById(message.guild.id)
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