const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class HighFiveCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'highfive'
    this.aliases = ['tocaaqui', 'h5']
    this.category = 'fun'
  }

  async run(message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.channel.send('Ninguém foi mencionado!')
    const gifs = ['https://lh6.googleusercontent.com/hIRp_xCGjt6x5H5GSu9odKA9WPagzrMYPtT-Ow-Nte0AeHoMY4MUTlnxrZkJK248JAqNiBVi_9iaU3eYS2bWXtcdJFjsnrAV8i2H_iN5pjWWHDN6djKm2E-h3MQMUvM2DkoO3M7e.gif', 'https://c.tenor.com/JBBZ9mQntx8AAAAC/anime-high-five.gif', 'https://thumbs.gfycat.com/BreakableMessyHarrierhawk-size_restricted.gif'];
    const falas = [`${message.author} **Deu um HIGH-FIVE com** ${user}`];
    const embed = new MessageEmbed()
    embed.setDescription(falas[Math.floor(Math.random() * falas.length)])
    embed.setImage(gifs[Math.floor(Math.random() * gifs.length)])
    embed.setColor(colors['default'])
    embed.setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
    embed.setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
}