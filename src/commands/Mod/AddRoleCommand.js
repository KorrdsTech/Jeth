const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class setcargo extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'addrole'
    this.aliases = ['setcargo', 'setar-cargo', 'cargoadd']
    this.category = 'Mod'
  }

  async run(message, args) {
    const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const cargo_nome = message.mentions.roles.first()

    const embedA = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('**AddRole:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_ROLES`', true)

    const rolesHighest = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('<:reinterjection:955577574304657508> **AddRole:**', `${message.author.username}`, true)
      .setDescription('Você não pode adicionar uma role neste usuário pois o cargo dele é maior ou equivalente ao seu e ou o meu.') // inline false

    const permErr = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**AddRole:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se eu possuo a permissão:*', '`MANAGE_ROLES`', true)

    const emptyMessage = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **AddRole:**', `${message.author.username}`, true)
      .setDescription('Criado para facilitar a distribuição de cargos dentro de um servidor.') // inline false
      .addField('*Uso do comando:*', '`AddRole <@user> <cargo>`', true)
      .addField('*Exemplo:*', '`AddRole @Solaris#0006 @Admin`', true)

    if (!args[1]) return message.reply({ embeds: [emptyMessage] });
    if (!message.guild.me.permissions.has('MANAGE_ROLES')) return message.reply({ embeds: [permErr] });
    if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply({ embeds: [embedA] })
    if (!usuario) return message.reply('Você não mencionou o usuário!');
    if (!cargo_nome) return message.reply('Você não colocou um cargo valido!');
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
      message.reply({ embeds: [rolesHighest] });
      return 0;
    }

    const embed = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['default'])
      .setDescription(`**CARGO ADICIONADO PARA O USUÁRIO:** ${usuario.user.username}`)
      .setThumbnail(usuario.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addField('**Staffer:**', `${message.author}`, true) // inline true
      .addField('**Cargo Adicionado:**', `${cargo_nome}`, true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (usuario.roles.cache.has(cargo_nome)) return message.reply('o membro mencionado já possui esse cargo.')
    usuario.roles.add(cargo_nome)
    message.reply({ embeds: [embed] })

  }
}