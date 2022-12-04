const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class unban extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'unban'
    this.aliases = ['unban', 'desban', 'desbanir', 'appeal']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message, args) {

    const usuario = await this.client.users.fetch(args[0]?.replace(/[<@!>]/g, ''))
    const defina = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Configuração Incompleta (UNBAN):**', `${message.author.username}`, true)
      .setDescription('Configure da forma ensinada abaixo.') // inline false
      .addField('*Uso do comando:*', '`Punishment logs <canal>`', true)
      .addField('*Exemplo:*', '`Punishment logs #geral`', true)

    const embedA = new MessageEmbed()

      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${usuario}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`BAN_MEMBERS`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply({ embeds: [embedA] })

    const channel = await this.client.database.guild.getOrCreate(message.guild.id)
    const log = this.client.channels.cache.get(channel.punishChannel)
    if (!log) message.reply({ embeds: [defina] })

    if (!args[0]) return message.reply(`**${message.author}**,Insira o id do membro para eu desbanir ele.`)

    const embed = new MessageEmbed()

      .setColor('#030303')
      .setTitle('**Ação | Unban**')
      .setThumbnail(usuario.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(`\n<:martelodobem:1041234493744369715> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:martelodobem:1041234493744369715> **Usuário:** ${usuario.username} \n**ID:** ${usuario.id}`)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date());

    message.guild.members.unban(args[0]).then(() => {
      log.send({ embeds: [embed] })
    }).catch(() => {
      message.reply(`**${message.author}** Este usuário não está banido!`)

    })
  }
}
