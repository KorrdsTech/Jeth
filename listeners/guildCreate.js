var { RichEmbed } = require('discord.js')

module.exports = async function onGuildCreate(guild) {
    let server = await this.database.Guilds.findById(guild.id)
    server = new this.database.Guilds({
      _id: guild.id,
    })
    server.save()
}