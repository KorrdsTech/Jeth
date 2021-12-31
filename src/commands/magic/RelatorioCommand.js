const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class RelatorioCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'relatorio'
    this.aliases = ['rel']
    this.category = 'magic'
    this.adminOnly = false
  }

  async run(message, args) {
    const rel = args.slice(0).join(' ')
    const role = message.guild.roles.cache.get('831041495326261278')
    if (!message.member.roles.cache.get(role.id)) message.channel.send('Forbiden Acess!')
    if (!rel) message.reply('<:1658partnerwaitapproval:832746524416802888> Esqueceu de colocar o conteúdo do seu relatório!')
    const embed = new MessageEmbed()
      .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
      .setAuthor(`${message.author.username} Enviou seu relatório`, message.author.avatarURL({ dynamic: true, size: 1024 }))
      .setColor(colors['mod'])
      .setDescription(`${rel}`)
      .setFooter('☕️・https://discordapp.com/guidelines', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp(new Date());
    await this.client.channels.cache.get('831041531930476593').send({ embeds: [embed] })
  }
}