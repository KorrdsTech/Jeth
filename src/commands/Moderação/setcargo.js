const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class setcargo extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['setar-cargo', 'cargoadd']
        this.category = 'Moderação'
    }

    async run(message, args) {
        let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let cargo_nome = message.mentions.roles.first() || message.mentions.roles.array([1])
        const embedA = new MessageEmbed()
            .setTimestamp()
            .setColor(colors.mod)
            .setTitle('**Err:**', `${usuario}`, true)
            .setDescription('Missing Permissions') // inline false
            .addField('*Verifique se você possui a permissão:*', '`MANAGE_ROLES`', true)
            .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send({ embeds: [embedA] })
        if (!usuario) return message.reply("Você não mencionou o usuário!");
        if (!cargo_nome) return message.reply("Você não colocou um cargo valido!");
        if (usuario.id === message.guild.ownerID) {
            message.reply("Você não tem permissão para setar role neste usuário");
            return 0;
        }
        if (usuario.id === this.client.user.id) {
            message.reply("Não posso me setar cargo.");
            return 0;
        }
        let executorRole = message.member.roles.highest;
        let targetRole = usuario.roles.highest;
        if (executorRole.comparePositionTo(targetRole) <= 0 && message.author.id !== message.guild.ownerID) {
            message.reply("Você não tem permissão para setar role neste usuário");
            return 0;
        }

        // const embedC = new Discord.MessageEmbed()
        // .setTimestamp()
        // .setColor(colors.mod)
        // .setTitle('**Err:**', true)
        // .setDescription('Missing Permissions') // inline false
        // .addField('*Verifique se meus cargos estão acima do usuário:*', '`ROLES_COMPARSION`', true)
        // .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))

        // let clientRole = message.guild.me.roles.highest;
        // if (clientRole.comparePositionTo(targetMember) <= 0) {
        //     message.reply(embedC);
        //     return 0;
        // }

        let cargo = message.guild.roles.cache.find(role => role.name === `${cargo_nome}`)

        const embed = new MessageEmbed()
            .setTimestamp()
            .setColor(colors.default)
            .setDescription(`**CARGO ADICIONADO PARA O USUÁRIO:** ${usuario.user.username}`)
            .setThumbnail(usuario.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .addField('**Staffer:**', `${message.author}`, true) // inline true
            .addField('**Cargo Adicionado:**', `${cargo_nome}`, true)
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))


        if (usuario.roles.cache.has(cargo_nome)) return message.reply("o membro mencionado já possui esse cargo.")
        usuario.roles.add(cargo_nome)
        message.channel.send({ embeds: [embed] })

    }
}