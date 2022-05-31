const { TranslateFunctions } = require('../utils')
const moment = require('moment')
moment.locale('pt-br')

module.exports = async function onGuildMemberAdd(member) {
  // if (!this.client.user.me.permissions.has(andfabhsdfhabsdfjh))return vvtnc asdfjabdnsldbf
  const guildDocument = await this.database.guild.getOrCreate(member.guild.id)
  const contador = guildDocument.counterType
  setTimeout(async () => {
    if (guildDocument) {
      if (guildDocument.counterStatus) {
        const channel = member.guild.channels.cache.get(guildDocument.counterChannel)
        if (!channel) return

        if (contador == '{azul}') { await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.azul(member.guild.memberCount)))
        }
        if (contador == '{aqua}') { await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.aqua(member.guild.memberCount)))
        }
        if (contador == '{violeta}') { await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.violeta(member.guild.memberCount)))
        }
        if (contador == '{rosa}') { await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.rosa(member.guild.memberCount)))
        }
        if (contador == '{ruby}') { await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.ruby(member.guild.memberCount)))
        }
        if (contador == '{exa}') { await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.exa(member.guild.memberCount)))
        }
        if (contador == '{redblack}') { await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.redblack(member.guild.memberCount)))
        }
        if (contador == '{ice}') { await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.ice(member.guild.memberCount)))
        }
        if (contador == '{blk}') { await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.blk(member.guild.memberCount)))
        }
      }
    }
    setTimeout(async () => {
      if (guildDocument.welcomeModule) {
        const channel = member.guild.channels.cache.get(guildDocument.channelWelcome)
        if (!channel) return
        let message = guildDocument.welcomeMessage
        if (!message.length) return 0;
        message = (typeof message === 'string' ? message : JSON.stringify(message))
          .replace(/\{USER\}/g, member)
          .replace(/\{SERVER\}/g, member.guild.name)
          .replace(/\{AVATAR\}/g, member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
          .replace(/\{USER-ID\}/g, member.id)
          .replace(/\{CONTA-CRIADA\}/g, moment(member.user.createdTimestamp).format('LL'))
          .replace(/\{USER-NAME\}/g, member.user.username)
        try {
          const messageEmbed = JSON.parse(message)
          channel.send({
            content: messageEmbed['content'] ? messageEmbed.content : (typeof messageEmbed === 'string') ? messageEmbed : '',
            embeds: [messageEmbed['embed'] ? messageEmbed.embed : (typeof messageEmbed === 'object') ? messageEmbed : {}]
          })
        } catch (err) {
          channel.send(message)
        }

        if (guildDocument.novato.length) {
          member.roles.add(guildDocument.novato, 'Auto-Role | Ativado').catch(() => { })
        }
      } else {
        return;
      }
    });
    return 0;
  })
}
