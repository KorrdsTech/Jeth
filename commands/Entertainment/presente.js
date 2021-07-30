const { Command, colors } = require('../../utils')
const Discord = require("discord.js");

module.exports = class presente extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['presentear']
        this.category = 'Entertainment'
    }
    async run(message, args) {
        let user = message.mentions.users.first();
        if (!user) return message.channel.send('`Você precisa mencionar alguém para presentear!`');
        let gifs = ['https://media1.tenor.com/images/f004fa755c977dcb7db5cbc1f31af43c/tenor.gif?itemid=4785658', 'https://pa1.narvii.com/5755/c86a21e370abd85dfd4e0f975bfeeb4f53db30eb_hq.gif', 'https://media1.giphy.com/media/6ScLNAwBlfCtG/source.gif']
        let embed = new Discord.MessageEmbed()
            .setColor(colors.default)
            .setDescription(`:gift: ${message.author.username} **presenteou** ${user.username}`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)])
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }));

        message.channel.send(embed)
    }
}