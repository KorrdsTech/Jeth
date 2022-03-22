const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class presente extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'gift'
    this.aliases = ['presente', 'presentear']
    this.category = 'Fun'
  }

  async run(message) {
    const user = message.mentions.users.first();
    if (!user) return message.reply('`Você precisa mencionar alguém para presentear!`');
    const gifs = ['https://media1.tenor.com/images/f004fa755c977dcb7db5cbc1f31af43c/tenor.gif?itemid=4785658', 'https://pa1.narvii.com/5755/c86a21e370abd85dfd4e0f975bfeeb4f53db30eb_hq.gif']

    const embed = new MessageEmbed()
      .setColor(colors.default)
      .setDescription(`:gift: ${message.author} **presenteou** ${user}`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp();

    message.reply({ embeds: [embed] })
  }
}