const { Command } = require('../../utils')

module.exports = class ReverseCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'reverse'
    this.aliases = []
    this.category = 'fun'
  }

  async run(message, args) {
    const reason = args.slice(0).join(' ');

    if (reason.length < 1) return message.channel.send('**' + message.author.tag + '** <:a_blurpletextchannel:856174396095594536> Diga uma **mensagem**!');

    message.channel.send(`:pencil: Reverse by: **${message.author}** \n \n **` + args.join(' ').split('').reverse().join('') + '**');

  }
}