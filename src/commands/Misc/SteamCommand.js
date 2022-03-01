const { Command, colors } = require('../../utils')
const { Discord, MessageEmbed } = require('discord.js')
const steam = require('steam-provider') //npm i steam-provider
const provider = new steam.SteamProvider();

module.exports = class steam extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'steam'
    this.aliases = ['steam', 'game', 'gameinfo']
    this.category = 'Fun'
    this.subcommandsOnly = false
  }

  async run(message, args) {

    const arg = args.join(' ') //Puxa os argumentos do  usuário
    if (!arg) return message.channel.send(`${message.author}, você precisa colocar um jogo!`) //retorna quando o usuário não coloca um jogo
    provider.search(arg).then(result => { //vai mostrar o resultado
      provider.detail(result[0].id, 1, 'portuguese', 'pt').then(results => { //tenta mostrar o resultado em Português (Brasil)
        const other = results.otherData //vai pegar os dados do jogo
        const embed = new MessageEmbed() //vai mostrar para o usuário todas as informações do jogo
          .setTitle(results.name)
          .setColor(colors.default)
          .setDescription(`\n\n**__GÊNERO__**: ${results.genres.join(', ')} \n**__PLATAFORMA__**: ${other.platforms.join(', ')}\n**__CARACTERÍSTICAS__**: ${other.features.join(', ')}\n\n**__DEVELOPER__**: ${other.developer.join(', ')}`)
          .setThumbnail(other.imageUrl)
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
        message.channel.send({ embeds: [embed] })
      })
    })
  }
}

exports.help = {
  name: 'steam'
}