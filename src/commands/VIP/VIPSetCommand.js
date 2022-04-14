const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class vipset extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'vipset'
    this.aliases = ['vipset', 'setvip', 'darvip', 'setarvip']
    this.category = 'VIP'
  }

  async run(message, args) {
    const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    const embedVIP = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${usuario}`, true)
      .setDescription('Missing Action') // inline false
      .addField('*Verifique se você possui um cargo criado ou status de membro:*', '`VIP`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    const role = await this.client.database.cargo.getOrCreate(message.author.id)
    const jeth = this.client.guilds.cache.get('804575416098488380')
    const roleID = jeth.roles.cache.get(role)
    if (!roleID) return message.reply({ embeds: [embedVIP] })

    const embedA = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${usuario}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_ROLES`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply({ embeds: [embedA] })
    if (!usuario) return message.reply('Você não mencionou o usuário!');
    if (usuario.id === message.guild.ownerID) {
      message.reply('Você não tem permissão para setar role neste usuário');
      return 0;
    }
    if (usuario.id === this.client.user.id) {
      message.reply('Não posso me setar vip.');
      return 0;
    }

    const embed = new MessageEmbed()
      .setTimestamp()
      .setColor('#ffbc00')
      .setDescription(`${usuario} **RECEBEU O VIP DE** ${message.author}`)
      .setThumbnail(usuario.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addField('**VIP Adicionado:**', `${roleID}`, true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (usuario.roles.cache.has(roleID)) return message.reply('O membro mencionado já possui esse VIP.')
    usuario.roles.add(roleID)
    message.reply({ embeds: [embed] })
  }
}