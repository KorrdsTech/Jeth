const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class topico extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = ['tp', 'st', 'topic']
    this.category = 'Miscellaneous'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const embedA = new MessageEmbed()
      .setTimestamp()
      .setColor(colors.mod)
      .setTitle('**Err:**', `${usuario}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_CHANNELS`', true)
      .setFooter('Jeth | Developers', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
    if (!message.member.hasPermission('MANAGE_CHANNELS'))
      return message.channel.send(embedA)
    let topico = args.join(" ")
    if (args.length === 0)
      return message.reply(`Mencione o canal ou escreva uma mensagem para mim definir no tópico do canal.`);
    let canal = message.mentions.channels.first() || message.channel
    canal.setTopic(topico).then(() => {
      message.channel.send({
        embed: {
          setColor: '#c635ff',
          title: "<:concludo:739830713792331817> Novo topico de canal definido",
          description: `O topico do canal: ${canal.name} \nFoi definido Para: ${topico}`
        }
      })
    })

  }
}