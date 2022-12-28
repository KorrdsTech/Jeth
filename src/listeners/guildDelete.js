module.exports = async function onGuildRemove(guild) {
  await this.database.guild.getAndDelete(guild.id)
}