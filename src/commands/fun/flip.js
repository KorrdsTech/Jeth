const { Command, colors } = require('../../utils')
const Discord = require('discord.js');

module.exports = class flip extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = []
        this.category = 'fun'
    }
    async run(message, args) {
        var msg = ['coroa', 'cara'];
        let moeda = msg[Math.floor(Math.random() * 2)];

        const moedaembed1 = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor(colors.default)
            .setDescription(moeda)
            .setTitle('A face da moeda está virada para...')
            .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
        message.channel.send(moedaembed1);

    }
}