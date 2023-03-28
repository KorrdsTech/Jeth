const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class softban extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'softban'
    this.aliases = ['softban', 'bansoft']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id) //Db
    if (guildDocument.wantModSysEnable === true) {
      const emptyMessage = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:plus:955577453441597550> **SoftBan:**', `${message.author.username}`, true)
        .setDescription('Este comando faz com que você aplique um banimento e remova-o em seguida, funcionando como um kick que limpa as mensagens dos últimos 7 dias deste usuário.') // inline false
        .addField('*Uso do comando:*', '`softban <@user> <motivo>`', true)
        .addField('*Exemplo:*', '`softban @Solaris#0006 Ban hammer has spoken!`', true)

      const defina = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:plus:955577453441597550> **Configuração Incompleta (SOFTBAN):**', `${message.author.username}`, true)
        .setDescription('Configure da forma ensinada abaixo.') // inline false
        .addField('*Uso do comando:*', '`Punishment logs <canal>`', true)
        .addField('*Exemplo:*', '`Punishment logs #geral`', true)

      const embedPerm = new MessageEmbed()

        .setTimestamp()
        .setColor(colors['mod'])
        .setTitle('**Err:**', true)
        .setDescription('Missing Permissions') // inline false
        .addFields({ name: '*Verifique se você possui o cargo:*', value: `<@&${guildDocument.moderadores}>`, inline: true })
         

      const embedB = new MessageEmbed()

        .setTimestamp()
        .setColor(colors['mod'])
        .setTitle('**Err:**', true)
        .setDescription('Configuração Incompleta')
        .addFields({ name: '*Verifique se você definiu todos os valores necessários corretamente.*', value: '`Cargo de moderador não definido`' })
         

      const channel = await this.client.database.guild.getOrCreate(message.guild.id)
      const log = this.client.channels.cache.get(channel.punishChannel)
      if (!log) message.reply({ embeds: [defina] })
      if (!args[0]) return message.reply({ embeds: [emptyMessage] })

      const cor = '#c635ff'
      const usuario = this.client.users.cache.get(args[0]) || message.mentions.users.first()
      const role = message.guild.roles.cache.get(guildDocument.moderadores)

      if (!guildDocument.moderadores) {
        message.channel.send({ embeds: [embedB] })
        return
      }
      if (!message.member.roles.cache.has(role.id)) {
        message.channel.send({ embeds: [embedPerm] })
        return
      }
      if (message.mentions.users.size < 1) return message.reply('Mencione algum membro')
      if (!usuario.bannable) return message.reply(`:x: **|** Eu não posso punir essa pessoa, talvez o cargo dela seja maior que o meu`)
      let razao = args.slice(1).join(' ')
      if (!razao) razao = 'Sem motivo declarado'

      message.guild.member(usuario).ban({ days: 7 })
      message.guild.unban(usuario)
      const embed = new MessageEmbed()
        .setDescription(`${usuario.username} foi **Suavemente Banido** do servidor por ${message.author}\nMotivo: ${razao} `)
        .setColor(cor)
      log.send({ embeds: [embed] })
    } else if (guildDocument.wantModSysEnable === false) {
      const emptyMessage = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:plus:955577453441597550> **SoftBan:**', `${message.author.username}`, true)
        .setDescription('Este comando faz com que você aplique um banimento e remova-o em seguida, funcionando como um kick que limpa as mensagens dos últimos 7 dias deste usuário.') // inline false
        .addField('*Uso do comando:*', '`softban <@user> <motivo>`', true)
        .addField('*Exemplo:*', '`softban @Solaris#0006 Ban hammer has spoken!`', true)

      const defina = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:plus:955577453441597550> **Configuração Incompleta (SOFTBAN):**', `${message.author.username}`, true)
        .setDescription('Configure da forma ensinada abaixo.') // inline false
        .addField('*Uso do comando:*', '`Punishment logs <canal>`', true)
        .addField('*Exemplo:*', '`Punishment logs #geral`', true)

      const channel = await this.client.database.guild.getOrCreate(message.guild.id)
      const log = this.client.channels.cache.get(channel.punishChannel)
      if (!log) message.reply({ embeds: [defina] })
      if (!args[0]) return message.reply({ embeds: [emptyMessage] })

      const cor = '#c635ff'
      const usuario = this.client.users.cache.get(args[0]) || message.mentions.users.first()
      if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply(':x: **|** Você não tem permissão para executar este comando!')
      if (message.mentions.users.size < 1) return message.reply('Mencione algum membro')
      if (!usuario.bannable) return message.reply(`:x: **|** Eu não posso punir essa pessoa, talvez o cargo dela seja maior que o meu`)
      let razao = args.slice(1).join(' ')
      if (!razao) razao = 'Sem motivo declarado'

      message.guild.member(usuario).ban({ days: 7 })
      message.guild.unban(usuario)
      const embed = new MessageEmbed()
        .setDescription(`${usuario.username} foi **Suavemente Banido** do servidor por ${message.author}\nMotivo: ${razao} `)
        .setColor(cor)
      log.send({ embeds: [embed] })
    }
  }
}