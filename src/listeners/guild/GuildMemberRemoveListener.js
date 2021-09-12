const MemberCount = require('../../structures/utils/MemberCounterManager')
const JoinAndLeave = require('../../structures/utils/JoinAndLeaveManager')

module.exports = {
  name: 'guildMemberRemove',
  exec: async (client, member) => {
    const guild = await client.database.guilds.getOrCreate(member.guild.id)
    joinAndLeave.leave
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