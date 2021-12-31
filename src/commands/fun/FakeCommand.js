const { Command } = require('../../utils')

module.exports = class FakeCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'fake'
    this.aliases = []
    this.category = 'fun'
    this.permissions = ['MANAGE_MESSAGES']
  }

  async run(message, args) {
    const user = message.mentions.users.first();
    const botmessage = args.slice(1).join(' ')
    if (user == null) {
      message.channel.send('`Faltou você mencionar o usuario`')
    }
    if (botmessage == null) {
      message.channel.send('`Ops parace que você esqueceu de colocar a mensagem`')
    }
    message.channel.createWebhook(user.username, { avatar: user.displayAvatarURL({ format: 'png' }) }).then(async w => {
      w.send(botmessage);
    })

  }

}