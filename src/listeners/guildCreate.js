module.exports = async function onGuildCreate(guild) {
  const server = await this.database.guild.getOrCreate(guild.id)
  server.save()
}