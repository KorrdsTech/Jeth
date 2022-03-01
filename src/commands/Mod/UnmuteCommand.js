const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class unmute extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'unmute'
    this.aliases = ['unmute', 'desmute', 'retirarmute', 'desmutar']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    const embedA = new Discord.MessageEmbed()

      .setTimestamp()
      .setColor(colors.mod)
      .setTitle('**Err:**', `${member}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`KICK_MEMBERS`', true)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
    if (!message.member.permissions.has('KICK_MEMBERS'))
      return message.channel.send({ embeds: [embedA] })

    if (!member) return message.reply(`Mencione alguém por favor.`)
    let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
    if (!muteRole) muteRole = await message.guild.roles.create({
      data: {
        name: 'Muted',
        color: '#080808',
        permissions: ['READ_MESSAGES']
      },
      reason: 'Encontrou problemas na configuração do cargo? Reporte o bug imediatamente!',
    }).catch(console.error)

    await message.member.roles.add(muteRole).catch(() => { })
    await message.guild.channels.cache.forEach(channel => {
      channel.updateOverwrite(muteRole, {
        SEND_MESSAGES: false
      })
    });

    let reason = args.slice(1).join(' ')
    if (!reason) {
      reason = `Motivo: Sem-Motivo`
    }

    message.guild.member(member).roles.remove(muteRole.id).then(async () => {
      message.channel.send(`${member} foi **desmutado** por ${message.author}`)
      await this.client.database.mutado.getAndDelete(member.id)
    })
      .catch(err => console.log('Algo deu errado: '+ err))
  }
}