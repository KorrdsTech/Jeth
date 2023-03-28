const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const modelWarn = require('../../utils/database/collections/Warn');
const moment = require('moment')
moment.locale('pt-br')

module.exports = class Warn extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'warn'
    this.aliases = ['warn', 'aviso', 'advertencia', 'punir']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id) //Db
    if (guildDocument.wantModSysEnable === true) {
      const defina = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:plus:955577453441597550> **Configuração Incompleta (BAN):**', `${message.author.username}`, true)
        .setDescription('Configure da forma ensinada abaixo.') // inline false
        .addField('*Uso do comando:*', '`Punishment logs <canal>`', true)
        .addField('*Exemplo:*', '`Punishment logs #geral`', true)

      const emptyMessage = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:plus:955577453441597550> **Warn:**', `${message.author.username}`, true)
        .setDescription('Com este comando você irá emitir um aviso que ficará salvo para o usuário, caso o usuário já tenha um aviso prévio ele será subistituído pelo aviso mais recente, portanto certifique-se de verificar se o usuário já tem um aviso salvo utilizando o comando **history**.') // inline false
        .addField('*Uso do comando:*', '`warn <@user> <motivo>`', true)
        .addField('*Exemplo:*', '`warn @Solaris#0006 Not listen to the rules of this academy!`', true)

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
         

      const role = message.guild.roles.cache.get(guildDocument.moderadores)

      if (!guildDocument.moderadores) {
        message.channel.send({ embeds: [embedB] })
        return
      }
      if (!message.member.roles.cache.has(role.id)) {
        message.channel.send({ embeds: [embedPerm] })
        return
      }

      const channel = await this.client.database.guild.getOrCreate(message.guild.id)
      const log = this.client.channels.cache.get(channel.punishChannel)
      if (!log) message.reply({ embeds: [defina] })
      if (!args[0]) return message.reply({ embeds: [emptyMessage] })

      const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

      if (!usuario) {
        return message.reply(`<:reinterjection:955577574304657508> » Mencione um usuário valido.`)
      }

      const motivo = args.slice(1).join(' ') || 'Não especificado.'

      let documentWarn = await modelWarn.findOne({
        guildID: message.guild.id,
        memberID: usuario.id,
      }).catch(err => console.log(err))

      if (!documentWarn) {
        documentWarn = new modelWarn({
          guildID: message.guild.id,
          memberID: usuario.id,
          warnings: [motivo],
          staff: [message.member.id],
          date: [Date.now()],
        })

        await documentWarn.save().catch(err => console.log(err))
      }

      else {
        if (documentWarn.warnings.length >= 3) {
          return message.reply(`<:reinterjection:955577574304657508> » Este usuário possui mais de 3 avisos recomendamos fortemente procurar outro método para lidar com esta situação específica.`)
        }

        documentWarn.warnings.push(motivo)
        documentWarn.staff.push(message.member.id)
        documentWarn.date.push(Date.now())

        await documentWarn.save().catch(err => console.log(err))
      }

      const warnembed = new MessageEmbed()
        .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
        .setTitle('Ação | Aviso')
        .setColor(colors['mod'])
        .setDescription(`\n<:martelodobem:1041234493744369715> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:martelodobem:1041234493744369715> **Advertido:** ${usuario.user.username} \n**ID:** ${usuario.id}` + `\n<:peeencil:1040822681379024946> **Motivo:** ${motivo}`)
         
        .setTimestamp();

      const punido = new MessageEmbed()
        .setColor(colors['mod'])
        .setDescription(`\n<:martelodobem:1041234493744369715> ${usuario} recebeu o aviso com sucesso!`)

      log.send({ embeds: [warnembed] })
      message.channel.send({ embeds: [punido] })
    } else if (guildDocument.wantModSysEnable === false) {
      const defina = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:plus:955577453441597550> **Configuração Incompleta (BAN):**', `${message.author.username}`, true)
        .setDescription('Configure da forma ensinada abaixo.') // inline false
        .addField('*Uso do comando:*', '`Punishment logs <canal>`', true)
        .addField('*Exemplo:*', '`Punishment logs #geral`', true)

      const emptyMessage = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:plus:955577453441597550> **Warn:**', `${message.author.username}`, true)
        .setDescription('Com este comando você irá emitir um aviso que ficará salvo para o usuário, caso o usuário já tenha um aviso prévio ele será subistituído pelo aviso mais recente, portanto certifique-se de verificar se o usuário já tem um aviso salvo utilizando o comando **history**.') // inline false
        .addField('*Uso do comando:*', '`warn <@user> <motivo>`', true)
        .addField('*Exemplo:*', '`warn @Solaris#0006 Not listen to the rules of this academy!`', true)

      const channel = await this.client.database.guild.getOrCreate(message.guild.id)
      const log = this.client.channels.cache.get(channel.punishChannel)
      if (!log) message.reply({ embeds: [defina] })
      if (!args[0]) return message.reply({ embeds: [emptyMessage] })

      const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

      if (!usuario) {
        return message.reply(`<:reinterjection:955577574304657508> » Mencione um usuário valido.`)
      }

      const motivo = args.slice(1).join(' ') || 'Não especificado.'

      let documentWarn = await modelWarn.findOne({
        guildID: message.guild.id,
        memberID: usuario.id,
      }).catch(err => console.log(err))

      if (!documentWarn) {
        documentWarn = new modelWarn({
          guildID: message.guild.id,
          memberID: usuario.id,
          warnings: [motivo],
          staff: [message.member.id],
          date: [Date.now()],
        })

        await documentWarn.save().catch(err => console.log(err))
      }

      else {
        if (documentWarn.warnings.length >= 3) {
          return message.reply(`<:reinterjection:955577574304657508> » Este usuário possui mais de 3 avisos recomendamos fortemente procurar outro método para lidar com esta situação específica.`)
        }

        documentWarn.warnings.push(motivo)
        documentWarn.staff.push(message.member.id)
        documentWarn.date.push(Date.now())

        await documentWarn.save().catch(err => console.log(err))
      }

      const warnembed = new MessageEmbed()
        .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
        .setTitle('Ação | Aviso')
        .setColor(colors['mod'])
        .setDescription(`\n<:martelodobem:1041234493744369715> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:martelodobem:1041234493744369715> **Advertido:** ${usuario.user.username} \n**ID:** ${usuario.id}` + `\n<:peeencil:1040822681379024946> **Motivo:** ${motivo}`)
         
        .setTimestamp();

      const punido = new MessageEmbed()
        .setColor(colors['lightblue'])
        .setDescription(`<:martelodobem:1041234493744369715> ${usuario} recebeu o aviso com sucesso!`)

      message.channel.send({ embeds: [punido] })
      log.send({ embeds: [warnembed] })
    }
  }
}