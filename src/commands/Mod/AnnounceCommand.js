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
    const perm = new MessageEmbed()
      .setColor(colors.default)
      .setDescription('<:a_blurplecertifiedmoderator:856174396225355776> **Não pode ser executado!** tenha certeza de que você possui a permissão `MANAGE_MESSAGES` então você poderá utilizar este comando.')

    const link = new MessageEmbed()
      .setColor(colors.default)
      .setDescription('<:a_blurplecertifiedmoderator:856174396225355776> **URL inválida!** o link que você inseriu está incorreto ou apresenta erros, tente utilizar um diferente')

    const server = await this.client.database.guild.getOrCreate(message.guild.id)

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
      return message.channel.send(perm)

    const embedajuda = new MessageEmbed()
      .setTitle('Anuncio | Ajuda', this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setDescription(`<a:Jethhype:665057207196319744> Segue abaixo os comandos que podem ser utilizados na configuração do seu anúncio: <a:Jethhype:665057207196319744>\n \n<:nitro1:667835744903102494> **${server.prefix}anuncio enviar <#chat> <mensagem>** >> Utilizado para mandar o anuncio no canal definido. \n \n<:nitro2:667835748900405249> **${server.prefix}anuncio set <imagem>** >> Para setar um gif ou imagem no anuncio. \n \n<:nitro3:667835748828971018> **${server.prefix}anuncio resetar** >> Para resetar o link do gif ou imagem setado. \n \n<:premium:667149934025375764> **${server.prefix}anuncio ver** >> Para visualizar a sua imagem de anuncio.`)
      .setColor(colors.default)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))

    if (!args[0]) return message.channel.send(embedajuda)

    if (message.content.startsWith(server.prefix + 'anuncio resetar')) {
      server.linkanuncio = ''
      server.save()
      return message.channel.send(`**|** ${message.author}, você resetou a ilustração de seu anuncio personalizado.`)
    }
    if (message.content.startsWith(server.prefix + 'anuncio set')) {
      const imagem = args[1]
      if (!imagem) {
        return message.channel.send(link)
      }
      server.linkanuncio = args[1]
      server.save()
      message.channel.send(`> **|** ${message.author}, você alterou a sua ilustração de anuncio!`).then(msg => msg.delete(5000))
    }
    if (message.content.startsWith(server.prefix + 'anuncio ver')) {
      const embedver = new MessageEmbed()
        .setAuthor('Anúncio | Imagem', message.guild.iconURL({ dynamic: true, size: 1024 }) && this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
        .setColor(colors.default)
        .setDescription('**Esta será a imagem que irá aparecer quando seu anuncio estiver finalizado:**')
        .setImage(`${server.linkanuncio || ''}`)
        .setFooter('Não apareceu? seu link deve estar inválido', this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      if (server.linkanuncio) {
        message.channel.send(embedver)
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
        .setColor(colors.default)
        .setAuthor(`Anunciado por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(announce)
        .setImage(`${server.linkanuncio || ''}`)
        .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))

      const embedreply = new MessageEmbed()
        .setAuthor('Aviso', message.guild.iconURL({ dynamic: true, size: 1024 }) && this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
        .setColor(colors.default)
        .setDescription(`**Você está preste a mandar um anúncio no ${chat}, confirme com os emojis abaixo.** \n \n<a:number1:667590654200774656> Para mencionar \`@everyone\` .\n<a:number2:667590655744147521> Para mencionar \`@here\` .\n<a:number3:667590655698141197> Para não mencionar ninguém.`)
        .setFooter('Não apareceu? seu link deve estar inválido', this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))

      message.reply(embedreply).then(msg => {
        setTimeout(() => {
          msg.react('667590654200774656')
        }, 500)
        setTimeout(() => {
          msg.react('667590655744147521')
        }, 1000)
        setTimeout(() => {
          msg.react('667590655698141197')
        }, 1500)
        const filter = msg.createReactionfilter((r, u) => (r.emoji.id === '667590654200774656', '667590655744147521', '667590655698141197') && (u.id !== this.client.user.id && u.id === message.author.id))
        const col = msg.createReactionfilter({ filter, time: 180_000, errors: ['time'] })
        col.on('collect', async (r) => {
          switch (r.emoji.id) {
            case '667590654200774656':
              chat.send('@everyone', embed)
              msg.delete()
              message.reply(`Anúncio enviado com sucesso.`)
              break;
            case '667590655744147521':
              chat.send('@here', embed)
              msg.delete()
              message.reply(`Anúncio enviado com sucesso.`)
              break;
            case '667590655698141197':
              chat.send(embed)
              msg.delete()
              message.reply(`Anúncio enviado com sucesso.`)
          }
        })
      })
    }
  }
}