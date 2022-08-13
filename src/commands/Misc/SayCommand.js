const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')

module.exports = class Say extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'say'
    this.aliases = ['say']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const embedA = new EmbedBuilder()

      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addFields('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })
    if (!message.member.permissions.has('MANAGE_MESSAGES'))
      return message.reply({ embeds: [embedA] })
    const mensagem = args.join(' ')
    if (!args[0]) message.reply('Insira algum conteúdo a ser enviado')
    message.reply(`${mensagem} \n\n<:9461systemmessageuser:832746852633149460> *Mensagem executada por: ${message.author}*`)
  }
}