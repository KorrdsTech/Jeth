const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js');

module.exports = class dancar extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'dance'
    this.aliases = ['dancar', 'dançar', 'dance']
    this.category = 'Fun'
  }

  async run(message) {
    const defineduser = message.mentions.users.first();
    const gifs = ['https://media.giphy.com/media/Lpjf6bdEAOrQVopADX/giphy.gif', 'https://media.tenor.com/images/fe3826b59f80f5e6c7cc04eb474fb44d/tenor.gif', 'https://i.pinimg.com/originals/74/cc/f2/74ccf241f106391981c4f8794523cadf.gif', 'http://bestanimations.com/Music/Dancers/anime-dancing-girls/anime-kawaii-cute-dance-animated-gif-image-7.gif', 'https://i.kym-cdn.com/photos/images/newsfeed/001/115/816/936.gif']

    if (!defineduser) {
      const embed = new EmbedBuilder()
        .setColor('#a900ff')
        .addFields(`${message.author.username}`, ' Se juntou a dança!')
        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
        .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
        .setTimestamp()
      try {
        message.reply({ embeds: [embed] })
      } catch (error) {
        console.log(error);
        message.reply(error);
      }
    }
    else {
      const gifs1 = ['https://i.pinimg.com/originals/7c/76/08/7c760844a176bfe76af5243a42bd6eab.gif', 'https://pa1.narvii.com/6575/8b572b4c00b85532f919c59f1b31d95e751ab8d6_hq.gif', 'https://i.pinimg.com/originals/1a/4e/7e/1a4e7e3d9fb7e1d5e8ccc2d3787bc39d.gif', 'https://i.pinimg.com/originals/e4/ce/34/e4ce34c84c4c708d3905fa50de684345.gif'];
      const embed1 = new EmbedBuilder()
        .setColor(colors['default'])
        .setDescription(`💃🏻 🕺🏻 ${message.author} Convidou ${defineduser} para dançar e a resposta foi **SIM**`)
        .setImage(gifs1[Math.floor(Math.random() * gifs1.length)])
        .setFooter({ text: `Pedido por ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })
        .setTimestamp()

      message.reply({ embeds: [embed1] })
    }
  }
}