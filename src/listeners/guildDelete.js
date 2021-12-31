module.exports = async function onGuildRemove(guild) {
  await this.database.Guilds.findByIdAndDelete(guild.id)
}