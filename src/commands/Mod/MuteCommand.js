const { Command, colors } = require('../../utils')
const { MessageEmbed, PermissionsBitField } = require('discord.js')
const parse = require('parse-duration')

module.exports = class mute extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = ['mutech', 'mute']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id) //Db
    if (guildDocument.wantModSysEnable === true) {
      const role = message.guild.roles.cache.get(guildDocument.moderadores)

      const embedPerm = new MessageEmbed()

        .setTimestamp()
        .setColor(colors['mod'])
        .setTitle('**Err:**', true)
        .setDescription('Missing Permissions') // inline false
        .addFields({ name: '*Verifique se você possui o cargo:*', value: `<@&${guildDocument.moderadores}>`, inline: true })
        .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

      const embedB = new MessageEmbed()

        .setTimestamp()
        .setColor(colors['mod'])
        .setTitle('**Err:**', true)
        .setDescription('Configuração Incompleta')
        .addFields({ name: '*Verifique se você definiu todos os valores necessários corretamente.*', value: '`Cargo de moderador não definido`' })
        .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

      if (!guildDocument.moderadores) {
        message.channel.send({ embeds: [embedB] })
        return
      }

      if (!message.member.roles.cache.has(role.id)) {
        message.channel.send({ embeds: [embedPerm] })
        return
      }

      const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

      if (!member) return message.reply(`Mencione o usuario a ser punido por favor.`)
      const time = args[1];
      if (!time) return message.reply(`Informe o tempo de mute **2m,7d**`)
      let reason = args.slice(2).join(' ')
      if (!reason) {
        reason = `Motivo: Não especificado.`
      }
      let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
      if (!muteRole) muteRole = await message.guild.roles.create({
        data: {
          name: 'Muted',
          color: '#080808',
          permissions: [PermissionsBitField?.Flags.ViewChannel]
        },
        reason: 'Encontrou problemas na configuração do cargo? Reporte o bug imediatamente!',
      }).catch(console.error)

      await message.guild.channels.cache.forEach(channel => {
        channel.permissionOverwrites?.create(muteRole, {
          SEND_MESSAGES: false
        })
      });

      if (message.member.roles.highest.position < member.roles.highest.position) return message.reply(`Você não pode mutar esse usuario.`)

      const embed = new MessageEmbed()

        .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
        .setTitle('Ação | Mute')
        .setColor('#ff112b')
        .setDescription(`\n<:martelodobem:1041234493744369715> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:martelodobem:1041234493744369715> **Usuário:** ${member.user.username} \n**ID:** ${member.id}` + `\n<:peeencil:1040822681379024946> **Motivo:** ${reason}` + `\n<:clock:963208373363429428> **Tempo:** ${time}`)
        .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
        .setTimestamp(new Date());

      const isMutado = await this.client.database.Mutados?.getOrCreate(member.user.id);

      if (!isMutado) {
        const Mutado = new this.client.database.Mutados({
          _id: member.id,
          server: message.guild.id,
          time: parse(time),
          channel: message.channel.id
        })

        Mutado.save()
          .then(() => message.channel.send(embed))
        member.roles.add(muteRole.id)
      } else {
        message.channel.send(embed)
        member.roles.add(muteRole.id)
      }
    } else if (guildDocument.wantModSysEnable === false) {

      const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
      const embedA = new MessageEmbed()

        .setTimestamp()
        .setColor(colors.mod)
        .setTitle('**Err:**', `${member}`, true)
        .setDescription('Missing Permissions') // inline false
        .addField('*Verifique se você possui a permissão:*', '`MUTE_MEMBERS`', true)
        .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      if (!message.member.permissions.has('MUTE_MEMBERS'))
        return message.channel.send(embedA)
      if (!member) return message.reply(`Mencione o usuario a ser punido por favor.`)
      const time = args[1];
      if (!time) return message.reply(`Informe o tempo de mute **2m,7d**`)
      let reason = args.slice(2).join(' ')
      if (!reason) {
        reason = `Motivo: Não especificado.`
      }
      let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
      if (!muteRole) muteRole = await message.guild.roles.create({
        data: {
          name: 'Muted',
          color: '#080808',
        // eslint-disable-next-line no-undef
          permissions: [PermissionsBitField?.Flags.ViewChannel]
        },
        reason: 'Encontrou problemas na configuração do cargo? Reporte o bug imediatamente!',
      }).catch(console.error)

      await message.guild.channels.cache.forEach(channel => {
        channel.permissionOverwrites?.create(muteRole, {
          SEND_MESSAGES: false
        })
      });

      if (message.member.roles.highest.position < member.roles.highest.position) return message.reply(`Você não pode mutar esse usuario.`)

      const embed = new MessageEmbed()

        .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
        .setTitle('Ação | Mute')
        .setColor('#ff112b')
        .setDescription(`\n<:martelodobem:1041234493744369715> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:martelodobem:1041234493744369715> **Usuário:** ${member.user.username} \n**ID:** ${member.id}` + `\n<:peeencil:1040822681379024946> **Motivo:** ${reason}` + `\n<:clock:963208373363429428> **Tempo:** ${time}`)
        .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
        .setTimestamp(new Date());

      const isMutado = await this.client.database.Mutados?.getOrCreate(member.user.id);

      if (!isMutado) {
        const Mutado = new this.client.database.Mutados({
          _id: member.id,
          server: message.guild.id,
          time: parse(time),
          channel: message.channel.id
        })

        Mutado.save()
          .then(() => message.channel.send(embed))
        member.roles.add(muteRole.id)
      } else {
        message.channel.send(embed)
        member.roles.add(muteRole.id)
      }
    }
  }
}