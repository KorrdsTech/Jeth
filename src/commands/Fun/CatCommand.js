const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class cat extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'cat'
    this.aliases = ['cat']
    this.category = 'Fun'
  }

  async run(message) {
    const gifs = ['https://media0.giphy.com/media/nBIMaUaKCV6ve/source.gif', 'https://66.media.tumblr.com/82f66e4286dda4a5761ab7cef79de1f6/tumblr_nlj44jCswJ1s9j8oho1_500.gif', 'https://i.pinimg.com/originals/51/c9/89/51c989f2500e1cba97bc46dd41cb4df8.gif', 'https://media1.giphy.com/media/3aWQs44QcNqIU/source.gif'];

    const embed = new MessageEmbed()
      .setTitle('Seu gatinho :3')
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setColor(colors['default'])
      .setTimestamp()

    message.reply({ embeds: [embed] });
  }
}