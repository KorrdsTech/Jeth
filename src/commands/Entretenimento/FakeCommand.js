const { Command, colors } = require('../../utils')
const Discord = require('discord.js');

module.exports = class fake extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'fake'
    this.aliases = ['fake']
    this.category = 'Entretenimento'
  }

  async run(message, args) {
    const embedA = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor(colors.mod)
      .setTitle('**Err:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
      .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
    if (!message.member.hasPermission('MANAGE_MESSAGES'))

      return message.channel.send(embedA)
    const user = message.mentions.users.first();
    const botmessage = args.slice(1).join(' ')
    if (user == null) {
      message.channel.send('`Faltou você mencionar o usuario`')
    }
    if (botmessage == null) {
      message.channel.send('`Ops parace que você esqueceu de colocar a mensagem`')
    }
    message.channel.createWebhook(user.username, { avatar: user.displayAvatarURL({ format: 'png' }) }).then(async w => {
      w.send(botmessage);
    })

  }

}