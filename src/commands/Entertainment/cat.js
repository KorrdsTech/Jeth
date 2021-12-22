const { Command, colors } = require('../../utils')
const Discord = require("discord.js");

module.exports = class cat extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = []
        this.category = 'Entertainment'
    }
    async run(message, args) {
        var gifs = ["https://media0.giphy.com/media/nBIMaUaKCV6ve/source.gif", "https://66.media.tumblr.com/82f66e4286dda4a5761ab7cef79de1f6/tumblr_nlj44jCswJ1s9j8oho1_500.gif", "https://i.pinimg.com/originals/51/c9/89/51c989f2500e1cba97bc46dd41cb4df8.gif", "https://media1.giphy.com/media/3aWQs44QcNqIU/source.gif"];

        let embed = new Discord.MessageEmbed()
            .setTitle('Seu gatinho :3')
            .setImage(gifs[Math.floor(Math.random() * gifs.length)])
            .setColor(colors.default)
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setTimestamp()
        message.channel.send({ embeds: [embed] });
    }
}