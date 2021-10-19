const { Command, colors } = require('../../utils')
const Discord = require('discord.js')
const parse = require("parse-duration")
const client = new Discord.Client({ ws: { intents: 13935 } })

module.exports = class mute extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['mutech', 'mute']
        this.category = 'Moderation'
        this.subcommandsOnly = false
    }

    async run(message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        const embedA = new Discord.MessageEmbed()

            .setTimestamp()
            .setColor(colors.mod)
            .setTitle('**Err:**', `${member}`, true)
            .setDescription('Missing Permissions') // inline false
            .addField('*Verifique se você possui a permissão:*', '`KICK_MEMBERS`', true)
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send(embedA)
        if (!member) return message.reply(`Mencione o usuario a ser punido por favor.`)
        let time = args[1];
        if (!time) return message.reply(`Informe o tempo de mute **2m,7d**`)
        let reason = args.slice(2).join(' ')
        if (!reason) {
            reason = `Motivo: Não especificado.`
        }
        let role = message.guild.roles.cache.find(r => r.name === "Muted Jeth");

        if (!role) {
            role = await message.guild.roles.create({
                data: {
                    name: "Muted Jeth",
                    color: "#ff0000"
                }, reason: 'we needed a role for Super Cool People'
            })
            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SPEAK: false,
                    CONNECT: false
                });
            });
        }

        if (message.member.roles.highest.position < message.guild.member(member).roles.highest.position) return message.reply(`Você não pode mutar esse usuario.`)

        // const embedC = new Discord.MessageEmbed()
        // .setTimestamp()
        // .setColor(colors.mod)
        // .setTitle('**Err:**', true)
        // .setDescription('Missing Permissions') // inline false
        // .addField('*Verifique se meus cargos estão acima do usuário:*', '`ROLES_COMPARSION`', true)
        // .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))

        // let targetMember = member.roles.highest;
        // let clientRole = message.guild.me.roles.highest;
        // if (clientRole.comparePositionTo(targetMember) <= 0) {
        //     message.reply(embedC);
        //     return 0;
        // }

        const embed = new Discord.MessageEmbed()

            .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
            .setTitle('Ação | Mute')
            .setColor("#ff112b")
            .setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Mutado:** ${member.user.username} \n**ID:** ${member.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}` + `\n<:KaelMutado:673592196972412949> **Tempo:** ${time}`)
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setTimestamp(new Date());

        let isMutado = await this.client.database.Mutados.findById(member.user.id);

        if (!isMutado) {
            const Mutado = new this.client.database.Mutados({
                _id: member.id,
                server: message.guild.id,
                time: parse(time),
                channel: message.channel.id
            })

            Mutado.save()
                .then(() => message.channel.send(embed))
            member.roles.add(role.id)
        } else {
            message.channel.send(embed)
            member.roles.add(role.id)
        }
    }
}