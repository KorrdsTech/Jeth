const { Command } = require('../../utils')

module.exports = class userclear extends Command {

  constructor(name, client) {
    super(name, client)

    this.name = 'userclear'
    this.aliases = ['userclear', 'limparuser', 'userlimpar']
    this.category = 'Magic'
    this.adminOnly = true
  }

  async run(message) {
    this.client.users.forEach(u => {
      this.client.database.user.getAndDelete(u.id).then(async () => {
        message.reply(`${u.tag} deletado...`)
      })
    })
  }
}