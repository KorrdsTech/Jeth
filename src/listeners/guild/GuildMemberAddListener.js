const MemberCount = require('../../structures/utils/MemberCounterManager')
module.exports = {
  name: 'guildMemberAdd',
  exec: async (client, member) => {
    const guild = await client.database.guilds.getOrCreate(member.guild.id)
    if (guild.count) {
      const memberCount = new MemberCount(member.guild.memberCount)
      const channel = member.guild.channels.cache.get(guild.countChannel)
      if (!channel) return
      setTimeout(() => {
        channel.edit({
          topic: memberCount._change(guild.countMessage)
        })
      }, 5000)
    }
  }
}