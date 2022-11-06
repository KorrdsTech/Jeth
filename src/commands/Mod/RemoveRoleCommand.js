const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class retcargo extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'removerole'
    this.aliases = ['retcargo', 'removercargo', 'cargoremove', 'removecargo']
    this.category = 'Mod'
  }

  async run(message, args) {

    const emptyMessage = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **RemoveRole:**', `${message.author.username}`, true)
      .setDescription('Criado para facilitar o modo em que os cargos são retirados de um usuário.') // inline false
      .addField('*Uso do comando:*', '`removerole <@user> <@role>`', true)
      .addField('*Exemplo:*', '`removerole @Solaris#0006 @Admin`', true)

    if (!args[0]) return message.reply({ embeds: [emptyMessage] })

    const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const cargo_nome = message.mentions.roles.first() || message.mentions.roles.cache.get(args[1])
    const embedA = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${usuario}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_ROLES`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    const defina = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Configuração Incompleta (BAN):**', `${message.author.username}`, true)
      .setDescription('Configure da forma ensinada abaixo.') // inline false
      .addField('*Uso do comando:*', '`PunishmentLogs set <canal>`', true)
      .addField('*Exemplo:*', '`PunishmentLogs set #geral`', true)

    const channel = await this.client.database.guild.getOrCreate(message.guild.id)
    const log = this.client.channels.cache.get(channel.punishChannel)
    if (!log) message.reply({ embeds: [defina] })
    if (!message.member.permissions.has('MANAGE_ROLES'))
      return message.reply({ embeds: [embedA] })
    if (!usuario) return message.reply('`Você não mencionou o usuário!`');
    if (usuario.id === message.guild.ownerID) {
      message.reply('Você não tem permissão para remover role deste usuário');
      return 0;
    }
    if (usuario.id === this.client.user.id) {
      message.reply('Não posso me remover cargo.');
      return 0;
    }
    const executorRole = message.member.roles.highest;
    const targetRole = usuario.roles.highest;
    if (executorRole.comparePositionTo(targetRole) <= 0 && message.author.id !== message.guild.ownerID) {
      message.reply('Você não tem permissão para remover role deste usuário');
      return 0;
    }

    // const embedC = new MessageEmbed()
    // .setTimestamp()
    // .setColor(colors['mod'])
    // .setTitle('**Err:**', true)
    // .setDescription('Missing Permissions') // inline false
    // .addField('*Verifique se meus cargos estão acima do usuário:*', '`ROLES_COMPARSION`', true)
    // .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))

    // let clientRole = message.guild.me.roles.highest;
    // if (clientRole.comparePositionTo(targetRole) <= 0) {
    //     message.reply({ embeds: [embedA] });
    //     return 0;
    // }

    if (!cargo_nome) return message.reply('`Você não colocou um cargo valido!`');

    const embed = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['default'])
      .setDescription(`**CARGO REMOVIDO DO USUÁRIO:** ${usuario.user.username}`)
      .setThumbnail(usuario.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addField('**Staffer:**', `${message.author}`, true) // inline true
      .addField('**Cargo Removido:**', `${cargo_nome}`, true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    usuario.roles.remove(cargo_nome)
    log.send({ embeds: [embed] })
  }
}