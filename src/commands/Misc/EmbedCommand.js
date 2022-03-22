const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

String.prototype.replaceAll = function (de, para) {
  let str = this
  let pos = str.indexOf(de)
  while (pos > -1) {
    str = str.replace(de, para)
    pos = str.indexOf(de)
  }
  return (str)
}
module.exports = class Embed extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'embed'
    this.aliases = ['embed', 'embed-visualizer']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const ajuda = new MessageEmbed()
      .setAuthor(message.author.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTitle(`Defina algo para eu transformar em embed.`)
      .addField(`Placeholder's`, `**{guild-name}** - Para dar o nome do servidor.\n**{user-icon}** - Para dar o avatar do autor.\n**{guild-icon}** - Para dar o avatar do servidor.\n**{user}** - Para dar o nickname do autor.\n**{mention}** - Para te mencionar.`, false)
      .addField(`Embed Visualizer`, `Que tal testar sua embed antes de colocar na Jeth? Assim você saberá se há erros ou não. Acesse ao site do [Embed Visualizer](https://leovoel.github.io/embed-visualizer/) e teste.`)
      .setFooter(`Requisitado por ${message.author.tag} - ID ${message.author.id}`)
      .setColor(colors.default)
    if (!args.join(' ')) return message.reply({ embed: ajuda })

    try {
      const a = JSON.parse(args.join(' ').replaceAll('{guild-name}', message.guild.name).replaceAll('{user-icon}', message.author.displayAvatarURL({ dynamic: true, size: 1024 })).replaceAll('{guild-icon}', message.guild.iconURL({ dynamic: true, size: 1024 })).replaceAll('{mention}', `${message.author}`).replace('{user}', message.member.nickname ? message.member.nickname : message.author))
      if (a.embed.color) a.embed.color = parseInt(a.embed.color)
      if (a.content) a.content = a.content.slice(0, 2000)
      if (a.embed.title) a.embed.title = a.embed.title.slice(0, 1024)
      if (a.embed.description) a.embed.description = a.embed.description.slice(0, 1024)
      if (a.embed.fields) a.embed.fields = a.embed.fields.slice(0, 1024)
      if (a.embed.footer) a.embed.footer.text = a.embed.footer.text.slice(0, 1024)
      if (a.embed.author) a.embed.author.name = a.embed.author.name.slice(0, 1024)
      if (a.content) message.reply(a.content, { embed: a.embed })
      else {
        message.reply({ embed: a.embed })
          .catch(e => console.log(e))
      }
      console.log(({ embeds: [ajuda] }))
    } catch (e) {
      message.reply(args.join(' '), { disableEveryone: true })
        .catch(e => console.log(e))
    }
  }
}