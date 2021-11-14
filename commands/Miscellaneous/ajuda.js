const { Command, colors } = require('../../utils')
const { MessageEmbed } = require("discord.js");

module.exports = class Ajuda extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['ajudante', 'help', 'comandos']
        this.category = 'Miscellaneous'
        this.subcommandsOnly = false
    }

    async run(message, args) {
        let documento = await this.client.database.Guilds.findById(message.guild.id)
        let prefix = documento.prefix
        
        const embed = new MessageEmbed()
        embed.setAuthor(`${this.client.user.username} | Ajuda`, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        embed.setDescription(`**Criamos uma guia de ajuda para você: ${message.author}**`)
        embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
        embed.setColor(colors.default)
        embed.addField(`${("Contador")} (${this.getCommmandSize("Contador")})`, this.getCategory("Contador", prefix))
        embed.addField(`${("Entretenimento")} (${this.getCommmandSize("Entretenimento")})`, this.getCategory("Entretenimento", prefix))
        embed.addField(`${("Miscellaneous")} (${this.getCommmandSize("Miscellaneous")})`, this.getCategory("Miscellaneous", prefix))
        embed.addField(`${("Moderação")} (${this.getCommmandSize("Moderação")})`, this.getCategory("Moderação", prefix))
        embed.addField(`${("Somente Donos")} (${this.getCommmandSize("Somente Donos")})`, this.getCategory("Somente Donos", prefix))
        embed.addField(`${("Registro")} (${this.getCommmandSize("Registro")})`, this.getCategory("Registro", prefix))
        embed.addField(`${("Social")} (${this.getCommmandSize("Social")})`, this.getCategory("Social", prefix))
        embed.addField(`${("VIP")} (${this.getCommmandSize("VIP")})`, this.getCategory("VIP", prefix))
        
        message.channel.send(`${message.author} Não se esqueça de votar em mim! <:7875_christmaspog:828828587926093924>`, embed)
        .catch(() => {
            message.reply("<a:rb_mod:759648839417200661> Erro, verifique se eu consigo te enviar mensagens no privado!")
        })
    }
    getCategory(category, prefix) {
        return this.client.commands.filter(c => c.category === category).map(c => `\`${prefix}${c.name}\``).join(", ")
    }

    getCommmandSize(category) {
        return this.client.commands.filter(c => c.category === category).size
    }
    
}
