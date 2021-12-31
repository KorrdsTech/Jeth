const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class TopicCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'topico'
    this.aliases = ['tp', 'st', 'topic']
    this.category = 'misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const embedA = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${usuario}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_CHANNELS`', true)
      .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
    if (!message.member.permissions.has('MANAGE_CHANNELS'))
      return message.channel.send({ embeds: [embedA] })
    const topico = args.join(' ')
    if (args.length === 0)
      return message.reply(`Mencione o canal ou escreva uma mensagem para mim definir no tópico do canal.`);
    const canal = message.mentions.channels.first() || message.channel
    canal.setTopic(topico).then(() => {
      message.channel.send({
        embed: {
          setColor: '#c635ff',
          title: '<:concludo:739830713792331817> Novo topico de canal definido',
          description: `O topico do canal: ${canal.name} \nFoi definido Para: ${topico}`
        }
      })
    })

  }
}