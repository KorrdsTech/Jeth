const moment = require('moment')
module.exports = class JoinAndLeaveManager {
  constructor(client, guild, data) {
    this.client = client
    this.guild = guild
    this.data = data
  }

  welcome(member) {
    if (!this.data.welcomeModule) return
    const channel = this.guild.channels.cache.get(this.data.channelWelcome)
    if (!channel) return
    let message = this.data.welcomeMessage
      .replace(/\$\{USER}\}/g, member.toString())
      .replace(/\$\{SERVER}\}/g, this.guild.name)
      .replace(/\$\{AVATAR}\}/g, member.user.displayAvatarURL({ dynamic: true }))
      .replace(/\$\{USER-ID}\}/g, member.id)
      .replace(/\$\{CONTA-CRIADA}\}/g, moment(member.user.createdTimestamp).format('LL'))
      .replace(/\$\{USER-NAME}\}/g, member.user.username)

    try {
      message = JSON.parse(message)
      channel.send(message)
    } catch {
      channel.send(message)
    }
  }

  leave(member) {
    if (!this.data.saidaModule) return
    const channel = this.guild.channels.cache.get(this.data.channelsaida)
    if (!channel) return
    let message = this.data.saidaMessage
      .replace(/\$\{USER}\}/g, member.toString())
      .replace(/\$\{SERVER}\}/g, this.guild.name)
      .replace(/\$\{AVATAR}\}/g, member.user.displayAvatarURL({ dynamic: true }))
      .replace(/\$\{USER-ID}\}/g, member.id)
      .replace(/\$\{CONTA-CRIADA}\}/g, moment(member.user.createdTimestamp).format('LL'))
      .replace(/\$\{USER-NAME}\}/g, member.user.username)

    setTimeout(() => {
      try {
        message = JSON.parse(message)
        channel.send(message)
      } catch {
        channel.send(message)
      }
    }, 5000)
  }
}