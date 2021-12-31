const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'ajuda'
    this.aliases = ['ajudante', 'help', 'comandos']
    this.category = 'misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const documento = await this.client.database.Guilds.findById(message.guild.id)
    const prefix = documento.prefix

    const embed = new MessageEmbed()
    embed.setAuthor(`${this.client.user.username} | Ajuda`, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
    embed.setDescription(`**Criamos uma guia de ajuda para você: ${message.author}**`)
    embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
    embed.setColor(colors['default'])
    embed.addField(`${('Contador')} (${this.getCommmandSize('counter')})`, this.getCategory('counter', prefix))
    embed.addField(`${('Entretenimento')} (${this.getCommmandSize('fun')})`, this.getCategory('fun', prefix))
    embed.addField(`${('Miscellaneous')} (${this.getCommmandSize('misc')})`, this.getCategory('misc', prefix))
    embed.addField(`${('Moderação')} (${this.getCommmandSize('mod')})`, this.getCategory('mod', prefix))
    embed.addField(`${('Somente Donos')} (${this.getCommmandSize('magic')})`, this.getCategory('magic', prefix))
    embed.addField(`${('Registro')} (${this.getCommmandSize('registry')})`, this.getCategory('registry', prefix))
    embed.addField(`${('Social')} (${this.getCommmandSize('social')})`, this.getCategory('social', prefix))
    embed.addField(`${('VIP')} (${this.getCommmandSize('vip')})`, this.getCategory('vip', prefix))

    message.channel.send({
      content: `${message.author} Não se esqueça de votar em mim! <:7875_christmaspog:828828587926093924>`,
      embeds: [embed]
    })
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
