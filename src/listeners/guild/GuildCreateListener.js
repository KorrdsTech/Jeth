module.exports = {
  name: 'guildCreate',
  exec: async (client, guild) => {
    await client.database.guilds.getOrCreate(guild.id)
  }
}