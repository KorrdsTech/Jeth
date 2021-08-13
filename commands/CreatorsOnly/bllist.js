const { Command, colors } = require('../../utils')
const Discord = require('discord.js')
const { Users } = require('../../database')

module.exports = class blList extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['blacklist-list']
        this.category = 'CreatorsOnly'
        this.adminOnly = true
    }

    async run(message, args) {
      let usuarioB = this.client.users.cache
      let msg = [];
      usuarioB.forEach(async (users) => {
        let guildDocument = await this.client.database.Users.findById(users.id)
        if (guildDocument.blacklist) msg.push(users) 
      })
      message.channel.send(`${msg.map((user => `<:a_blurplecertifiedmoderator:856174396225355776> Lista de membros na blacklist:\n${user.tag}`)).join('\n')}`, { split: true });
    }
  }