const { colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const usersMap = new Map()
const LIMIT = 2
const DIFF = 10 * 1000
const parse = require('parse-duration')
module.exports = class AntiSpamUtils {
  static async verify(client, message) {
    if (usersMap.has(message.author.id)) {
      const userData = usersMap.get(message.author.id)
      const { lastMessage, timer } = userData
      const difference = message.createdTimestamp - lastMessage.createdTimestamp
      let msgCount = userData.msgCount
      if (lastMessage.content !== message.content) return
      if (difference > DIFF) {
        clearTimeout(timer)
        userData.msgCount = 1
        userData.lastMessage = message
        userData.timer = setTimeout(() => {
          if (usersMap.size === 0) return
          usersMap.delete(message.author.id)
        }, 10 * 1000)
        usersMap.set(message.author.id, userData)
      } else {
        ++msgCount
        if (parseInt(msgCount) > LIMIT) {
          const msgList = []
          message.channel.messages.cache.filter(msg => msg.author.id === message.author.id).forEach((msg) => {
            if (msg.createdTimestamp - lastMessage.createdTimestamp < 9 * 1000) {
              msgList.push(msg.id)
              // eslint-disable-next-line no-unused-vars
              msg.delete().catch((err) => { })
            }
          })
          const embed = new MessageEmbed()

            .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
            .setTitle('AutoMod')
            .setColor(colors['mod'])
            .setDescription(`\n**Usuário:** ${message.author} \n**ID:** ${message.author.id}` + `\no usuário citado recebeu timeout do AutoMod por spam.`)
            .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
            .setTimestamp(new Date());
          if (this.checkPossibly(message)) {
            const guildDocument = await client.database.guild.getOrCreate(message.guild.id)
            message.member.timeout(parse(guildDocument.timerSpam), `${guildDocument.infoantspam}`).then(() => {
              message.channel.send({ embeds: [embed] })
            })
          } else {
            message.channel.send(`Calma lá ${message.author}, acho melhor você parar! Eu acabei de apagar ${msgList.length} mensagens sua que você spammou.`)
          }
        } else {
          userData.msgCount = msgCount
          usersMap.set(message.author.id, userData)
        }
      }
    } else {
      const fn = setTimeout(() => {
        if (usersMap.size === 0) return
        usersMap.delete(message.author.id)
      }, 10 * 1000)
      usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn
      })
    }
  }

  static checkPossibly(message) {
    const botrole = (message.guild.me.roles.highest.rawPosition < message.member.roles.highest.rawPosition) || (!message.member.permissions.has('ADMINISTRATOR') && message.guild.ownerId !== message.author.id)
    if (botrole) {
      return true
    } else {
      return false
    }
  }
}
