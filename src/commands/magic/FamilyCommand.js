const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class FamiliaCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'familia'
    this.aliases = ['family', 'amigo', 'setfamily', 'familyadd']
    this.category = 'magic'
    this.permissions = ['MANAGE_ROLES']
    this.adminOnly = true
  }

  async run(message, args) {
    const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])
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

    const embed = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['vip'])
      .setDescription(`**👑💎 SEJA BEM VINDO A FAMÍLIA:** ${usuario.user.username}`)
      .setThumbnail(usuario.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addField('**Executor:**', `${message.author}`, true) // inline true
      .addField('**Cargo Recebido:**', `${role}`, true)
      .setImage('https://data.whicdn.com/images/273383424/original.gif')
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))

    if (usuario.roles.cache.has(role)) return message.reply('o membro mencionado já possui esse cargo.')
    usuario.roles.add(role)
    message.channel.send({ embeds: [embed] })

  }
}