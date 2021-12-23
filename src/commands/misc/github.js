const Discord = require('discord.js');
const { Command, colors } = require('../../utils')
const axios = require('axios');

module.exports = class github extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = ['git', 'hub']
    this.category = 'misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    let usuario = args.slice(0).join(' ')
    if (!usuario) message.channel.send('<a:9komi:663575133151035392> **Por favor!** Diga o nome de um usuário para pesquisar na lista ...')
    axios.get(`https://api.github.com/users/${usuario}`)
      .then(async function (response) {
        let nome = response.data.name
        let avatar = response.data.avatar_url
        let bio = response.data.bio
        let tipo = response.data.type
        let compania = response.data.company
        let link = response.data.html_url
        message.channel.send(new Discord.MessageEmbed()
          .setTitle(`Github`)
          .setColor(colors.default)
          .setThumbnail(avatar)
          .addField(`User`, `${usuario}`)
          .addField(`Nome Do Usuario`, `${nome}`, true)
          .addField(`Compania`, `${compania}`, true)
          .addField(`Tipo De Usuario`, `${tipo}`, true)
          .addField(`Bio`, `${bio}`, true)
          .addField(`Link Para O Perfil`, `${link}`, true)
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setTimestamp()
        )
      })
  }
};