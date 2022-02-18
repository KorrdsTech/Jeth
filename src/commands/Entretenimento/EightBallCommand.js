const { Command, colors } = require('../../utils')
const Discord = require("discord.js");

module.exports = class Eightball extends Command {
    constructor(name, client) {
        super(name, client)

        this.name = 'eightball'
        this.aliases = ['8ball', 'eightball', 'cristal']
        this.category = 'Entretenimento'
    }
    async run(message, args) {

        if (!args[2]) return message.reply("`Por favor, faça a pergunta completa`")
        let replies = ["Sim.", "Não.", "Eu não sei.", "talvez.", "Depende."]

        let result = Math.floor(Math.random() * replies.length);
        let question = args.join(" ");

        let ballembed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag)
            .setColor(colors.default)
            .addField('Questão', question)
            .addField("Resposta", replies[result])
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setTimestamp()

        message.channel.send(ballembed);
    }
}