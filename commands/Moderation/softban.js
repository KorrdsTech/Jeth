const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class softban extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['bansoft']
        this.category = 'Moderation'
        this.subcommandsOnly = false
    }

    async run(message, args) {
        var cor = '#c635ff'
        let usuario = bot.users.cache.get(args[0]) || message.mentions.users.cache.first()
        if (!message.guild.member(message.author.id).hasPermissions("BAN_MEMBERS")) return message.reply(":x: **|** Você não tem permissão para executar este comando!")
        if (message.mentions.users.size < 1) return message.reply('Mencione algum membro')
        if (!message.guild.member(usuario).bannable) return message.reply(`:x: **|** Eu não posso punir essa pessoa, talvez o cargo dela seja maior que o meu`)
        var razao = args.slice(1).join(' ')
        if (!razao) razao = "Sem motivo declarado"
        message.guild.member(usuario).ban()
        message.guild.unban(usuario)
        var embed = new Discord.MessageEmbed()
            .setDescription(`${usuario.username} foi **SOFT BANIDO** do servidor por ${message.author}\nMotivo: ${razao} `)
            .setColor(cor)
        message.channel.send(embed)
    }
}