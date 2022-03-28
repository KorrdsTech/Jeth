const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class beijar extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'kiss'
    this.aliases = ['beijar', 'kiss', 'beijo']
    this.category = 'Fun'
  }

  async run(message) {
    const user = message.mentions.users.first();
    if (!user) return message.reply('`Você precisa mencionar alguém para beijar!`');
    const gifs = ['https://media1.giphy.com/media/FqBTvSNjNzeZG/source.gif', 'https://thumbs.gfycat.com/FondEvergreenIcterinewarbler-size_restricted.gif', 'https://media1.tenor.com/images/3c167989c5623e40ef517ded7e3c44e2/tenor.gif?itemid=9227861']

    const embed = new MessageEmbed()
      .setColor(colors['default'])
      .setTitle('Será que temos um novo casal no servidor ?')
      .setTimestamp()
      .setThumbnail('https://cdn.discordapp.com/emojis/742240824569626674.png')
      .setDescription(`:heart_eyes: **${message.author}** acabou de beijar o(a) **${user}**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) });

    message.reply({ embeds: [embed] })
  }
}