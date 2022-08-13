const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')

module.exports = class Familia extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'family'
    this.aliases = ['familia', 'family', 'amigo', 'setfamily', 'familyadd']
    this.category = 'Magic'
    this.adminOnly = true
  }

  async run(message, args) {
    const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const embedA = new EmbedBuilder()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${usuario}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_ROLES`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply({ embeds: [embedA] })
    if (!usuario) return message.reply('Você não mencionou o usuário!');
    if (usuario.id === message.guild.ownerID) {
      message.reply('Você não tem permissão para setar role neste usuário');
      return 0;
    }
    if (usuario.id === this.client.user.id) {
      message.reply('Não posso me setar cargo.');
      return 0;
    }
    const executorRole = message.member.roles.highest;
    const targetRole = usuario.roles.highest;
    if (executorRole.comparePositionTo(targetRole) <= 0 && message.author.id !== message.guild.ownerID) {
      message.reply('Você não tem permissão para setar role neste usuário');
      return 0;
    }
    const clientRole = message.guild.me.roles.highest;
    if (clientRole.comparePositionTo(targetRole) <= 0) {
      message.reply('Você não tem permissão para setar role neste usuário');
      return 0;
    }

    const role = message.guild.roles.cache.find(r => r.id === '832814054623412225');

    const embed = new EmbedBuilder()
      .setTimestamp()
      .setColor(colors['vip'])
      .setDescription(`**👑💎 SEJA BEM VINDO A FAMÍLIA:** ${usuario.user.username}`)
      .setThumbnail(usuario.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addField('**Executor:**', `${message.author}`, true) // inline true
      .addField('**Cargo Recebido:**', `${role}`, true)
      .setImage('https://data.whicdn.com/images/273383424/original.gif')
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (usuario.roles.cache.has(role)) return message.reply('o membro mencionado já possui esse cargo.')
    usuario.roles.add(role)
    message.reply({ embeds: [embed] })

  }
}