const { Command } = require('../../utils')

module.exports = class UserClearCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'userclear'
    this.aliases = ['limparuser', 'userlimpar']
    this.category = 'magic'
    this.adminOnly = true
  }

  async run(message) {
    this.client.users.forEach(u => {
      this.client.database.Users.findOneAndDelete(u.id).then(async () => {
        message.channel.send(`${u.tag} deletado...`)
      })
    })
  }
}