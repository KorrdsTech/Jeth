const { Command } = require('../../utils')

module.exports = class deleteModule extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'deletemodule'
    this.aliases = ['deletemodule', 'delete']
    this.category = 'Misc'
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
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