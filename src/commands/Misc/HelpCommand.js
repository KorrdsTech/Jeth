const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js');

module.exports = class Ajuda extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'help'
    this.aliases = ['ajuda', 'ajudante', 'help', 'comandos']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message) {
    const documento = await this.client.database.guild.getOrCreate(message.guild.id)
    const prefix = documento.prefix

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${this.client.user.username} | Ajuda`, iconURL: this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
      .setDescription(`**Criamos uma guia de ajuda para você: ${message.author}**`)
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setColor(colors['default'])
      .addFields({ name: `${('Counter')} (${this.getCommmandSize('Counter')})`, value: this.getCategory('Counter', prefix) })
      .addFields({ name: `${('Fun')} (${this.getCommmandSize('Fun')})`, value: this.getCategory('Fun', prefix) })
      .addFields({ name: `${('Misc')} (${this.getCommmandSize('Misc')})`, value: this.getCategory('Misc', prefix) })
      .addFields({ name: `${('Mod')} (${this.getCommmandSize('Mod')})`, value: this.getCategory('Mod', prefix) })
      .addFields({ name: `${('Magic')} (${this.getCommmandSize('Magic')})`, value: this.getCategory('Magic', prefix) })
      .addFields({ name: `${('Social')} (${this.getCommmandSize('Social')})`, value: this.getCategory('Social', prefix) })

    message.reply({ content: `${message.author} Não se esqueça de votar em mim! <a:a_dancin:1002698613262127144>`, embeds: [embed] })
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
