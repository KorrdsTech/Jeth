const { Command, colors } = require('../../utils')
const Discord = require("discord.js");

module.exports = class pipoca extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = []
        this.category = 'Entretenimento'
    }
    async run(message, args) {
        var gifs = ["https://pa1.narvii.com/6215/98d940012ad4c04307c205b528ab50d72e7c83b5_hq.gif", "https://66.media.tumblr.com/76c5a4474ebf4ea9699a229a426e22c8/tumblr_obnnc6SoOR1t33d6lo1_500.gif", "https://i.pinimg.com/originals/4f/21/72/4f21725fd4cf2dd41d6c713d676dba95.gif", "https://media1.giphy.com/media/a24ifAHp2BokM/source.gif"];
        var falas = [`<:a_blurpletextchannel:856174396095594536> ${message.author} **comprou pipoca para observar o acontecido !**`, `<:franpopcorn:655149530437648424> ${message.author} **foi ao cinema assistir um filme e comprou pipoca**`];
        let embed = new Discord.MessageEmbed()
            .setDescription(falas[Math.floor(Math.random() * falas.length)])
            .setImage(gifs[Math.floor(Math.random() * gifs.length)])
            .setColor(colors.default)
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setTimestamp()
        message.channel.send({ embeds: [embed] });
    }
}