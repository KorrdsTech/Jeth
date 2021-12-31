const { Command } = require('../../utils')

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'say'
    this.aliases = ['falar']
    this.category = 'misc'
    this.subcommandsOnly = false
    this.permissions = ['MANAGE_MESSAGES']
  }

  async run(message, args) {
    const mensagem = args.join(' ')
    message.channel.send(`${mensagem} \n\n<:9461systemmessageuser:832746852633149460> *Mensagem executada por: ${message.author}*`)
  }
}