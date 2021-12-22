const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class vip extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = ['premium']
    this.category = 'VipCommands'
  }

  async run(message, args) {
    if (message.guild.id !== '804575416098488380') {
      return message.channel.send('<:CancelarK:673592197341249559> Este comando só pode ser executado no servidor oficial da **Jeth!**');
    } else {
      const vipao = new MessageEmbed()

        .setTimestamp()
        .setColor(colors.vip)
        .setTitle('<:a_blurplesearch:856174396187344926> **Opa!**', `${message.author}`, true)
        .setThumbnail('https://cdn.discordapp.com/emojis/742242888838283324.gif?v=1')
        .setDescription('Aqui em nosso sistema consta que você não é um usuário vip! \n<:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627><:a_blurpleline:856174396041199627>') // inline false
        .addField('<:a_blurpleticket:856174396095332381> *Garanta já seu VIP para ter acesso a estes magnificos comandos!*', `**[[ADQUIRA AQUI]](https://pag.ae/7Wfg61Q9n)**`, true)
        .setImage('https://i.imgur.com/hoyGJTN.png')
        .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))

      let guildDocument = await this.client.database.Guilds.findById(message.guild.id)
      this.client.database.Users.findOne({ _id: message.author.id }, (e, doc) => {
        if (doc) {
          if (!doc.vip) {
            message.channel.send(vipao)
          } else {
            if (args[0] === 'gifban') {
              let mensagem = args.slice(1).join(' ')
              if (!mensagem) return message.channel.send(`Coloque qual será o link de banimento.`)
              doc.gifban = mensagem
              doc.save()
              message.reply(`Você mudou o gif de banimento,utilize **${guildDocument.prefix}vip gif-teste**,para testar seu gif!`)
            } else if (args[0] === 'gif-resetar') {
              doc.gifban = ''
              doc.save()
              message.reply('Seu gif de banimento foi resetado.')

            } else if (args[0] === 'gif-teste') {
              var teste = new MessageEmbed()
                .setAuthor('Jeth | Banimento Teste', this.client.user.avatarURL({ dynamic: true, size: 1024 }))
                .setDescription(`${message.author} baniu @USER#0000!`)
                .setImage(`${doc.gifban}`)
                .addField('Usuário:', `USER#0000`, true)
                .addField('ID:', `0000000000000000`, true)
                .addField('Motivo:', `Banido por ${message.author.tag} — Não relatou um motivo.`, false)
                .setColor(colors.default)
                .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
              message.channel.send({ embed: teste })
            } else if (args[0] === 'canal') {
              this.client.database.Canal.findOne({ _id: message.author.id }, (e, doc) => {
                if (doc) {
                  message.channel.send('Você já possui uma role própria!')
                }
                if (!doc) {
                  const args = message.content.slice(11)
                  var category = message.guild.channels.cache.get("837948274718933005");
                  message.guild.channels.create(args, {
                    type: 'voice',
                    parent: category.id
                  }).then(async c => {
                    c.updateOverwrite(message.guild.roles.cache.get(message.guild.id), {
                      CONNECT: false,
                      MANAGE_CHANNELS: false,
                      DEAFEN_MEMBERS: false,
                      MUTE_MEMBERS: false,
                      PRIORITY_SPEAKER: false
                    })
                    c.updateOverwrite(message.member.user, {
                      CONNECT: true,
                      MANAGE_CHANNELS: true,
                      DEAFEN_MEMBERS: true,
                      MUTE_MEMBERS: true,
                      PRIORITY_SPEAKER: true
                    })
                    message.channel.send('Canal criado com sucesso!')
                    const canal = this.client.database.Canal({ _id: message.author.id })
                    canal.save().then(() => {
                      message.channel.send("Usuário salvo na database")
                    })
                  })
                }
              })
            } else if (args[0] === 'cor') {
              this.client.database.Users.findOne({ _id: message.author.id }, (e, doc) => {
                if (!message.content.includes('#')) {
                  message.reply('<:CancelarK:673592197341249559> Tipo de cor inválida ! aceitamos apenas código HEX')
                  return (0);
                }
                const reas = args.slice(1).join(" ")
                if (!reas) {
                  message.reply('<:CancelarK:673592197341249559> Você não colocou nenhuma cor Hexadecimal')
                  return (0);
                }
                let mensagem = args.slice(1).join(' ')
                doc.cor = mensagem
                doc.save()
                message.reply('Você definiu sua cor com sucesso.')
              })
            } else if (args[0] === 'cargo') {
              this.client.database.Users.findOne({ _id: message.author.id }, (e, doc) => {
                if (!doc.cor) {
                  message.reply('<:CancelarK:673592197341249559> Não pode, você não definiu a cor para ser cargo!')
                  return (0);
                }
                if (doc) {
                  this.client.database.Cargo.findOne({ _id: message.author.id }, (e, doc) => {
                    if (doc) {
                      message.reply('<:CancelarK:673592197341249559> Você já possui um cargo próprio!')
                      return (0);
                    }
                    this.client.database.Users.findOne({ _id: message.author.id }, (e, doc) => {
                      const reas = args.slice(1).join(" ")
                      if (!reas) message.channel.send('<:CancelarK:673592197341249559> Erro! você não colocou nenhum nome para a role')
                      message.guild.roles.create({
                        data: {
                          name: `${reas}`,
                          color: `${doc.cor}`
                        }
                      }).then(rolec => {
                        message.channel.send('Cargo criado com sucesso!')
                        message.member.roles.add(rolec.id)
                        const cargo = this.client.database.Cargo({ _id: message.author.id })
                        cargo.save().then(() => {
                          message.channel.send("Usuário salvo na database")
                        })
                      })
                    })
                  })
                }
              })
            } else if (args[0] === 'help') {
              let embed = new MessageEmbed()
                .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setDescription(`<a:dshype:683501891493167163> Olá querido(a) usuário(a) VIP !\nPrecisando de uma ajudinha? Aqui vai seus comandos desbloqueados:`)
                .setColor(colors.default)
                .setThumbnail('https://cdn.discordapp.com/emojis/742242899156271205.gif?v=1')
                .addField('Modos de usar', [
                  `\`${guildDocument.prefix}vip gifban <link>\` - Define o gif que sera definido na hora de banir um membro.`,
                  `\`${guildDocument.prefix}vip gif-resetar\` - Reseta o link de banimento seu.`,
                  `\`${guildDocument.prefix}vip gif-teste\` - Testa o link de banimento seu.`,
                  `\`${guildDocument.prefix}vip canal <nome>\` - Cria seu próprio canal VIP.`,
                  `\`${guildDocument.prefix}vip cor <hex-code>\` - Define a cor para seu cargo hypado VIP.`,
                  `\`${guildDocument.prefix}vip cargo <nome>\` - Cria seu próprio cargo hypado VIP.`,
                  `\`${guildDocument.prefix}vip help\` - Veja a lista de ajuda sobre VIP.`
                ].join('\n'), false)
                .setImage('https://cl.buscafs.com/www.qore.com/public/uploads/images/78325_880x390.jpg')
              let embed2 = new MessageEmbed()
                .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setDescription(`Olá !\n\nNós da equipe Jeth, temos o orgulho de ter você como nosso usuário(a) vip, esta pequena compra que você fez para receber suas recompensas nos ajuda e muito a melhorar nossa qualidade, contratar pessoas que consigam melhorar nossos sistemas e ficarmos cada vez mais perto do topo.\n\nMuito obrigado!\n<a:dshype:683501891493167163> Equipe Jeth. <a:dshype:683501891493167163>`)
                .setThumbnail('https://cdn.discordapp.com/emojis/742242899156271205.gif?v=1')
                .setColor(colors.vip)
                .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))

              let embedCount = 1

              message.channel.send({ embed }).then(async m => {
                await m.react('666762183249494027')// ir para frente
                let col = m.createReactionCollector((e, u) => (u.id == message.author.id) &&
                  (e.emoji.id == '666762183249494027' /* para frente */ || e.emoji.id == '665721366514892839') /* para trás */,
                  { time: 180000, errors: ['time'] })
                let reacoes = col.on('collect', async (e, u) => {
                  if (embedCount != 2 && e.emoji.id == '666762183249494027') { // ir para frente

                    await m.react('665721366514892839')
                    e.users.cache.map(u => e.remove(u.id))
                    m.edit(embed2)
                    embedCount = 2
                    await m.react('665721366514892839')// volta para trás
                  } else if (e.emoji.id == '665721366514892839' && embedCount == 2) {

                    await m.react('666762183249494027')
                    e.users.cache.map(u => e.remove(u.id))

                    m.edit(embed)
                    embedCount = 1
                  }
                })
              })
            }
          }
        }
      })
    }
  }
}