const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class anuncio extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'announce'
    this.aliases = ['anuncio', 'anunciar', 'anunciment']
    this.category = 'Mod'
  }

  async run(message, args) {
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id) //Db
    if (guildDocument.wantModSysEnable === true) {
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

      const link = new MessageEmbed()
        .setColor(colors['default'])
        .setDescription('<:a_blurplecertifiedmoderator:856174396225355776> **URL inválida!** o link que você inseriu está incorreto ou apresenta erros, tente utilizar um diferente')

      const server = await this.client.database.guild.getOrCreate(message.guild.id)

      const role = message.guild.roles.cache.get(guildDocument.moderadores)

      if (!guildDocument.moderadores) {
        message.channel.send({ embeds: [embedB] })
        return
      }
      if (!message.member.roles.cache.has(role.id)) {
        message.channel.send({ embeds: [embedPerm] })
        return
      }

      const embedajuda = new MessageEmbed()
        .setTitle('Anuncio | Ajuda', this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
        .setDescription(`<a:Jethhype:665057207196319744> Segue abaixo os comandos que podem ser utilizados na configuração do seu anúncio: <a:Jethhype:665057207196319744>\n \n<:nitro1:667835744903102494> **${server.prefix}anuncio enviar <#chat> <mensagem>** >> Utilizado para mandar o anuncio no canal definido. \n \n<:nitro2:667835748900405249> **${server.prefix}anuncio set <imagem>** >> Para setar um gif ou imagem no anuncio. \n \n<:nitro3:667835748828971018> **${server.prefix}anuncio resetar** >> Para resetar o link do gif ou imagem setado. \n \n<:premium:667149934025375764> **${server.prefix}anuncio ver** >> Para visualizar a sua imagem de anuncio.`)
        .setColor(colors['default'])
        .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

      if (!args[0]) return message.reply({ embeds: [embedajuda] })

      if (message.content.startsWith(server.prefix + 'anuncio resetar')) {
        server.linkanuncio = ''
        server.save()
        return message.reply(`**|** ${message.author}, você resetou a ilustração de seu anuncio personalizado.`)
      }
      if (message.content.startsWith(server.prefix + 'anuncio set')) {
        const imagem = args[1]
        if (!imagem) {
          return message.reply({ embeds: [link] })
        }
        server.linkanuncio = args[1]
        server.save()
        message.reply(`> **|** ${message.author}, você alterou a sua ilustração de anuncio!`).then(msg => msg.delete(5000))
      }
      if (message.content.startsWith(server.prefix + 'anuncio ver')) {
        const embedver = new MessageEmbed()
          .setAuthor({ name: 'Anúncio | Imagem', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) || this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
          .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
          .setColor(colors['default'])
          .setDescription('**Esta será a imagem que irá aparecer quando seu anuncio estiver finalizado:**')
          .setImage(`${server.linkanuncio || ''}`)
          .setFooter({ text: 'Não apareceu? seu link deve estar inválido', iconURL: this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
        if (server.linkanuncio) {
          message.reply(embedver)
        }
        if (!server.linkanuncio)
          message.reply('Não há nenhuma Imagem para ser exibida!')
      }
      if (message.content.startsWith(`${server.prefix}anuncio enviar`)) {
        const chat = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!chat) return message.reply('Você esqueceu de mencionar o chat.')
        const announce = args.slice(2).join(' ')
        if (!announce) return message.reply(`você não argumentou nada para mim enviar, favor, indique o que deseja enviar.`)

        const embed = new MessageEmbed()
          .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
          .setColor(colors['default'])
          .setAuthor({ name: `Anunciado por ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })
          .setDescription(announce)
          .setImage(`${server.linkanuncio || ''}`)
          .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

        const embedreply = new MessageEmbed()
          .setAuthor({ name: 'Aviso', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
          .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
          .setColor(colors['default'])
          .setDescription(`**Você está preste a mandar um anúncio no ${chat}, confirme com os emojis abaixo.** \n \n<a:number1:667590654200774656> Para mencionar \`@everyone\` .\n<a:number2:667590655744147521> Para mencionar \`@here\` .\n<a:number3:667590655698141197> Para não mencionar ninguém.`)
          .setFooter({ text: 'Não apareceu? seu link deve estar inválido', iconURL: this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })

        message.reply({ embeds: [embedreply] }).then(async msg => {
          await msg.react('667590654200774656')
          await msg.react('667590655744147521')
          await msg.react('667590655698141197')
          const filter = ((r, u) => (r.emoji.id === '667590654200774656', '667590655744147521', '667590655698141197') && (u.id !== this.client.user.id && u.id === message.author.id))
          const col = msg.createReactionCollector({ filter, time: 180_000, errors: ['time'] })
          col.on('collect', async (r) => {
            switch (r.emoji.id) {
              case '667590654200774656':
                chat.send('@everyone', { embeds: [embed] })
                msg.delete()
                message.reply(`Anúncio enviado com sucesso.`)
                break;
              case '667590655744147521':
                chat.send('@here', { embeds: [embed] })
                msg.delete()
                message.reply(`Anúncio enviado com sucesso.`)
                break;
              case '667590655698141197':
                chat.send({ embeds: [embed] })
                msg.delete()
                message.reply(`Anúncio enviado com sucesso.`)
            }
          })
        })
      }
    } else if (guildDocument.wantModSysEnable === false) {
      const perm = new MessageEmbed()
        .setColor(colors['default'])
        .setDescription('<:a_blurplecertifiedmoderator:856174396225355776> **Não pode ser executado!** tenha certeza de que você possui a permissão `MANAGE_MESSAGES` então você poderá utilizar este comando.')

      const link = new MessageEmbed()
        .setColor(colors['default'])
        .setDescription('<:a_blurplecertifiedmoderator:856174396225355776> **URL inválida!** o link que você inseriu está incorreto ou apresenta erros, tente utilizar um diferente')

      const server = await this.client.database.guild.getOrCreate(message.guild.id)

      if (!message.member.permissions.has('MANAGE_MESSAGES'))
        return message.reply(perm)

      const embedajuda = new MessageEmbed()
        .setTitle('Anuncio | Ajuda', this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
        .setDescription(`<a:Jethhype:665057207196319744> Segue abaixo os comandos que podem ser utilizados na configuração do seu anúncio: <a:Jethhype:665057207196319744>\n \n<:nitro1:667835744903102494> **${server.prefix}anuncio enviar <#chat> <mensagem>** >> Utilizado para mandar o anuncio no canal definido. \n \n<:nitro2:667835748900405249> **${server.prefix}anuncio set <imagem>** >> Para setar um gif ou imagem no anuncio. \n \n<:nitro3:667835748828971018> **${server.prefix}anuncio resetar** >> Para resetar o link do gif ou imagem setado. \n \n<:premium:667149934025375764> **${server.prefix}anuncio ver** >> Para visualizar a sua imagem de anuncio.`)
        .setColor(colors['default'])
        .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

      if (!args[0]) return message.reply({ embeds: [embedajuda] })

      if (message.content.startsWith(server.prefix + 'anuncio resetar')) {
        server.linkanuncio = ''
        server.save()
        return message.reply(`**|** ${message.author}, você resetou a ilustração de seu anuncio personalizado.`)
      }
      if (message.content.startsWith(server.prefix + 'anuncio set')) {
        const imagem = args[1]
        if (!imagem) {
          return message.reply({ embeds: [link] })
        }
        server.linkanuncio = args[1]
        server.save()
        message.reply(`> **|** ${message.author}, você alterou a sua ilustração de anuncio!`).then(msg => msg.delete(5000))
      }
      if (message.content.startsWith(server.prefix + 'anuncio ver')) {
        const embedver = new MessageEmbed()
          .setAuthor({ name: 'Anúncio | Imagem', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) || this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
          .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
          .setColor(colors['default'])
          .setDescription('**Esta será a imagem que irá aparecer quando seu anuncio estiver finalizado:**')
          .setImage(`${server.linkanuncio || ''}`)
          .setFooter({ text: 'Não apareceu? seu link deve estar inválido', iconURL: this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
        if (server.linkanuncio) {
          message.reply(embedver)
        }
        if (!server.linkanuncio)
          message.reply('Não há nenhuma Imagem para ser exibida!')
      }
      if (message.content.startsWith(`${server.prefix}anuncio enviar`)) {
        const chat = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!chat) return message.reply('Você esqueceu de mencionar o chat.')
        const announce = args.slice(2).join(' ')
        if (!announce) return message.reply(`você não argumentou nada para mim enviar, favor, indique o que deseja enviar.`)

        const embed = new MessageEmbed()
          .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
          .setColor(colors['default'])
          .setAuthor({ name: `Anunciado por ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })
          .setDescription(announce)
          .setImage(`${server.linkanuncio || ''}`)
          .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

        const embedreply = new MessageEmbed()
          .setAuthor({ name: 'Aviso', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
          .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
          .setColor(colors['default'])
          .setDescription(`**Você está preste a mandar um anúncio no ${chat}, confirme com os emojis abaixo.** \n \n<a:number1:667590654200774656> Para mencionar \`@everyone\` .\n<a:number2:667590655744147521> Para mencionar \`@here\` .\n<a:number3:667590655698141197> Para não mencionar ninguém.`)
          .setFooter({ text: 'Não apareceu? seu link deve estar inválido', iconURL: this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })

        message.reply({ embeds: [embedreply] }).then(async msg => {
          await msg.react('667590654200774656')
          await msg.react('667590655744147521')
          await msg.react('667590655698141197')
          const filter = ((r, u) => (r.emoji.id === '667590654200774656', '667590655744147521', '667590655698141197') && (u.id !== this.client.user.id && u.id === message.author.id))
          const col = msg.createReactionCollector({ filter, time: 180_000, errors: ['time'] })
          col.on('collect', async (r) => {
            switch (r.emoji.id) {
              case '667590654200774656':
                chat.send('@everyone', { embeds: [embed] })
                msg.delete()
                message.reply(`Anúncio enviado com sucesso.`)
                break;
              case '667590655744147521':
                chat.send('@here', { embeds: [embed] })
                msg.delete()
                message.reply(`Anúncio enviado com sucesso.`)
                break;
              case '667590655698141197':
                chat.send({ embeds: [embed] })
                msg.delete()
                message.reply(`Anúncio enviado com sucesso.`)
            }
          })
        })
      }
    }
  }
}