const { Command, colors } = require('../../utils')
const Discord = require("discord.js");

module.exports = class hvh extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['fight']
        this.category = 'Entertainment'
    }
    async run(message, args) {
        let user = message.mentions.users.first();
        if (!user) return message.reply('`Você não mencionou o usuario que você quer batalhar!`').catch(console.error);
        const v = "<@" + message.author.id + ">"
        const v2 = " <@" + user.id + ">"
        let gifs = ['https://2.bp.blogspot.com/-JvzopHO87T8/V4VKL4PX_GI/AAAAAAAAEWA/-Rx2XKmOT28lElnlMUaOpn22FAuKdJA4wCLcB/s640/tumblr_o49dvpBamW1vont75o1_500.gif', 'https://pa1.narvii.com/6668/62e28e9e256f3003fc4078f5aeaac99aefec1d8e_hq.gif', 'https://media1.tenor.com/images/4bb385101ff94e863ddef445ce2cc732/tenor.gif?itemid=18523359', 'https://media1.tenor.com/images/304bff8e43185ab3dfcd6424bd2be8fd/tenor.gif?itemid=18523137', 'https://pa1.narvii.com/6562/3a7a5cdcf9b84afb206a65a3d99d3d3c11447088_hq.gif', 'https://i.pinimg.com/originals/3c/40/7c/3c407c8f18f779df549c30fa0e56f835.gif', 'https://i.pinimg.com/originals/20/8e/f9/208ef916f5998629b0face475c12e241.gif', 'https://thumbs.gfycat.com/FickleForcefulBlobfish-max-1mb.gif', 'https://media3.giphy.com/media/h3Jxu7a7pd72w/giphy.gif', 'https://data.whicdn.com/images/301514445/original.gif']
        var falas = ['**ganhou** a batalha!', '**foi assassinado** em combate!', '**perdeu** a batalha!']
        var embedB = new Discord.MessageEmbed()
            .setTitle("🏹 | Batalha")
            .setDescription(" O " + v + " e" + v2 + " **estão disputando uma batalha!**")
            .setImage(gifs[Math.floor(Math.random() * gifs.length)])
            .setColor(colors.default)
            .addField("Sobre a batalha:", "O " + v + "\n" + falas[Math.floor(Math.random() * falas.length)] + "\n" + "O " + v2 + "\n" + falas[Math.floor(Math.random() * falas.length)])
            .setTimestamp()
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
        message.channel.send(embedB)
    }
}