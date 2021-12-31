const { Command, colors } = require('../../utils')
const Discord = require('discord.js');

module.exports = class CardsCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'cartas'
    this.aliases = ['cards']
    this.category = 'fun'
  }

  async run(message, args) {
    const list = ['Cartas Disponíveis: Orochimaru, Hokage, Yondaime, Jiraya']

    const orochimaru = new Discord.MessageEmbed()
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle(`${message.author.username}`)
      .setDescription(`**Sobre a carta Orochimaru**`)
      .setColor(colors['default'])
      .setImage('https://i0.wp.com/sep.yimg.com/ay/my1stop2shop/n-447-orochimaru-starter-exclusive-naruto-card-2.gif')
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp(new Date());

    const hokage = new Discord.MessageEmbed()
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle(`${message.author.username}`)
      .setDescription(`**Sobre a carta Hokage**`)
      .setColor(colors['default'])
      .setImage('https://2img.net/h/i915.photobucket.com/albums/ac356/venkelos2010/Naruto%20Cards%20Resized/b432e489-257e-4380-a76e-718a881c3a41_zps75bc4f7f.jpg')
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp(new Date());

    const yondaime = new Discord.MessageEmbed()
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle(`${message.author.username}`)
      .setDescription(`**Sobre a carta Yondaime**`)
      .setColor(colors['default'])
      .setImage('https://i.pinimg.com/originals/5a/bb/df/5abbdf24d57d07ac9fede439ce6b070d.png')
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp(new Date());

    const jiraya = new Discord.MessageEmbed()
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle(`${message.author.username}`)
      .setDescription(`**Sobre a carta Jiraya**`)
      .setColor(colors['default'])
      .setImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e587451d-5ede-421d-b18f-21d8902d8115/d5jr8w2-8746249a-fe88-4d95-9e4e-1bf1d69089cc.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U1ODc0NTFkLTVlZGUtNDIxZC1iMThmLTIxZDg5MDJkODExNVwvZDVqcjh3Mi04NzQ2MjQ5YS1mZTg4LTRkOTUtOWU0ZS0xYmYxZDY5MDg5Y2MuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GxcDt0fBXMa-HfAQeUoU0QgfLc2O1xgmF7Z0PPLpzzk')
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp(new Date());

    const content = args.join('')
    if (!content) {
      message.channel.send('Uso: -cards \'list\'')
      return (0);
    }

    if (content === 'list') {
      message.channel.send(list)
      return (0);
    }
    if (content === 'List') {
      message.channel.send(list)
      return (0);
    }

    if (content === 'orochimaru') {
      message.channel.send(orochimaru)
      return (0);
    }
    if (content === 'Orochimaru') {
      message.channel.send(orochimaru)
      return (0);
    }

    if (content === 'hokage') {
      message.channel.send(hokage)
      return (0);
    }
    if (content === 'Hokage') {
      message.channel.send(hokage)
      return (0);
    }

    if (content === 'yondaime') {
      message.channel.send(yondaime)
      return (0);
    }
    if (content === 'Yondaime') {
      message.channel.send(yondaime)
      return (0);
    }

    if (content === 'jiraya') {
      message.channel.send(jiraya)
      return (0);
    }
    if (content === 'Jiraya') {
      message.channel.send(jiraya)
      return (0);
    }
  }
}