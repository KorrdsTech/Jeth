const { Command, colors } = require('../../utils')
const snekfetch = require('snekfetch');
const Discord = require("discord.js");

module.exports = class tapa extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['trigger', 'puto', 'pistola', 'raiva']
        this.category = 'Entertainment'
    }

    async run(message, args) {
        var gifs = ["https://media0.giphy.com/media/ZdrUuSEC0LygaFXtNT/giphy.gif", "https://media1.tenor.com/images/9543655e42222c2ba2eea8da45e328bc/tenor.gif?itemid=5943310", "https://thumbs.gfycat.com/CommonHarmfulBrownbear-small.gif", "https://66.media.tumblr.com/35d648f87c0e80af73973a0663050ade/tumblr_pazkrelXO31x2mpxfo1_400.gifv"];
        var embed = new Discord.MessageEmbed()
            .setTitle(`${message.author} está realmente irritado 😡`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)])
            .setColor(colors.default)
            .setTimestamp(new Date())
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
        message.channel.send(embed);
    }
};
