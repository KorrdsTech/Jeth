const { Command } = require('../../utils')

module.exports = class BLListCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'bllist'
    this.aliases = ['blacklist-list']
    this.category = 'magic'
    this.adminOnly = true
  }

  async run(message, args) {
    const userDoc = await this.client.database.Users.find({ 'blacklist': true })
    const msg = [];

    for (let i = 0; i < userDoc.length; i++) {
      const user = await this.client.users.fetch(userDoc[i]._id)
      msg.push(`${user.tag} - ${user.id}`)
    }

    await message.channel.send(`<:a_blurplecertifiedmoderator:856174396225355776> Lista de membros na blacklist:\n${msg.join('\n')}`)
  }
}