const { Command, colors } = require('../../utils')
const { Discord, MessageEmbed } = require('discord.js');

module.exports = class reverse extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'reverse'
    this.aliases = ['reverse']
    this.category = 'Fun'
  }

  async run(message, args) {
    const reason = args.slice(0).join(' ');

    if (reason.length < 1) return message.channel.send('**' + message.author.tag + '** <:a_blurpletextchannel:856174396095594536> Diga uma **mensagem**!');

    message.channel.send(`:pencil: Reverse by: **${message.author}** \n \n **` + args.join(' ').split('').reverse().join('') + '**');

  }
}