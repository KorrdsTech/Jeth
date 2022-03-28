const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class changeAvatar extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'changeavatar'
    this.aliases = ['avatar', 'botavatar']
    this.category = 'Magic'
    this.adminOnly = true
  }

  async run(message, args) {
    const avatar = args[0];
    if (!avatar || avatar === undefined) return message.reply('Digite um link de uma imagem.')

    this.client.user.setAvatar(avatar).then(() => {
      const embed = new MessageEmbed()
        .setAuthor('Avatar trocado.', avatar)
        .setImage(avatar)
        .setColor(colors['default'])

      message.reply({ embeds: [embed] })
    }).catch(() => { message.reply('Deu erro!') })
  }
}