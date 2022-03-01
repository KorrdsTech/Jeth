const { Command, colors } = require('../../utils')
const Discord = require('discord.js');

module.exports = class atirar extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'shot'
    this.aliases = ['atirar']
    this.category = 'Fun'
  }

  async run(message) {
    const user = message.mentions.members.first();

    if (!user) return message.channel.send('Mencione alguém');
    if (user.user.id == message.author.id) return message.channel.send('Você não pode atirar em si mesmo');

    const gifs = ['https://i.pinimg.com/originals/40/49/b5/4049b559d6f08dc8ac5c174a53d109d4.gif', 'https://pa1.narvii.com/6553/291bada149c311fe54df1ca479732115c321a5f2_hq.gif', 'https://i.pinimg.com/originals/2d/fa/a9/2dfaa995a09d81a07cad24d3ce18e011.gif']

    const aEmbed = new Discord.MessageEmbed()

      .setTimestamp()
      .setColor(colors.default)
      .setDescription(`:scream: ${message.author} **atirou no(a)** ${user}`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
    try {
      message.delete({ timeout: 100 }).catch(() => { })
      message.channel.send({ embeds: [aEmbed] });
    } catch (error) {
      console.log(error);
      message.channel.send(`${error}`);
    }
  }
}