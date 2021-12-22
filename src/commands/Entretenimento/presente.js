const { Command, colors } = require('../../utils')
const Discord = require("discord.js");

module.exports = class presente extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['presentear']
        this.category = 'Entretenimento'
    }
    async run(message, args) {
        let user = message.mentions.users.first();
        // if(message.author.includes("`")) return message.channel.send('<:a_blurpleintegration:856174395801468989> Seu username causa problemas em nosso sistema! caracteres indevidos!')
        if (!user) return message.channel.send('`Você precisa mencionar alguém para presentear!`');
        let gifs = ['https://media1.tenor.com/images/f004fa755c977dcb7db5cbc1f31af43c/tenor.gif?itemid=4785658', 'https://pa1.narvii.com/5755/c86a21e370abd85dfd4e0f975bfeeb4f53db30eb_hq.gif']
        let embed = new Discord.MessageEmbed()
            .setColor(colors.default)
            .setDescription(`:gift: ${message.author} **presenteou** ${user}`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)])
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setTimestamp();

        message.channel.send({ embeds: [embed] })
    }
}