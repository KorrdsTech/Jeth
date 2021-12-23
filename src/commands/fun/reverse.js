const { Command, colors } = require('../../utils')
const Discord = require('discord.js');

module.exports = class reverse extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = []
    this.category = 'fun'
  }
  async run(message, args) {
    let reason = args.slice(0).join(' ');

    if (reason.length < 1) return message.channel.send('**' + message.author.tag + '** <:a_blurpletextchannel:856174396095594536> Diga uma **mensagem**!');

    message.channel.send(`:pencil: Reverse by: **${message.author}** \n \n **` + args.join(' ').split('').reverse().join('') + '**');

  }
}