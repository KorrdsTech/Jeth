const { Command, colors } = require('../../utils')
const Discord = require('discord.js');

module.exports = class DogCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'dog'
    this.aliases = []
    this.category = 'fun'
  }

  async run(message, args) {

    const gifs = ['https://media3.giphy.com/media/1qTIW3DqTPwUo/giphy.gif', 'https://media3.giphy.com/media/dYGzbKNV5Fh7vQwR4B/giphy.gif', 'https://i.pinimg.com/originals/50/bb/0a/50bb0aad7cd73787d6c2a9f3ab91d49a.gif', 'https://media1.tenor.com/images/95ad8741e29f32fb15487657d4d02082/tenor.gif?itemid=13072116'];
    const embed = new Discord.MessageEmbed()
      .setTitle(`Seu doguinho 😍`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setColor(colors['default'])
      .setTimestamp(new Date())
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
    message.channel.send({ embeds: [embed] });
  }
}