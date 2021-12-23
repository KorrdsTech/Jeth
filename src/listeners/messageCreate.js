const { MessageEmbed } = require('discord.js')
const { colors } = require('../utils')
const { Permissions, Discord } = require('discord.js');

module.exports = async function onMessage(message, client, messageDelete, msg) {
    let guildDocument = await this.database.Guilds.findById(message.guild.id)

    if (message.author.bot) {
        if (message.author.discriminator !== '0000') return
        if (message.author.username !== 'Haku') return
        if (message.channel.id !== '879568042433085490') return
        const member = message.mentions.users.first()
        let Users = await this.database.Users.findById(member?.id)
        if (!Users) return
        let vipRole = message.guild.roles.cache.find((role) => role.id === '839754099573522452');
        if (!message.guild.members.cache.get(member.id)?.roles?.cache?.has(vipRole.id)) {
            Users.rep += 1
            Users.save()
            return
        } else if (message.guild.members.cache.get(member.id)?.roles?.cache?.has(vipRole.id)) {
            Users.rep += 2
            Users.save()
            return
        }
    }

    if (message.channel.type === 'DM') return
    if (!guildDocument) {
        new this.database.Guilds({ _id: message.guild.id }).save()
    }
    // const hearty = '671437180669001763'
    // if (message.channel.id === '718178715657568364') {

    //     message.react(hearty);
    // }

    const thumbsup = '👍';
    const thumbsdown = '👎';
    if (message.channel.id === '718178715657568359') {

        message.react(thumbsup);
        await message.react(thumbsdown);
    }

    // message Delete Module
    // this.client.on('messageDelete', message => {
    // let delEmbed = new MessageEmbed()
    // .setThumbnail('https://cdn.discordapp.com/emojis/903453782388670524.png?size=96')
    // .setColor(colors.mod)
    // .setDescription(`**Conteúdo da Mensagem:** ${message.cleanContent}\n**Horário:** ${new Date()}\n**Canal da Mensagem:** ${message.channel.name}`)
    // .setTimestamp();

    // message.guild.channels.cache.get('831041533469655070').send(delEmbed)
    // })    // end of it finnaly :3


    if (guildDocument?.sugesModule) {
        const suggestionChannel = message.guild.channels.cache.get(guildDocument?.sugesChannel)
        if (!suggestionChannel) return
        if (message.channel.id === suggestionChannel.id) {
            const sim = '673592197202837524';
            const duvida = '❓';
            const nao = '673592197341249559';

            message.react(sim);
            await message.react(duvida);
            await message.react(nao);
        }
    }

    let Users = await this.database.Users.findById(message.author.id)
    const guildPrefix = (guildDocument && guildDocument.prefix)
    const botMention = message.guild ? message.guild.me.toString() : this.user.toString()
    const prefix = message.content.startsWith(botMention) ? `${botMention} ` : (message.content.startsWith(guildPrefix) ? guildPrefix : null)
    if (Users) {
        if (guildDocument) {
            if (prefix) {
                if (Users.blacklist) {
                    message.reply('> Você está na blacklist,e não pode executar nenhum comando do bot.').then(msg => msg.delete({ timeout: 5000 }))
                    return
                }
                const args = message.content.slice(prefix.length).trim().split(' ')
                const name = args.shift()
                const command = this.commands.find(command => command.name === name || command.aliases.includes(name))
                Object.defineProperties(message, {
                    'prefix': { value: prefix },
                    'command': { value: command }
                })

                if (command) {
                    if (guildDocument.delete) {
                        guildDocument.delete = true
                        message.delete({ timeout: 100 }).catch(() => { })
                        command.process(message, args)
                    } else {
                        guildDocument.delete = false
                        command.process(message, args)
                    }
                }
            }
            if (guildDocument.antInvite && !message.member.permissions.has('ADMINISTRATOR', false, true, true)) {
                if (message.channel.id === '842588427170086974') {
                    return;
                } else {
                    if (message.content.includes('https://discord.gg/') || message.content.includes('discord.gg/')) {
                        message.delete({ timeout: 100 })
                        await message.reply('<:a_blurplecertifiedmoderator:856174396225355776> Você não pode divulgar outros servidores aqui! Caso se repita você será banido!')
                        let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
                        if (!muteRole) muteRole = await message.guild.roles.create({
                            data: {
                                name: 'Muted',
                                color: '#080808',
                                permissions: [Permissions.READ_MESSAGES]
                            },
                            reason: 'Encontrou problemas na configuração do cargo? Reporte o bug imediatamente!',
                        }).catch(console.error)

                        await message.member.roles.add(muteRole).catch(() => { })
                        await message.guild.channels.cache.forEach(channel => {
                            channel.updateOverwrite(muteRole, {
                                SEND_MESSAGES: false
                            })
                        });

                        let canal = message.guild.channels.cache.get(guildDocument.infoantinv)
                        if (!canal) return;
                        await message.channel.send(`Anti-invite ativado,membro: ${message.author} foi mutado automaticamente!`)
                        let embedmute = new MessageEmbed()
                            .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                            .setColor('BLACK')
                            .setDescription(`O usuário: ${message.member},enviou convite no ${message.channel} e foi mutado automaticamente com a role: ${muteRole}`)
                        await message.member.roles.add(muteRole).catch(() => { })
                        await canal.send(embedmute).catch(() => { })

                    }
                }
            }
            let mention = message.content.split(/ +/g)[0];
            if (mention === `<@!753778869013577739>` || mention === `<@!753778869013577739`) {
                if (message.guild.id !== '804575416098488380') {
                    return;
                } else {
                    let embed = new MessageEmbed()
                        .setThumbnail(this.users.cache.get('753778869013577739').displayAvatarURL({ dynamic: true, size: 1024 }))
                        .setTitle(`<:a_blurpleemployee:856174396423274516> ${message.author.username}` + '#' + `${message.author.discriminator}`)
                        .setDescription(`**Você mencionou o <@753778869013577739> espere por uma resposta e não mencione novamente !**\n **esperamos que seja por um motivo útil desta vez.**`)
                        .setColor('BLACK')
                        .setFooter('Encontrou algum bug? por favor utilize /bug \'explique o bug aqui com print se possível\' 🤖')
                        .setTimestamp(new Date());

                    message.channel.send({ embeds: [embed] }).then(msg => { msg.delete({ timeout: 80000 }) })
                }
            };

            if (message.content.indexOf(prefix) !== 0) {
                if (message.mentions.members.size > 0) {
                    let mention = message.content.split(/ +/g)[0];
                    if (mention === `<@${this.user.id}>` || mention === `<@!${this.user.id}>`) {
                        message.delete({ timeout: 5000 })
                        message.channel.send(`<a:dshype:683501891493167163> **Olá !** ${message.author} Prazer em ter você utilizando de nossos comandos, tem algo em que eu possa ajudar ? Caso queira saber os meus comandos, por favor use ${guildDocument.prefix}ajuda que lhe enviarei tudo sobre meus comandos ! <a:dshype:683501891493167163>`).then(m => {
                            m.delete({ timeout: 5000 }).catch(() => { });
                        }).catch(console.error);
                    }
                }
            }
        } else {
            const newGuildDB = new this.database.Guilds({ _id: message.guild.id })
            newGuildDB.save()
            console.log(`${message.guild.name}[${message.guild.id}] adicionado ao banco de dados`)
            this.channels.cache.get('831041533469655070')?.send(`**\`\`${message.guild.name}[${message.guild.id}] adicionado ao banco de dados\`\`**`)
        }
    } else {
        const newGuildDB = new this.database.Users({ _id: message.author.id })
        newGuildDB.save()
        console.log(`${message.author.tag}[${message.author.id}] adicionado ao banco de dados`)
        this.channels.cache.get('831041533469655070')?.send(`**\`\`${message.author.tag}[${message.author.id}] adicionado ao banco de dados\`\`**`)
    }
}