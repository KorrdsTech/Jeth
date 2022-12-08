const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class kick extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'kick'
    this.aliases = ['kick', 'kickar', 'expulsar']
    this.category = 'Mod'
  }

  async run(message, args) {
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id) //Db
    if (guildDocument.wantModSysEnable === true) {
      const emptyMessage = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:plus:955577453441597550> **Kick:**', `${message.author.username}`, true)
        .setDescription('Como o próprio nome já diz a função deste comando é de chutar um usuário do seu servidor em alto estilo.') // inline false
        .addField('*Uso do comando:*', '`kick <@user> <motivo>`', true)
        .addField('*Exemplo:*', '`kick @Solaris#0006 Get a kick in the ... !`', true)

      const rolesHighest = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:reinterjection:955577574304657508> **Kick:**', `${message.author.username}`, true)
        .setDescription('Você não pode executar um timeout neste usuário pois o cargo dele é maior ou equivalente ao seu e ou o meu.') // inline false

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

      if (!args[0]) return message.reply({ embeds: [emptyMessage] })
      // code dm do kickado
      const razao13 = args.slice(1).join(' ');
      const warnembed18 = new MessageEmbed()

        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
        .setTitle(`${message.author}`)
        .setDescription(`🚫 Você foi expulso do servidor ${message.guild.name}`)
        .setColor('#ff0000')
        .addField('👮 **Staffer:**', `${message.author}`)
        .addField('✏️ Motivo:', `${razao13}`)
        .setFooter({ text: 'Se você acha que a punição foi aplicada incorretamente, recorra ao staffer! 🥶' })
        .setImage('https://media1.tenor.com/images/4c906e41166d0d154317eda78cae957a/tenor.gif?itemid=12646581')
        .setTimestamp(new Date());

      const defina = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:plus:955577453441597550> **Configuração Incompleta (KICK):**', `${message.author.username}`, true)
        .setDescription('Configure da forma ensinada abaixo.') // inline false
        .addField('*Uso do comando:*', '`Punishment logs <canal>`', true)
        .addField('*Exemplo:*', '`Punishment logs #geral`', true)

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
      const membro18 = await message.guild.members.fetch(args[0]?.replace(/[<@!>]/g, ''))
      if (!membro18) return message.reply('eu procurei, procurei, e não achei este usuário')
      if (razao13.length < 1) return message.reply('`Adicione um motivo válido!`')

      const executorRole = message.member.roles.highest;
      const targetRole = membro18.roles.highest;
      if (executorRole.comparePositionTo(targetRole) <= 0 && message.guild.me !== message.author.id !== message.guild.ownerID) {
        return message.reply({ embeds: [rolesHighest] });
      }

      const warnembed13 = new MessageEmbed()

        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setTitle('Ação | Kick')
        .setColor('#ff112b')
        .setDescription(`\n<:martelodobem:1041234493744369715> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:martelodobem:1041234493744369715> **Kickado:** ${membro18.username} \n**ID:** ${membro18.id}` + `\n<:peeencil:1040822681379024946> **Motivo:** ${razao13}`)
        .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
        .setTimestamp(new Date());

      const punido = new MessageEmbed()
        .setColor(colors['lightblue'])
        .setDescription(`<:martelodobem:1041234493744369715> ${membro18} foi kickado com sucesso!`)

      message.channel.send({ embeds: [punido] })
      log.send(warnembed13);
      membro18.send({ embeds: [warnembed18] });
      await message.guild.member(membro18).kick(razao13)
    } else if (guildDocument.wantModSysEnable === false) {
      const emptyMessage = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:plus:955577453441597550> **Kick:**', `${message.author.username}`, true)
        .setDescription('Como o próprio nome já diz a função deste comando é de chutar um usuário do seu servidor em alto estilo.') // inline false
        .addField('*Uso do comando:*', '`kick <@user> <motivo>`', true)
        .addField('*Exemplo:*', '`kick @Solaris#0006 Get a kick in the ... !`', true)

      const rolesHighest = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:reinterjection:955577574304657508> **Kick:**', `${message.author.username}`, true)
        .setDescription('Você não pode executar um timeout neste usuário pois o cargo dele é maior ou equivalente ao seu e ou o meu.') // inline false

      if (!args[0]) return message.reply({ embeds: [emptyMessage] })
      // code dm do kickado
      const razao13 = args.slice(1).join(' ');
      const warnembed18 = new MessageEmbed()

        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
        .setTitle(`${message.author}`)
        .setDescription(`🚫 Você foi expulso do servidor ${message.guild.name}`)
        .setColor('#ff0000')
        .addField('👮 **Staffer:**', `${message.author}`)
        .addField('✏️ Motivo:', `${razao13}`)
        .setFooter({ text: 'Se você acha que a punição foi aplicada incorretamente, recorra ao staffer! 🥶' })
        .setImage('https://media1.tenor.com/images/4c906e41166d0d154317eda78cae957a/tenor.gif?itemid=12646581')
        .setTimestamp(new Date());

      const defina = new MessageEmbed()
        .setColor(colors['mod'])
        .setTitle('<:plus:955577453441597550> **Configuração Incompleta (KICK):**', `${message.author.username}`, true)
        .setDescription('Configure da forma ensinada abaixo.') // inline false
        .addField('*Uso do comando:*', '`Punishment logs <canal>`', true)
        .addField('*Exemplo:*', '`Punishment logs #geral`', true)

      const embedA = new MessageEmbed()

        .setTimestamp()
        .setColor(colors['mod'])
        .setTitle('**Err:**', true)
        .setDescription('Missing Permissions') // inline false
        .addField('*Verifique se você possui a permissão:*', '`KICK_MEMBERS`', true)
        .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

      if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply({ embeds: [embedA] })

      const channel = await this.client.database.guild.getOrCreate(message.guild.id)
      const log = this.client.channels.cache.get(channel.punishChannel)
      if (!log) message.reply({ embeds: [defina] })
      const membro18 = await message.guild.members.fetch(args[0]?.replace(/[<@!>]/g, ''))
      if (!membro18) return message.reply('eu procurei, procurei, e não achei este usuário')
      if (razao13.length < 1) return message.reply('`Adicione um motivo válido!`')

      const executorRole = message.member.roles.highest;
      const targetRole = membro18.roles.highest;
      if (executorRole.comparePositionTo(targetRole) <= 0 && message.guild.me !== message.author.id !== message.guild.ownerID) {
        return message.reply({ embeds: [rolesHighest] });
      }

      const warnembed13 = new MessageEmbed()

        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setTitle('Ação | Kick')
        .setColor('#ff112b')
        .setDescription(`\n<:martelodobem:1041234493744369715> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:martelodobem:1041234493744369715> **Kickado:** ${membro18.username} \n**ID:** ${membro18.id}` + `\n<:peeencil:1040822681379024946> **Motivo:** ${razao13}`)
        .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
        .setTimestamp(new Date());

      log.send(warnembed13);
      membro18.send({ embeds: [warnembed18] });
      await message.guild.member(membro18).kick(razao13)
    }
  }
};
