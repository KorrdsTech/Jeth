const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class ChangeAvatarCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'changeavatar'
    this.aliases = ['botavatar']
    this.category = 'magic'
    this.adminOnly = true
  }

  async run(message, args) {
    const avatar = args[0];
    if (!avatar || avatar === undefined) return message.reply('Digite um link de uma imagem.')

    this.client.user.setAvatar(avatar).then(() => {
      const embed = new Discord.MessageEmbed()
        .setAuthor('Avatar trocado.', avatar)
        .setImage(avatar)
        .setColor(colors['default'])

      message.channel.send({ embeds: [embed] })
    }).catch(() => { message.reply('Deu erro!') })
  }
}