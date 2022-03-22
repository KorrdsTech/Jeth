const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class emoji extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'emoji'
    this.aliases = ['emojis', 'emoji']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message) {
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
    const embed = new MessageEmbed()
      .setTitle(`Emojis em ${message.guild.name}.`)
      .setDescription(`**Animado [${Animated}]**:\n${EmojisAnimated}`)
      .setColor(colors.default)

    const embedB = new MessageEmbed()
      .setDescription(`**Normais [${EmojiCount}]**:\n${Emojis}\n\n**Total de emojis [${OverallEmojis}]**`)
      .setColor(colors.default)

    message.reply({ embeds: [embed] })
    await message.reply({ embeds: [embedB] })
  }
}