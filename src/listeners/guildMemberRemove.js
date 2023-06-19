const { TranslateFunctions } = require('../utils');

module.exports = async function onGuildMemberRemove(member) {
  const guildDocument = await this.database.guild.getOrCreate(member.guild.id);
  const contador = guildDocument.counterType;

  setTimeout(async () => {
    if (guildDocument) {
      if (guildDocument.counterStatus) {
        const channel = member.guild.channels.cache.get(guildDocument.counterChannel);
        if (!channel) return;

        let counterMessage;
        switch (contador) {
          case '{azul}':
            counterMessage = TranslateFunctions.azul(member.guild.memberCount);
            break;
          case '{aqua}':
            counterMessage = TranslateFunctions.aqua(member.guild.memberCount);
            break;
          case '{violeta}':
            counterMessage = TranslateFunctions.violeta(member.guild.memberCount);
            break;
          case '{rosa}':
            counterMessage = TranslateFunctions.rosa(member.guild.memberCount);
            break;
          case '{ruby}':
            counterMessage = TranslateFunctions.ruby(member.guild.memberCount);
            break;
          case '{exa}':
            counterMessage = TranslateFunctions.exa(member.guild.memberCount);
            break;
          case '{redblack}':
            counterMessage = TranslateFunctions.redblack(member.guild.memberCount);
            break;
          case '{ice}':
            counterMessage = TranslateFunctions.ice(member.guild.memberCount);
            break;
          case '{blk}':
            counterMessage = TranslateFunctions.blk(member.guild.memberCount);
            break;
          default:
            counterMessage = '';
        }

        await channel.setTopic(guildDocument.counterMessage.replace('{contador}', counterMessage));
      }

      if (guildDocument.saidaModule) {
        const channel = member.guild.channels.cache.get(guildDocument.channelsaida);
        if (!channel) return;

        let message = guildDocument.saidaMessage;
        if (!message.length) return 0;

        message = (typeof message === 'string' ? message : JSON.stringify(message))
          .replace(/\{USER\}/g, member)
          .replace(/\{SERVER\}/g, member.guild.name)
          .replace(/\{AVATAR\}/g, member.user.displayAvatarURL())
          .replace(/\{USER-ID\}/g, member.id)
          .replace(/\{USER-NAME\}/g, member.user.username);

        try {
          const messageEmbed = JSON.parse(message);
          channel.send({
            content: messageEmbed['content'] ? messageEmbed.content : (typeof messageEmbed === 'string') ? messageEmbed : '',
            embeds: [messageEmbed['embed'] ? messageEmbed.embed : (typeof messageEmbed === 'object') ? messageEmbed : {}]
          });
        } catch (err) {
          channel.send(message);
        }
      } else {
        return;
      }
    }
  }, 5000);

  return 0;
};
