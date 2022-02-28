module.exports = async function onGuildRemove(guild) {
  await this.database.guild.getOrCreateAndDelete(guild.id)
}