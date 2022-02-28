const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class emoji extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'emoji'
    this.aliases = ['emojis', 'emoji']
    this.category = 'Miscellaneous'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    let Emojis = '';
    let EmojisAnimated = '';
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return message.channel.guild.emojis.cache.get(id).toString()
    }
    message.channel.guild.emojis.cache.forEach(emoji => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id)
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id)
      }
    })
    const Embed = new MessageEmbed()
      .setTitle(`Emojis em ${message.guild.name}.`)
      .setDescription(`**Animado [${Animated}]**:\n${EmojisAnimated}`)
      .setColor(colors.default)

    const EmbedB = new MessageEmbed()
      .setDescription(`**Normais [${EmojiCount}]**:\n${Emojis}\n\n**Total de emojis [${OverallEmojis}]**`)
      .setColor(colors.default)

    message.channel.send(Embed)
    await message.channel.send(EmbedB)
  }
}