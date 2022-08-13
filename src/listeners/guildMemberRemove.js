const { TranslateFunctions } = require('../utils')

module.exports = async function onGuildMemberRemove(member) {
  const guildDocument = await this.database.guild.getOrCreate(member.guild.id)
  const contador = guildDocument.counterType

  setTimeout(async () => {
    if (guildDocument) {
      if (guildDocument.counterStatus) {
        const channel = member.guild.channels.cache.get(guildDocument.counterChannel)
        if (!channel) return

        if (contador == '{azul}') {
          await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.azul(member.guild.memberCount)))
        }
        if (contador == '{aqua}') {
          await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.aqua(member.guild.memberCount)))
        }
        if (contador == '{violeta}') {
          await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.violeta(member.guild.memberCount)))
        }
        if (contador == '{rosa}') {
          await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.rosa(member.guild.memberCount)))
        }
        if (contador == '{ruby}') {
          await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.ruby(member.guild.memberCount)))
        }
        if (contador == '{exa}') {
          await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.exa(member.guild.memberCount)))
        }
        if (contador == '{redblack}') {
          await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.redblack(member.guild.memberCount)))
        }
        if (contador == '{ice}') {
          await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.ice(member.guild.memberCount)))
        }
        if (contador == '{blk}') {
          await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.blk(member.guild.memberCount)))
        }

      }
      if (guildDocument.saidaModule) {
        const channel = member.guild.channels.cache.get(guildDocument.channelsaida)
        if (!channel) return
        let message = guildDocument.saidaMessage;
        if (!message.length) return 0;
        message = (typeof message === 'string' ? message : JSON.stringify(message))
          .replace(/\{USER\}/g, member)
          .replace(/\{SERVER\}/g, member.guild.name)
          .replace(/\{AVATAR\}/g, member.user.displayAvatarURL)
          .replace(/\{USER-ID\}/g, member.id)
          .replace(/\{USER-NAME\}/g, member.user.username)
        try {
          const EmbedBuilder = JSON.parse(message)
          channel.send({
            content: EmbedBuilder['content'] ? EmbedBuilder.content : (typeof EmbedBuilder === 'string') ? EmbedBuilder : '',
            embeds: [EmbedBuilder['embed'] ? EmbedBuilder.embed : (typeof EmbedBuilder === 'object') ? EmbedBuilder : {}]
          })
        } catch (err) {
          channel.send(message)
        }
      } else {
        return;
      }
    }

  }, 5000);
  return 0;
}
