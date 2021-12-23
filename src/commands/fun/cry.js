const { Command, colors } = require('../../utils')
const Discord = require('discord.js');

module.exports = class cry extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = []
    this.category = 'diversão'
  }
  async run(message, args) {
    let defineduser = message.mentions.users.first();

    let gifs = ['https://i.imgur.com/DAUCIHG.gif', 'https://media0.giphy.com/media/ROF8OQvDmxytW/giphy.gif', 'https://i.gifer.com/C1la.gif'];

    if (!defineduser) {
      const embed = new Discord.MessageEmbed()
        .setColor(colors.default)
        .setDescription(`${message.author} **chorou de tristeza (╥﹏╥)**`)
        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
        .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
        .setTimestamp()
      try {
        message.delete({ timeout: 100 }).catch(() => { })
        message.channel.send({ embeds: [embed] })
      } catch (error) {
        console.log(error);
        message.channel.send(error);
      }
    } else {

      const embed = new Discord.MessageEmbed()
        .setColor(colors.default)
        .setDescription(`:sob: ${message.author} **lançou gritos de tristeza para** ${defineduser} (╥﹏╥)`)
        .setImage('https://i.pinimg.com/originals/83/05/c3/8305c3a012e448cb409d12e5db3ac179.gif')
        .setFooter(`Pedido por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 1024 })).setTimestamp()

      try {
        message.delete({ timeout: 100 }).catch(() => { })
        message.channel.send({ embeds: [embed] })
      } catch (error) {
        console.log(error);
        message.channel.send(error);
      }
    }
  }
}