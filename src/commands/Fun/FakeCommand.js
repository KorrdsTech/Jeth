const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js');

module.exports = class fake extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'fake'
    this.aliases = ['fake']
    this.category = 'Fun'
  }

  async run(message, args) {
    const embedA = new EmbedBuilder()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addFields('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
      .setFooter({ text: 'Moderando Discord', iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('MANAGE_MESSAGES'))
      return message.reply({ embeds: [embedA] })

    const user = message.mentions.users.first();
    const botmessage = args.slice(1).join(' ')

    if (user == null) {
      message.reply('`Faltou você mencionar o usuario`')
    }
    if (botmessage == null) {
      message.reply('`Ops parace que você esqueceu de colocar a mensagem`')
    }
    message.channel.createWebhook(user.username, { avatar: user.displayAvatarURL({ format: 'png' }) }).then(async w => {
      w.send(botmessage);
    })
  }
}