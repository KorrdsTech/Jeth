const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class flip extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'flip'
    this.aliases = ['flip']
    this.category = 'Fun'
  }

  async run(message) {
    const msg = ['coroa', 'cara'];
    const moeda = msg[Math.floor(Math.random() * 2)];

    const moedaembed1 = new MessageEmbed()
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })
      .setColor(colors['default'])
      .setDescription(moeda)
      .setTitle('A face da moeda está virada para...')

    message.reply({ embeds: [moedaembed1] });

  }
}