const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

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
    const embedA = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${usuario}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_CHANNELS`', true)
        
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
          title: '<:concludinho:1040860364251877427> Novo topico de canal definido',
          description: `O topico do canal: ${canal.name} \nFoi definido Para: ${topico}`
        }
      })
    })

  }
}