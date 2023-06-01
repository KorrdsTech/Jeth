const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

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

    const embed = new MessageEmbed()
    embed.setAuthor({ name: `${this.client.user.username} | Ajuda`, iconURL: this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
    embed.setDescription(`**Criamos uma guia de ajuda para você: ${message.author}**`)
    embed.setColor(colors['default'])
    // esta linha quebra o comando >> embed.addField(`${('Counter')} (${this.getCommmandSize('Counter')})`, this.getCategory('Counter', prefix))
    .addFields({ name: `${('Fun')} (${this.getCommmandSize('Fun')})`, value: this.getCategory('Fun', prefix)})
    .addFields({ name: `${('Misc')} (${this.getCommmandSize('Misc')})`, value: this.getCategory('Misc', prefix)})
    .addFields({ name: `${('Mod')} (${this.getCommmandSize('Mod')})`, value: this.getCategory('Mod', prefix)})
    .addFields({ name: `${('Magic')} (${this.getCommmandSize('Magic')})`, value: this.getCategory('Magic', prefix)})
    .addFields({ name: `${('Social')} (${this.getCommmandSize('Social')})`, value: this.getCategory('Social', prefix)})
    .addFields({ name: `${('VIP')} (${this.getCommmandSize('VIP')})`, value: this.getCategory('VIP', prefix)})

    message.reply({ content: `${message.author} Não se esqueça de votar em mim! <:peeencil:1040822681379024946>`, embeds: [embed] })
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
