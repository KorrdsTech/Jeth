const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class setcargo extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['setvip', 'darvip', 'setarvip']
        this.category = 'VipCommands'
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
            .setFooter('Jeth | Developers', message.author.displayAvatarURL())

        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(embedA)
        if (!usuario) return message.reply("Você não mencionou o usuário!");
        if (!cargo_nome) return message.reply("Você não colocou um cargo valido!");
        if (usuario.id === message.guild.ownerID) {
            message.reply("Você não tem permissão para setar role neste usuário");
            return 0;
        }
        if (usuario.id === this.client.user.id) {
            message.reply("Não posso me setar vip.");
            return 0;
        }
        let executorRole = message.member.roles.highest;
        let targetRole = usuario.roles.highest;
        if (executorRole.comparePositionTo(targetRole) <= 0 && message.author.id !== message.guild.ownerID) {
            message.reply("Você não tem permissão para setar vip neste usuário");
            return 0;
        }
        let clientRole = message.guild.me.roles.highest;
        if (clientRole.comparePositionTo(targetRole) <= 0) {
            message.reply("Você não tem permissão para setar vip neste usuário");
            return 0;
        }

        let cargo = message.guild.roles.cache.find(role => role.name === `${cargo_nome}`)

        const embed = new MessageEmbed()
            .setTimestamp()
            .setColor("#ffbc00")
            .setDescription(`${usuario.user.username} **RECEBEU UM CARGO VIP DE:** ${message.author.username}`)
            .setThumbnail("https://cdn.discordapp.com/attachments/754917648701325313/762902181253742622/canary.png")
            .setImage('https://cdn.discordapp.com/attachments/737900492876808192/762531977567404092/Seja_vip_booster.png')
            .addField('**Cargo Adicionado:**', `${cargo_nome}`, true)
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))


        if (usuario.roles.cache.has(cargo_nome)) return message.reply("o membro mencionado já possui esse vip.")
        usuario.roles.add(cargo_nome)
        message.channel.send(embed)

    }
}