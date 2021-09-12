module.exports = {
  name: 'guildDelete',
  exec: async (client, guild) => {
    await client.database.guilds.findAndDelete(guild.id)
  }
}