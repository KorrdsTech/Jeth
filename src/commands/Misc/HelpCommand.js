const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class Ajuda extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'help'
    this.aliases = ['ajuda', 'ajudante', 'help', 'comandos']
    this.category = 'Fun'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const documento = await this.client.database.guild.getOrCreate(message.guild.id)
    const prefix = documento.prefix

    const embed = new MessageEmbed()
    embed.setAuthor(`${this.client.user.username} | Ajuda`, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
    embed.setDescription(`**Criamos uma guia de ajuda para você: ${message.author}**`)
    embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
    embed.setColor(colors.default)
    embed.addField(`${('Counter')} (${this.getCommmandSize('Counter')})`, this.getCategory('Counter', prefix))
    embed.addField(`${('Fun')} (${this.getCommmandSize('Fun')})`, this.getCategory('Fun', prefix))
    embed.addField(`${('Fun')} (${this.getCommmandSize('Fun')})`, this.getCategory('Fun', prefix))
    embed.addField(`${('Mod')} (${this.getCommmandSize('Mod')})`, this.getCategory('Mod', prefix))
    embed.addField(`${('Magic')} (${this.getCommmandSize('Magic')})`, this.getCategory('Magic', prefix))
    embed.addField(`${('Registry')} (${this.getCommmandSize('Registry')})`, this.getCategory('Registry', prefix))
    embed.addField(`${('Social')} (${this.getCommmandSize('Social')})`, this.getCategory('Social', prefix))
    embed.addField(`${('VIP')} (${this.getCommmandSize('VIP')})`, this.getCategory('VIP', prefix))

    message.channel.send(`${message.author} Não se esqueça de votar em mim! <:7875_christmaspog:828828587926093924>`, embed)
      .catch(() => {
        message.reply('<a:rb_mod:759648839417200661> Erro, verifique se eu consigo te enviar mensagens no privado!')
      })
  }

  getCategory(category, prefix) {
    return this.client.commands.filter(c => c.category === category).map(c => `\`${prefix}${c.name}\``).join(', ')
  }

  getCommmandSize(category) {
    return this.client.commands.filter(c => c.category === category).size
  }

}
