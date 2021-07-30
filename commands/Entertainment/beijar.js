const { Command, colors } = require('../../utils')
const Discord = require("discord.js");

module.exports = class beijar extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['kiss', 'beijo']
        this.category = 'Entertainment'
    }
    async run(message, args) {
        let user = message.mentions.users.first();
        if (!user) return message.channel.send('`Você precisa mencionar alguém para beijar!`');
        let gifs = ['https://media1.giphy.com/media/FqBTvSNjNzeZG/source.gif', 'https://thumbs.gfycat.com/FondEvergreenIcterinewarbler-size_restricted.gif', 'https://media1.tenor.com/images/3c167989c5623e40ef517ded7e3c44e2/tenor.gif?itemid=9227861']
        let embed = new Discord.MessageEmbed()
            .setColor(colors.default)
            .setTitle('Será que temos um novo casal no servidor ?')
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/emojis/742240824569626674.png')
            .setDescription(`:heart_eyes: **${message.author.username}** acabou de beijar o(a) **${user.username}**`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)])
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }));

        message.channel.send(embed)
    }
}