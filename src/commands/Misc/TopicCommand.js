const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')

module.exports = class topico extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'topic'
    this.aliases = ['topico', 'tp', 'st', 'topic']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const embedA = new EmbedBuilder()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${usuario}`, true)
      .setDescription('Missing Permissions') // inline false
      .addFields('*Verifique se você possui a permissão:*', '`MANAGE_CHANNELS`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })
    if (!message.member.permissions.has('MANAGE_CHANNELS'))
      return message.reply({ embeds: [embedA] })
    const topico = args.join(' ')
    if (args.length === 0)
      return message.reply(`Mencione o canal ou escreva uma mensagem para mim definir no tópico do canal.`);
    const canal = message.mentions.channels.first() || message.channel
    canal.setTopic(topico).then(() => {
      message.reply({
        embed: {
          setColor: '#c635ff',
          title: '<:concludo:739830713792331817> Novo topico de canal definido',
          description: `O topico do canal: ${canal.name} \nFoi definido Para: ${topico}`
        }
      })
    })

  }
}