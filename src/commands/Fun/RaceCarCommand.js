const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')
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
    const embed = new EmbedBuilder()
    embed.setTitle('🏎 Corrida')
    embed.setColor(colors['default'])
    embed.setDescription(`${Corrida} e ${corrida2} **estão disputando uma corrida**`)
    embed.addField('Sobre a corrida:', `${Corrida}\n${falas[Math.floor(Math.random() * falas.length)]}\n${corrida2}\n${falas[Math.floor(Math.random() * falas.length)]}`)
    message.reply({ embeds: [embed] })
  }
}