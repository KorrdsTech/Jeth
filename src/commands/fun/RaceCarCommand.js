const { Command } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class RaceCarCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'corrida'
    this.aliases = ['racecar']
    this.category = 'fun'
  }

  async run(message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.reply('`Você não mencionou o usuario que você quer correr!`').catch(console.error);
    const falas = [' fez **200** metros 🏎.....', ' fez **500** metros 🏎...........', ' fez **800** metros 🏎..............', ' fez **1000** metros 🏎.................', ' fez **1500** metros 🏎............................', 'Explodiu 🔥 ', 'Bateu e pegou fogo 🔥']
    const embed = new MessageEmbed()
    embed.setTitle('🏎 Corrida')
    embed.setDescription(`${message.author.toString()} e ${user.toString()} **estao disputando uma corrida**`)
    embed.addField('Sobre a corrida:', `${message.author.toString()}\n${falas[Math.floor(Math.random() * falas.length)]}\n${user.toString()}\n${falas[Math.floor(Math.random() * falas.length)]}`)

    message.channel.send({ embeds: [embed] })
  }
}