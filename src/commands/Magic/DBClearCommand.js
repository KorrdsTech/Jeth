const { Command } = require('../../utils')

module.exports = class dbclear extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'dbclear'
    this.aliases = ['dbclear', 'limpardb', 'dblimpar']
    this.category = 'Magic'
    this.adminOnly = true
  }

  async run(message) {
    this.client.guilds.cache.forEach(g => {
      this.client.database.guild.getAndDelete(g.id).then(() => {
        message.channel.send(`${g.name} deletada....`)
      })
    })

    this.client.users.cache.forEach(u => {
      this.client.database.user.getAndDelete(u.id).then(() => {
        message.channel.send(`${u.tag} deletado...`)
      })
    })
  }
}