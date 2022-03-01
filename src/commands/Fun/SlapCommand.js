const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class tapa extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'slap'
    this.aliases = ['tapa', 'tapear', 'slap']
    this.category = 'Fun'
  }

  async run(message, args) {
    const slapUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!slapUser) return message.channel.send('Mencione alguém para da um tapa!');

    const gifs = ['https://thumbs.gfycat.com/BestEnormousAllensbigearedbat-max-1mb.gif', 'https://68.media.tumblr.com/664045302ec83165bc35db7709d99ebd/tumblr_nbjnosotP11sfeoupo1_500.gif', 'https://i.pinimg.com/originals/bd/fd/d1/bdfdd112c36a7c2159c28ed2549eb4df.gif', 'https://media1.giphy.com/media/Zau0yrl17uzdK/giphy.gif', 'https://media1.tenor.com/images/f2e22829f9dc2e796d8e9d0590e8076c/tenor.gif'];

    const slapEmbed = new MessageEmbed()
      .setDescription(`:person_facepalming: ${message.author} **deu um tapa no(a)** ${message.mentions.users.first()}`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setColor(colors.default)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp();

    message.channel.send({ embeds: [slapEmbed] })
  }
}