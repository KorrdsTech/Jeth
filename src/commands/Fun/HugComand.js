const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class abracar extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'hug'
    this.aliases = ['abraçar', 'hug', 'abraço', 'abracar']
    this.category = 'Fun'
  }

  async run(message) {
    const self = ['https://media0.giphy.com/media/nUz7d1sUppGta/giphy.gif', 'https://data.whicdn.com/images/308042586/original.gif', 'https://66.media.tumblr.com/5e0e2e48baf3bbce2bd4ddf072928928/tumblr_n0l0o5xAQF1trllx1o1_400.gifv'];
    const gifs = ['http://1.bp.blogspot.com/-2K2IFjMGJ5M/VYdu-DjrAeI/AAAAAAAAJSU/Psjf62_VcDo/s1600/hug_anime_conversacult.gif', 'https://i.pinimg.com/originals/82/c8/e9/82c8e9ff24cce631fa061b35cf9fe82b.gif', 'https://i.pinimg.com/originals/f0/ee/e6/f0eee67fa8e98c4e5c08ce01f36dee0e.gif'];
    const user = message.mentions.users.first();

    const embed = new MessageEmbed()
      .setColor(colors.default)
      .setDescription(`:blush: ${message.author} **se deu um abraço**`)
      .setImage(self[Math.floor(Math.random() * self.length)])
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp()

    if (message.mentions.users.size < 1) return message.reply({ embeds: [embed] })
    if (user.id == message.author.id) message.reply({ embeds: [embed] })// return message.reply("Você não pode abraçar a si mesmo.")

    const HugEmbed = new MessageEmbed()
      .setColor(colors.default)
      .setTitle(`:blush: ${message.author.username} **deu um abraço no(a)** ${user.username}`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp()

    message.reply({ embeds: [HugEmbed] })
  }
}