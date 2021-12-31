const { TranslateFunctions } = require('../utils')

module.exports = async function onGuildMemberRemove(member) {
  const guildDocument = await this.database.Guilds.findById(member.guild.id)
  setTimeout(async () => {
    if (guildDocument) {
      if (guildDocument.count) {
        const channel = member.guild.channels.cache.get(guildDocument.countChannel)
        if (!channel) return
        await channel.setTopic(guildDocument.countMessage.replace('{azul}', TranslateFunctions.azul(member.guild.memberCount))
          .replace('{pinky}', TranslateFunctions.pinky(member.guild.memberCount))
          .replace('{gold}', TranslateFunctions.gold(member.guild.memberCount))
          .replace('{green}', TranslateFunctions.green(member.guild.memberCount))
          .replace('{rosa}', TranslateFunctions.rosa(member.guild.memberCount))
          .replace('{red}', TranslateFunctions.red(member.guild.memberCount))
          .replace('{ruby}', TranslateFunctions.ruby(member.guild.memberCount))
          .replace('{amarelo}', TranslateFunctions.amarelo(member.guild.memberCount))
          .replace('{violeta}', TranslateFunctions.violeta(member.guild.memberCount))
          .replace('{bouncepink}', TranslateFunctions.bouncepink(member.guild.memberCount))
          .replace('{redblack}', TranslateFunctions.redblack(member.guild.memberCount))
          .replace('{aqua}', TranslateFunctions.aqua(member.guild.memberCount))
          .replace('{ice}', TranslateFunctions.ice(member.guild.memberCount))
          .replace('{roxo}', TranslateFunctions.roxo(member.guild.memberCount))
          .replace('{rainbow}', TranslateFunctions.rainbow(member.guild.memberCount))
          .replace('{blk}', TranslateFunctions.blk(member.guild.memberCount))
          .replace('{natal}', TranslateFunctions.natal(member.guild.memberCount))
          .replace('{bouncepurple}', TranslateFunctions.bouncepurple(member.guild.memberCount))
          .replace('{redblue}', TranslateFunctions.redblue(member.guild.memberCount)))
      }
      if (guildDocument.saidaModule) {
        const channel = member.guild.channels.cache.get(guildDocument.channelsaida)
        if (!channel) return
        let message = guildDocument.saidaMessage;
        if (!message.length) return 0;
        message = message.replace(/\$\{USER\}/g, member);
        message = message.replace(/\$\{SERVER\}/g, member.guild.name);
        message = message.replace(/\$\{AVATAR\}/g, member.user.displayAvatarURL)
        message = message.replace(/\$\{USER-ID\}/g, member.id)
        message = message.replace(/\$\{USER-NAME\}/g, member.user.username)
        try {
          const messageEmbed = JSON.parse(message)
          channel.send(`${member}`)
          channel.send(messageEmbed).catch(er => {console.log(er)})
        } catch (err) {
          channel.send(message).catch(err => {console.log(err)})
        }
        const registradores = guildDocument.registradores;
        for (let i = 0; i < registradores.length; ++i) {
          const membros = registradores[i].membrosRegistrados;
          for (let u = 0; u < membros.length; ++u) {
            if (membros[u]._id === member.id) {
              membros.splice(u, 1);
              guildDocument.save().catch(console.error);
              return;
            }
          }
        }
      } else {
        return;
      }
    }

  }, 5000);
  return 0;
}