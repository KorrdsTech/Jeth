const { Command, colors } = require('../../utils')
const { Discord } = require('discord.js')
const parse = require('parse-duration')

module.exports = class mute extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'mute'
    this.aliases = ['mute', 'mutech', 'mute']
    this.category = 'Moderação'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

    const time = args[1];

    const erroDePermissão = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor(colors.mod)
      .setTitle('**Err:**', `${member}`, true)
      .setDescription('Missing Permissions')
      .addField('*Verifique se você possui a permissão:*', '`KICK_MEMBERS`', true)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp(new Date());

    const confirmaçãoMutado = new Discord.MessageEmbed()
      .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
      .setTitle('Ação | Mute')
      .setColor('#ff112b')
      .setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Mutado:** ${member.user.username} \n**ID:** ${member.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}` + `\n<:KaelMutado:673592196972412949> **Tempo:** ${time}`)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp(new Date());

    let reason = args.slice(2).join(' ')

    let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');

    if (!message.member.hasPermission('KICK_MEMBERS'))
      return message.channel.send(erroDePermissão)

    if (!member) return message.reply(`Mencione o usuario a ser punido por favor.`)

    if (!time) return message.reply(`Informe o tempo de mute **2m,7d**`)

    if (!reason) {
      reason = `Motivo: Não especificado.`
    }

    if (message.member.roles.highest.position < message.guild.member(member).roles.highest.position) return message.reply(`Você não pode mutar esse usuario.`)

    if (!muteRole) muteRole = await message.guild.roles.create({
      data: {
        name: 'Muted',
        color: '#080808',
        permissions: ['READ_MESSAGES']
      },
      reason: 'Encontrou problemas na configuração do cargo? Reporte o bug imediatamente!',
    }).catch(console.error)

    await message.guild.channels.cache.forEach(channel => {
      channel.updateOverwrite(muteRole, {
        SEND_MESSAGES: false
      })
    });

    if (member.roles.has(muteRole.id)) return message.channel.send('O usuário já se encontra mutado.')

    const Mutado = new this.client.database.mutado({
      _id: member.id,
      server: message.guild.id,
      time: parse(time),
      channel: message.channel.id
    })

    Mutado.save().then(() => {
      message.channel.send(confirmaçãoMutado)
      member.roles.add(muteRole.id)
    })
  }
}