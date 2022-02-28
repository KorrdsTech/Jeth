const Discord = require('discord.js');
const { Command, colors } = require('../../utils')
const axios = require('axios');

module.exports = class github extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'github'
    this.aliases = ['github', 'git', 'hub']
    this.category = 'Miscellaneous'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const usuario = args.slice(0).join(' ')
    if (!usuario) message.channel.send('<a:9komi:663575133151035392> **Por favor!** Diga o nome de um usuário para pesquisar na lista ...')
    axios.get(`https://api.github.com/users/${usuario}`)
      .then(async function (response) {
        const nome = response.data.name
        const avatar = response.data.avatar_url
        const bio = response.data.bio
        const tipo = response.data.type
        const compania = response.data.company
        const link = response.data.html_url
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