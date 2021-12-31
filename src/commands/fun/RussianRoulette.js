const { Command, colors } = require('../../utils')
const Discord = require('discord.js');

module.exports = class RussianRoulette extends Command {
  constructor(client) {
    super(client)

    this.name = 'roleta'
    this.aliases = []
    this.category = 'fun'
  }

  async run(message, args) {
    const falas = [`${message.author} morreu durante a roleta russa, preparem o funeral!`, `${message.author} sobreviveu a roleta russa, Parabéns!`]
    const gifs = ['https://i.pinimg.com/originals/f5/56/98/f55698b9290507b2ba41c91d9d752903.gif', 'https://www.intoxianime.com/wp-content/uploads/2017/07/gif3-3.gif']
    const embed = new Discord.MessageEmbed()
      .setColor(colors['default'])
      .setDescription(falas[Math.floor(Math.random() * falas.length)])
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp();

    message.channel.send({ embeds: [embed] })
  }
}