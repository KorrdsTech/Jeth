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
      let userDoc = await this.client.database.Users.find({ 'blacklist': true })
      let msg = [];
      
      for (let i = 0; i < userDoc.length; i++) {
        let user = await this.client.users.fetch(userDoc[i]._id)
        msg.push(user.tag)
      }
      
      await message.channel.send(`<:a_blurplecertifiedmoderator:856174396225355776> Lista de membros na blacklist:\n${msg.join("\n")}`)
    }
  }