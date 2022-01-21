const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class relatorio extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['rel']
        this.category = 'Somente Donos'
        this.adminOnly = false
    }

    async run(message, args) {
        let rel = args.slice(0).join(" ")
        let role = message.guild.roles.cache.get("831041495326261278")
        if(!message.author.roles === role) message.channel.send('Forbiden Acess!')
        if(!rel) return message.reply('<:a_blurplesettings:856174395801075773> Esqueceu de colocar o conteúdo do seu relatório!')
        const embed = new MessageEmbed()
        .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
        .setAuthor(`${message.author.username} Enviou seu relatório`, message.author.avatarURL({ dynamic: true, size: 1024 }))
        .setColor(colors.mod)
        .setDescription(`${rel}`)
        .setFooter("☕️・https://discordapp.com/guidelines", message.guild.iconURL({ dynamic: true, size: 1024 }))
        .setTimestamp(new Date());
        await this.client.channels.cache.get('831041531930476593').send(embed)
    }
}
