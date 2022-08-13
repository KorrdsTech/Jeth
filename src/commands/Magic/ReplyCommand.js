const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')

module.exports = class reply extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'reply'
    this.aliases = ['reply']
    this.category = 'Magic'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const ids = ['753778869013577739', '395788326835322882'];

    const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    const embedA = new EmbedBuilder()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${usuario}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`Jeth_OWNER`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })

    if (!ids.includes(message.author.id))

      return message.reply({ embeds: [embedA] });

    const razao13 = args.slice(1).join(' ');
    if (!razao13) return message.reply('Faltando argumentos')

    const embedB = new EmbedBuilder()
      .setTimestamp()
      .setColor(colors['default'])
      .setTitle('**Ticket Reply:**', `${usuario}`, true)
      .setDescription('Você recebeu resposta à algum ticket aberto dentro de nosso suporte, pode ser por ter pedido ajuda, por ter dado alguma sugestão e outros.') // inline false
      .addField('<:b_information:742270909259317278> Resposta:', razao13, true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })

    usuario.send({ embeds: [embedB] })
    if (!Error) {
      return message.reply('<:rejected:739831089543118890> Erro, usuário com Direct Message Bloqueada!');
    } else
      message.reply('<:concludo:739830713792331817> Reply enviado com sucesso! 🗳')
  }
}
