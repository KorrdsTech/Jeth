const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class fake extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'fake'
    this.aliases = ['fake']
    this.category = 'Fun'
  }

  async run(message, args) {
    const embedA = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addFields({ name: '*Verifique se você possui a permissão:*', value: '`MANAGE_MESSAGES`'}, true)

    if (!message.member.permissions.has('MANAGE_MESSAGES'))
      return message.reply({ embeds: [embedA] })

    const user = message.mentions.users.first();
    const botmessage = args.slice(1).join(' ')

    if (args == null) {
      return message.reply('`Faltou você adicionar alguma mensagem`')
    }
    if (user == null) {
      return message.reply('`Faltou você mencionar o usuario`')
    }
    if (botmessage == null) {
      return message.reply('`Ops parace que você esqueceu de colocar a mensagem`')
    }
    message.channel.createWebhook(user.username, { avatar: user.displayAvatarURL({ format: 'png' }) }).then(async w => {
      w.send(botmessage);
    })
  }
}