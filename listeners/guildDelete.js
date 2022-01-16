var { RichEmbed } = require('discord.js')

module.exports = async function onGuildRemove(guild) {
    let server = await this.database.Guilds.findByIdAndDelete(guild.id)
}