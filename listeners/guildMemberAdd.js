const { TranslateFunctions } = require('../utils')
const moment = require('moment')
moment.locale('pt-br')

module.exports = async function onGuildMemberAdd(member) {
    // if(!this.client.user.me.hasPermission(andfabhsdfhabsdfjh))return vvtnc asdfjabdnsldbf
    let guildDocument = await this.database.Guilds.findById(member.guild.id)
    setTimeout(async () => {
        if (guildDocument) {
            if (guildDocument.count) {
                let channel = member.guild.channels.cache.get(guildDocument.countChannel)
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
                    .replace('{redblue}', TranslateFunctions.redblue(member.guild.memberCount)))
            }
        } 5000;
        setTimeout(async () => {
            if (guildDocument.welcomeModule) {
                let channel = member.guild.channels.cache.get(guildDocument.channelWelcome)
                if (!channel) return
                let message = guildDocument.welcomeMessage;
                if (!message.length) return 0;
                message = message.replace(/\$\{USER\}/g, member);
                message = message.replace(/\$\{SERVER\}/g, member.guild.name);
                message = message.replace(/\$\{AVATAR\}/g, member.user.displayAvatarURL())
                message = message.replace(/\$\{USER-ID\}/g, member.id)
                message = message.replace(/\$\{CONTA-CRIADA\}/g, moment(member.user.createdTimestamp).format("LL"))
                message = message.replace(/\$\{USER-NAME\}/g, member.user.username)
                try {
                    let messageEmbed = JSON.parse(message)
                    channel.send(`${member}`)
                    channel.send(messageEmbed).catch(er => { console.log(er) })
                } catch (err) {
                    channel.send(message).catch(err => { console.log(err) })
                }
        
                if (guildDocument.novato.length) {
                    member.roles.add(guildDocument.novato, 'Auto-Role | Ativado').catch(() => { })
                }
            } else {
                return;
            }
        }, 5000);
        return 0;
    })
}
