const { Command, colors } = require('../../utils')
const Discord = require('discord.js')
const steam = require('steam-provider')
const provider = new steam.SteamProvider();

module.exports = class SteamCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'steam'
    this.aliases = ['game', 'gameinfo']
    this.category = 'misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {

    const arg = args.join(' ') //Puxa os argumentos do  usuário
    if (!arg) return message.channel.send(`${message.author}, você precisa colocar um jogo!`) //retorna quando o usuário não coloca um jogo
    provider.search(arg).then(result => { //vai mostrar o resultado
      provider.detail(result[0].id, 1, 'portuguese', 'pt').then(results => { //tenta mostrar o resultado em Português (Brasil)
        const other = results.otherData //vai pegar os dados do jogo
        const embed = new Discord.MessageEmbed() //vai mostrar para o usuário todas as informações do jogo
        embed.setTitle(results.name)
        embed.setColor(colors['default'])
        embed.setDescription(`\n\n**__GÊNERO__**: ${results.genres.join(', ')} \n**__PLATAFORMA__**: ${other.platforms.join(', ')}\n**__CARACTERÍSTICAS__**: ${other.features.join(', ')}\n\n**__DEVELOPER__**: ${other.developer.join(', ')}`)
        embed.setThumbnail(other.imageUrl)
        embed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

        message.channel.send({ embeds: [embed] })
      })
    })
  }
}

exports.help = {
  name: 'steam'
}