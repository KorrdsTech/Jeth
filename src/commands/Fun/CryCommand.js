const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class cry extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'cry'
    this.aliases = ['cry']
    this.category = 'Fun'
  }

  async run(message) {
    const defineduser = message.mentions.users.first();

    const gifs = ['https://i.imgur.com/DAUCIHG.gif', 'https://media0.giphy.com/media/ROF8OQvDmxytW/giphy.gif', 'https://i.gifer.com/C1la.gif'];

    if (!defineduser) {
      const embed = new MessageEmbed()
        .setColor(colors['default'])
        .setDescription(`${message.author} **chorou de tristeza (╥﹏╥)**`)
        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
        .setTimestamp()
      try {
        message.reply({ embeds: [embed] })
      } catch (error) {
        console.log(error);
        message.reply(error);
      }
    } else {
      const embed = new MessageEmbed()
        .setColor(colors['default'])
        .setDescription(`:sob: ${message.author} **lançou gritos de tristeza para** ${defineduser} (╥﹏╥)`)
        .setImage('https://i.pinimg.com/originals/83/05/c3/8305c3a012e448cb409d12e5db3ac179.gif')
        .setFooter({ text: `Pedido por ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })
        .setTimestamp()

      try {
        message.reply({ embeds: [embed] })
      } catch (error) {
        console.log(error);
        message.reply(error);
      }
    }
  }
}