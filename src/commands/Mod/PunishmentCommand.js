const { Command, colors } = require('../../utils')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
module.exports = class Punishment extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'Punishment'
    this.aliases = ['punicoes', 'punições', 'punishment']
    this.category = 'Mod'
  }

  //𝘕𝘓 Guilhermee ⁷#6580
  async run(message, args) {
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)

    const row = new MessageActionRow()
      .addComponents(

        new MessageButton()
          .setCustomId('categoria_utilidades')
          .setStyle('SECONDARY')
          .setLabel('◀')
          .setEmoji(``) // por um emoji do seu gosto
          .setDisabled(false),
        new MessageButton()
          .setCustomId('categoria_moderação')
          .setStyle('SECONDARY')
          .setLabel('▶')
          .setEmoji(``) // por um emoji do seu gosto
          .setDisabled(false),
        new MessageButton()
          .setCustomId('fechar')
          .setStyle('DANGER')
          .setLabel('Fechar Painel')
          .setEmoji(``) // por um emoji do seu gosto
          .setDisabled(false)
      )

    const Painel = new MessageEmbed()
      .setColor(colors['default'])
      .setThumbnail('https://cdn.discordapp.com/emojis/938280523388842014.webp?size=96&quality=lossless')
      .setTitle('<:plus:955577453441597550> **Utilidades Punitivas:**', `${message.author.username}`, true)
      .setDescription('Criado para facilitar o gerenciamento de dados da database em seu servidor, facilitando a forma de utilizar os comandos.') // inline false
      .addField('*Define onde as logs de punições serão enviadas:*', `${guildDocument.prefix}*Punishment logs <#canal>*\n**Exemplo:** ${guildDocument.prefix}*Punishment logs #geral*`, false)
      .addField('*Remove canal de logs das punições:*', `${guildDocument.prefix}*Punishment remove <#canal>*`, false)
      .addField('**CONTROLE DE PUNIÇÕES AVANÇADO**', '\nEste módulo permite que opções de escolha como se o controle de banimentos por cargo possam ser acessados.', false)
      .addField('*Definir cargo de moderadores:*', `${guildDocument.prefix}*Punishment mods <@cargo>*\n**Exemplo:** ${guildDocument.prefix}*Punishment mods @moderador*`, false)
      .addField('*Ativar sistema de controle avançado:*', `${guildDocument.prefix}*Punishment ativar*`, false)
      .addField('*Desativar sistema de controle avançado:*', `${guildDocument.prefix}*Punishment desativar*`, false)
      .addField('*Adicionar um usuário na isenção de punição do módulo anti-div:*', `${guildDocument.prefix}*Punishment exemptUser <@user>*\n**Exemplo:** ${guildDocument.prefix}*Punishment exemptUser @Solaris#0006*`, false)
      .addField('*Remover um usuário na isenção de punição do módulo anti-div:*', `${guildDocument.prefix}*Punishment removeExemptUser <@user>*\n**Exemplo:** ${guildDocument.prefix}*Punishment removeExemptUser @Solaris#0006*`, false)

    const embedA = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_GUILD`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply({ embeds: [embedA] })

    if (args[0] === 'logs') {
      const channel = message.guild.channels.cache.find(c => c.name === args.slice(1).join(' ')) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
      if (!channel || channel.type === 'category') return message.reply('Coloque um canal válido!')
      guildDocument.punishChannel = channel.id
      guildDocument.save()
      message.reply('Canal definido com sucesso!')
      return (0);
    } else if (args[0] === 'remove') {
      guildDocument.punishChannel = ''
      guildDocument.save()
      message.reply('Canal removido com sucesso!')
      return (0);
    } else if (args[0] === 'mods') {
      const cargos = message.guild.roles.cache.find(r => r.name === args.slice(1).join(' ')) || message.guild.roles.cache.get(args[1]) || message.mentions.roles.first()
      if (!cargos) return message.reply('Por favor coloque um cargo valido!')
      guildDocument.moderadores = cargos.id
      guildDocument.save()
      message.reply('Cargo definido com sucesso!')
      return (0);
    } else if (args[0] === 'ativar') {
      guildDocument.wantModSysEnable = true
      guildDocument.save()
      message.reply('Sistema de moderação avançado ativado com sucesso.')
      return (0);
    } else if (args[0] === 'desativar') {
      guildDocument.wantModSysEnable = false
      guildDocument.save()
      message.reply('Sistema de moderação avançado desativado com sucesso.')
      return (0);
    } else if (args[0] === 'exemptUser') {
      const exempt = new MessageEmbed()
        .setColor(colors['mod'])
        .setDescription(`<:martelodobem:1041234493744369715> Você não mencionou o usuário para ser adicionado na lista de isenção`)

      const usuário = await message.guild.members.cache.get(args[1]?.replace(/[<@!>]/g, ''))
      if (!usuário) return message.channel.send({ embeds: [exempt] })
      const userData = await this.client.database.user.getOrCreate(usuário.id)
      userData.exemptUser = true
      userData.save()
      message.channel.send(`${usuário} agora pode enviar links de servidores sem ser punido.`)
      return (0);
    } else if (args[0] === 'removeExemptUser') {
      const exempt = new MessageEmbed()
        .setColor(colors['mod'])
        .setDescription(`<:martelodobem:1041234493744369715> Você não mencionou o usuário para ser adicionado na lista de isenção`)

      const usuário = await message.guild.members.cache.get(args[1]?.replace(/[<@!>]/g, ''))
      if (!usuário) return message.channel.send({ embeds: [exempt] })
      const userData = await this.client.database.user.getOrCreate(usuário.id)
      userData.exemptUser = false
      userData.save()
      message.channel.send(`${usuário} não pode mais enviar links de servidores sem ser punido.`)
      return (0);
    }

    let canalMod = `<:errroror:1040860335147581511> Desativado`;
    if (guildDocument.punishChannel.length) {
      canalMod = `<:concludinho:1040860364251877427> Ativo | Canal: <#${guildDocument.punishChannel}>`;
    }

    let cargoMod = `<:ModMute:980288914914947113> Desativado`;
    if (guildDocument.moderadores) {
      cargoMod = `<:concludinho:1040860364251877427> Ativo: <@&${guildDocument.moderadores}>`;
    }

    const final = guildDocument.wantModSysEnable ?
      `<:concludinho:1040860364251877427> Ativo` :
      `<:errroror:1040860335147581511> Desativado`

    const m = await message.reply({ embeds: [Painel], components: [row], fetchReply: true })

    const iFilter = i => i.user.id === message.author.id;

    const collector = m.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });

    collector.on('collect', async(i) => {
      i.deferUpdate()
      switch (i.customId) {
        case `categoria_utilidades`:
          m.edit({
            embeds: [

              new MessageEmbed()
                .setColor(colors['default'])
                .setThumbnail('https://cdn.discordapp.com/emojis/938280523388842014.webp?size=96&quality=lossless')
                .setTitle('<:plus:955577453441597550> **Utilidades Punitivas:**', `${message.author.username}`, true)
                .setDescription('Criado para facilitar o gerenciamento de dados da database em seu servidor, facilitando a forma de utilizar os comandos.') // inline false
                .addField('*Define onde as logs de punições serão enviadas:*', `${guildDocument.prefix}*Punishment logs <#canal>*\n**Exemplo:** ${guildDocument.prefix}*Punishment logs #geral*`, false)
                .addField('*Remove canal de logs das punições:*', `${guildDocument.prefix}*Punishment remove <#canal>*`, false)
                .addField('**CONTROLE DE PUNIÇÕES AVANÇADO**', '\nEste módulo permite que opções de escolha como se o controle de banimentos por cargo possam ser acessados.', false)
                .addField('*Definir cargo de moderadores:*', `${guildDocument.prefix}*Punishment mods <@cargo>*\n**Exemplo:** ${guildDocument.prefix}*Punishment mods @moderador*`, false)
                .addField('*Ativar sistema de controle avançado:*', `${guildDocument.prefix}*Punishment ativar*`, false)
                .addField('*Desativar sistema de controle avançado:*', `${guildDocument.prefix}*Punishment desativar*`, false)
                .addField('*Adicionar um usuário na isenção de punição do módulo anti-div:*', `${guildDocument.prefix}*Punishment exemptUser <@user>*\n**Exemplo:** ${guildDocument.prefix}*Punishment exemptUser @Solaris#0006*`, false)
                .addField('*Remover um usuário na isenção de punição do módulo anti-div:*', `${guildDocument.prefix}*Punishment removeExemptUser <@user>*\n**Exemplo:** ${guildDocument.prefix}*Punishment removeExemptUser @Solaris#0006*`, false)

            ]
          })
          break;
        case `categoria_moderação`:
          m.edit({
            embeds: [
              new MessageEmbed()
                .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setThumbnail('https://cdn.discordapp.com/emojis/938280523388842014.webp?size=96&quality=lossless')
                .setDescription(`Dúvidas de como está as configurações?\nAqui está os status`)
                .addFields(
                  {
                    name: `Sistema | Canal Punições:`,
                    value: `${canalMod}`
                  },
                  {
                    name: `Sistema | Cargo Moderador:`,
                    value: `${cargoMod}`
                  },
                  {
                    name: `O Sistema está:`,
                    value: `${final}`

                  }
                )

                .setColor(colors['lightgreen'])
            ]

          })

          break;
        case `fechar`:
          setTimeout(() => m.delete(), 100)

      }
    })

  }
}
  //𝘕𝘓 Guilhermee ⁷#6580
  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580

    //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580  //𝘕𝘓 Guilhermee ⁷#6580