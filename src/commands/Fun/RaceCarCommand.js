const { Command } = require('../../utils')
const { error } = require('console');

module.exports = class correr extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'racecar'
    this.aliases = ['correr', 'run', 'race']
    this.category = 'Fun'
  }

  async run(message) {
    const user = message.mentions.users.first();
    if (!user) return message.reply('`Você não mencionou o usuario que você quer correr!`').catch(console.error);
    const Corrida = '<@' + message.author.id + '>'
    const corrida2 = ' <@' + user.id + '>'
    const falas = [' fez **200** metros 🏎 .....', ' fez **500** metros 🏎 ...........', ' fez **800** metros 🏎 ..............', ' fez **1000** metros 🏎 .................', ' fez **1500** metros 🏎 ............................', 'Explodiu 🔥 ', 'Bateu e pegou fogo 🔥']
    message.channel.send({
      'embed': {
        'title': '🏎 Corrida',
        'description': ' O ' + Corrida + ' e' + corrida2 + ' **estao disputando uma corrida**',

        'fields': [
          {
            'name': 'Sobre a corrida:',
            'value': 'O ' + Corrida + '\n' + falas[Math.floor(Math.random() * falas.length)] + '\n' + 'O ' + corrida2 + '\n' + falas[Math.floor(Math.random() * falas.length)],
            'inline': false
          }
        ]
      }
    })
    console.log(error);
    message.channel.send(error);
  }
}