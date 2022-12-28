module.exports = async function onGuildCreate(guild) {
  await this.database.guild.getOrCreate(guild.id)
}