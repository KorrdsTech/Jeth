const { TranslateFunctions } = require('../utils');
const moment = require('moment');
moment.locale('pt-br');

module.exports = async function onGuildMemberAdd(member) {
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
    }

    setTimeout(async () => {
      if (guildDocument.welcomeModule) {
        const channel = member.guild.channels.cache.get(guildDocument.channelWelcome);
        if (!channel) return;
        
        let message = guildDocument.welcomeMessage;
        if (!message.length) return 0;
        message = (typeof message === 'string' ? message : JSON.stringify(message))
          .replace(/\{USER\}/g, member)
          .replace(/\{SERVER\}/g, member.guild.name)
          .replace(/\{AVATAR\}/g, member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
          .replace(/\{USER-ID\}/g, member.id)
          .replace(/\{CONTA-CRIADA\}/g, moment(member.user.createdTimestamp).format('LL'))
          .replace(/\{USER-NAME\}/g, member.user.username);

        const sendWelcomeMessage = (msg) => {
          setTimeout(() => {
            msg.delete().catch(() => {});
          }, 15000);
        };

        if (!guildDocument.welcomeTimer) {
          try {
            const messageEmbed = JSON.parse(message);
            channel.send({
              content: messageEmbed['content'] ? messageEmbed.content : (typeof messageEmbed === 'string') ? messageEmbed : '',
              embeds: [messageEmbed['embed'] ? messageEmbed.embed : (typeof messageEmbed === 'object') ? messageEmbed : {}]
            });
          } catch (err) {
            channel.send(message).then(sendWelcomeMessage).catch(() => {});
          }
        } else {
          try {
            const messageEmbed = JSON.parse(message);
            channel.send({
              content: messageEmbed['content'] ? messageEmbed.content : (typeof messageEmbed === 'string') ? messageEmbed : '',
              embeds: [messageEmbed['embed'] ? messageEmbed.embed : (typeof messageEmbed === 'object') ? messageEmbed : {}]
            }).then(sendWelcomeMessage).catch(() => {});
          } catch (err) {
            channel.send(message).then(sendWelcomeMessage).catch(() => {});
          }
        }

        if (guildDocument.novato.length) {
          member.roles.add(guildDocument.novato, 'Auto-Role | Ativado').catch(() => {});
        }
      } else {
        return;
      }
    });
    return 0;
  });
};
