const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class EmbedCommand extends Command {
  constructor(client) {
    super(client)

    this.aliases = ['embed-visualizer']
    this.category = 'misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const ajuda = new MessageEmbed()
      .setAuthor(message.author.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTitle(`Defina algo para eu transformar em embed.`)
      .addField(`Placeholder's`, `**{guild-name}** - Para dar o nome do servidor.\n**{user-icon}** - Para dar o avatar do autor.\n**{guild-icon}** - Para dar o avatar do servidor.\n**{user}** - Para dar o nickname do autor.\n**{mention}** - Para te mencionar.`, false)
      .addField(`Embed Visualizer`, `Que tal testar sua embed antes de colocar na Jeth? Assim você saberá se há erros ou não. Acesse ao site do [Embed Visualizer](https://leovoel.github.io/embed-visualizer/) e teste.`)
      .setFooter(`Requisitado por ${message.author.tag} - ID ${message.author.id}`)
      .setColor(colors['default'])
    if (!args.join(' ')) return message.channel.send({ embeds: [ajuda] })

    try {
      const a = JSON.parse(args.join(' ').replace(/{guild-name}/g, message.guild.name).replace(/{user-icon}/g, message.author.displayAvatarURL({ dynamic: true, size: 1024 })).replace(/{guild-icon}/g, message.guild.iconURL({ dynamic: true, size: 1024 })).replace(/{mention}/g, message.author.toString()).replace(/{user}/g, message.member.nickname ?? message.author.username))
      if (a.embed.color) a.embed.color = parseInt(a.embed.color)
      if (a.content) a.content = a.content.slice(0, 2000)
      if (a.embed.title) a.embed.title = a.embed.title.slice(0, 1024)
      if (a.embed.description) a.embed.description = a.embed.description.slice(0, 1024)
      if (a.embed.fields) a.embed.fields = a.embed.fields.slice(0, 1024)
      if (a.embed.footer) a.embed.footer.text = a.embed.footer.text.slice(0, 1024)
      if (a.embed.author) a.embed.author.name = a.embed.author.name.slice(0, 1024)
      if (a.content) message.channel.send({ content: a.content, embeds: [a.embed] })
      else {
        message.channel.send({ embeds: [a.embed] })
          .catch(e => console.log(e))
      }
      console.log((a.embed))
    } catch (e) {
      message.channel.send(args.join(' '), { disableEveryone: true })
        .catch(e => console.log(e))
    }
  }
}