const { Command, colors } = require('../../utils')
const Discord = require("discord.js");

module.exports = class highfive extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['tocaaqui', 'h5']
        this.category = 'Entertainment'
    }
    async run(message, args) {
        var user = message.mentions.users.first();
        if(!user) message.channel.send('Ninguém foi mencionado!')
        var gifs = ["https://lh6.googleusercontent.com/hIRp_xCGjt6x5H5GSu9odKA9WPagzrMYPtT-Ow-Nte0AeHoMY4MUTlnxrZkJK248JAqNiBVi_9iaU3eYS2bWXtcdJFjsnrAV8i2H_iN5pjWWHDN6djKm2E-h3MQMUvM2DkoO3M7e.gif", "https://c.tenor.com/JBBZ9mQntx8AAAAC/anime-high-five.gif", "https://thumbs.gfycat.com/BreakableMessyHarrierhawk-size_restricted.gif"];
        var falas = [`**Deu um HIGH-FIVE com** ${user}`];
        let embed = new Discord.MessageEmbed()
            .setDescription(falas[Math.floor(Math.random() * falas.length)])
            .setImage(gifs[Math.floor(Math.random() * gifs.length)])
            .setColor(colors.default)
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setTimestamp()
        message.reply(embed);
    }
}