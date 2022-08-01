const { Command } = require('../../utils')
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js')
const modelVip = require('../../utils/database/collections/Vip');

module.exports = class VipCommand extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'Vip'
    this.aliases = ['vip', 'premium']
    this.category = 'VIP'
    this.bot_permissions = ['MANAGE_ROLES', 'MANAGE_CHANNELS']
  }

  async run(message, args) {

    const documentVip = await modelVip.findOne({
      guildID: message.guild.id,
      userID: message.author.id,
    }).catch(err => console.log(err))

    if (documentVip == null) {
      return message.reply(`<:a_lori_moletom:1003479428350873630> » Você não possui vip no servidor.`)
    }

    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)

    let CheckCall = 'Nenhuma.'
    let CheckRole = 'Nenhum.'
    let CheckRoleText = 'Criar'
    let CheckCallText = 'Criar'

    if (documentVip.roleID.length) {
      CheckRoleText = `Editar`
      CheckRole = `<@&${documentVip.roleID}>`
    }
    if (documentVip.callID.length) {
      CheckCallText = `Editar`
      CheckCall = `<#${documentVip.callID}>`
    }

    const rew = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('vip-menu')
          .setPlaceholder('✨ Abrir dashboard vip.')
          .addOptions([
            {
              label: `${CheckRoleText} Cargo`,//Nome da option
              description: `${CheckRoleText} o cargo personalizado vip.`,//description
              value: '1',//Valor do emoji, o id dele no buttons
              emoji: `<:members:963208373644447764>`, //emoji q vai ficar grandão do lado do texto
            },
            {
              label: `${CheckCallText} Call`,//Nome da option
              description: `${CheckCallText} a call personalizada vip.`,//description
              value: '2',//Valor do emoji, o id dele no buttons
              emoji: `<:plus:955577453441597550>`, //emoji q vai ficar grandão do lado do texto
            },
            {
              label: 'Cor do cargo',
              description: 'Edite a cor do seu cargo vip.',
              value: '3',
              emoji: `<:servers:963208373707341824>`,
            },
            {
              label: 'Adicionar usuário ao seu cargo vip',
              description: 'Adicione um usuário com o seu cargo vip no servidor.',
              value: '4',
              emoji: `<:newmemberbadge:967660459878666331>`,
            },
            {
              label: 'Remover usuário do seu cargo vip',
              description: 'Remove um usuário com o seu cargo vip no servidor.',
              value: '5',
              emoji: `<:ModMute:980288914914947113>`,
            },
          ]),
      )

    if (!documentVip.vip) {

      return message.reply(`<:a_lori_moletom:1003479428350873630> » Você não está setado como vip para usufruir das opções.`)

    }

    const dashboard = new MessageEmbed()
      .setAuthor({ name: `${message.guild.name} | Dashboard Vip`, iconURL: this.client.user.avatarURL({ dynamic: true, size: 1024 }) })
      .setDescription(`<:a_lori_moletom:1003479428350873630> » Configure seu vip no servidor.`)
      .addFields([
        { name: `Informação do Sistema:`, value: `> <:newmemberbadge:967660459878666331> » Seu cargo: **${CheckRole}**\n> <:squareannouncement:967660459794776064> » Sua call: **${CheckCall}**` },
        { name: `Configuração do Sistema:`, value: `> <a:1r:940889951615205376> **» Selecione qualquer opção na lista para continuar, após selecionada, siga as futuras informações.**` }
      ])
      .setFooter({ text: `Dashboard Vip de ${message.author.tag} | Dashboard fecha em 3 minutos.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setThumbnail('https://media.discordapp.net/attachments/957238449558155304/964982682096390144/vip.png?width=461&height=461')
      .setColor(guildDocument.colorembed) // eu troco isso dps sol
      .setTimestamp();

    message.reply({ embeds: [dashboard], ephemeral: true, components: [rew] }).then(msg => {

      const filter = (interaction) => {
        return interaction.isSelectMenu() && interaction.message.id === msg.id;
      };

      const collector = msg.createMessageComponentCollector({
        filter: filter,
        time: 180000,
      });

      collector.on('end', async (r, reason) => {
        if (reason != 'time') return;

        msg.delete()
        setTimeout(() => {
          message.reply({ content: `<:9204adminbadge:938280523388842014> » Dashboard [Vip] de ${message.author} foi fechado. (Automático)` })
        }, 1000)
      });

      collector.on('collect', async (x) => {
        if (x.user.id != message.author.id)
          return x.reply(`<:ModMute:980288914914947113> » ${x.user} você não pode acessar o dashboard, pois não foi você que abriu.`);

        switch (x.values[0]) {
          case '1': {
            if (documentVip.roleID) {

              message.reply(`<:a_lori_moletom:1003479428350873630> » Indique o nome do seu cargo vip.`).then(() => {
                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 60000, errors: ['time'], max: 1 }).on('collect', async message => {

                  const newnamerole = message.content
                  if (newnamerole.length > 100) return message.reply(`<:a_lori_moletom:1003479428350873630> » Número máximo (100) de caracteres atingido.`)

                  const roleedit = message.guild.roles.cache.find(r => r.id === documentVip.roleID);

                  roleedit.edit({
                    name: `${newnamerole}`,
                  }).then(async () => {
                    const msg = await message.reply(`<:a_lori_moletom:1003479428350873630> » Estou editando seu cargo vip no banco de dados.`)
                    setTimeout(() => {
                      msg.edit({ content: `<:a_lori_moletom:1003479428350873630> » Seu cargo vip foi editado no servidor com sucesso.` })
                    }, 5000)
                  })

                })
              })

            } else {

              message.reply(`<:a_lori_moletom:1003479428350873630> » Indique o nome do seu cargo vip.`).then(() => {
                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 60000, errors: ['time'], max: 1 }).on('collect', async message => {

                  const namerole = message.content
                  if (namerole.length > 100) return message.reply(`<:a_lori_moletom:1003479428350873630> » Número máximo (100) de caracteres atingido.`)

                  message.guild.roles.create({
                    name: `${namerole}`,
                    color: parseInt(documentVip.colorVip?.replace('#', ''), 16)
                  }).then(rolecr => {
                    message.member.roles.add(rolecr.id)
                    documentVip.roleID = rolecr.id
                    documentVip.save().then(async () => {
                      const msg = await message.reply(`<:a_lori_moletom:1003479428350873630> » Estou salvando seu cargo vip no banco de dados.`)
                      setTimeout(() => {
                        msg.edit({ content: `<:a_lori_moletom:1003479428350873630> » Seu cargo vip no servidor foi salvo com sucesso.` })
                      }, 5000)
                    })

                  })

                })
              })

            }
          }
            break;
          case '2': {
            if (documentVip.callID) {

              message.reply(`<:a_lori_moletom:1003479428350873630> » Indique o novo nome da sua call vip.`).then(() => {
                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 160000, errors: ['time'], max: 1 }).on('collect', async message => {

                  const newnamecall = message.content
                  if (newnamecall.length > 50) return message.reply(`<:a_lori_moletom:1003479428350873630> » Número máximo (50) de caracteres atingido.`)

                  const calledit = message.guild.channels.cache.find(c => c.id === documentVip.callID);

                  calledit.edit({
                    name: `${newnamecall}`,
                  }).then(async () => {
                    const msg = await message.reply(`<:a_lori_moletom:1003479428350873630> » Estou editando sua call vip no banco de dados.`)
                    setTimeout(() => {
                      msg.edit({ content: `<:a_lori_moletom:1003479428350873630> » Sua call vip foi editada no servidor com sucesso.` })
                    }, 5000)
                  })
                })
              })
            }

            else {

              if (documentVip.roleID) {

                message.reply(`<:a_lori_moletom:1003479428350873630> » Indique o nome da sua call vip.`).then(() => {
                  message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 160000, errors: ['time'], max: 1 }).on('collect', async message => {

                    const namecall = message.content
                    if (namecall.length > 50) return message.reply(`<:a_lori_moletom:1003479428350873630> » Número máximo (50) de caracteres atingido.`)

                    message.guild.channels.create(namecall, {
                      type: 'GUILD_VOICE',
                      permissionOverwrites: [
                        {
                          id: message.guild.roles.cache.get(message.guild.id),
                          allow: ['VIEW_CHANNEL'],
                          deny: ['CONNECT', 'MANAGE_CHANNELS', 'DEAFEN_MEMBERS', 'MUTE_MEMBERS', 'PRIORITY_SPEAKER']
                        },
                        {
                          id: message.member.user,
                          allow: ['VIEW_CHANNEL', 'CONNECT', 'MANAGE_CHANNELS', 'DEAFEN_MEMBERS', 'MUTE_MEMBERS', 'PRIORITY_SPEAKER']
                        },
                        {
                          id: message.guild.roles.cache.get(documentVip.roleID),
                          allow: ['VIEW_CHANNEL', 'CONNECT', 'PRIORITY_SPEAKER'],
                          deny: ['MANAGE_CHANNELS', 'DEAFEN_MEMBERS', 'MUTE_MEMBERS']
                        }
                      ]

                    }).then(callcr => {
                      documentVip.callID = callcr.id
                      documentVip.save().then(async () => {
                        const msg = await message.reply(`<:a_lori_moletom:1003479428350873630> » Estou salvando sua call vip no banco de dados.`)
                        setTimeout(() => {
                          msg.edit({ content: `<:a_lori_moletom:1003479428350873630> » Sua call vip foi salva no servidor com sucesso.` })
                        }, 5000)
                      })

                    })
                  })
                })

              }

              else {

                message.reply(`<:a_lori_moletom:1003479428350873630> » Você precisa criar seu cargo vip para conseguir criar a call.`)

              }

            }

          }
            break;
          case '3': {

            if (documentVip.roleID) {

              message.reply(`<:a_lori_moletom:1003479428350873630> » Indique a cor do seu cargo vip.`).then(() => {
                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 60000, errors: ['time'], max: 1 }).on('collect', async message => {

                  const roleedit = message.guild.roles.cache.find(r => r.id === documentVip.roleID);
                  const newcolor = message.content

                  if (!newcolor.includes('#')) {
                    message.reply(`<:a_lori_moletom:1003479428350873630> » Tipo de cor inválida! Lembre-se que só aceitamos cores Hexadecimal.`)
                    return
                  }

                  if (newcolor.length > 7) return message.reply(`<:a_lori_moletom:1003479428350873630> » Número máximo (7) de caracteres atingido.`)

                  roleedit.edit({
                    color: `${newcolor}`,
                  }).then(async () => {
                    const msg = await message.reply(`<:a_lori_moletom:1003479428350873630> » Estou editando a cor do seu cargo vip no banco de dados.`)
                    setTimeout(() => {
                      msg.edit({ content: `<:a_lori_moletom:1003479428350873630> » A cor do seu cargo vip foi editada no servidor com sucesso.` }) // NIKII... THIS IS FAKE.
                    }, 5000)
                  })

                })
              })

            }

            else {
              message.reply(`<:a_lori_moletom:1003479428350873630> » Você precisa criar seu cargo vip para conseguir editar a cor.`)
            }
          }
            break;
          case '4': {

            if (documentVip.roleID) {

              message.reply(`<:a_lori_moletom:1003479428350873630> » Mencione o usuário que você deseja dar o cargo vip.`).then(() => {
                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 60000, errors: ['time'], max: 1 }).on('collect', async message => {

                  // const roleedit = message.guild.roles.cache.find(r => r.id === documentVip.roleID);

                  const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

                  if (!usuario) {
                    return message.reply(`<:a_lori_moletom:1003479428350873630> » Mencione um usuário valido.`)
                  }
                  if (usuario.id === this.client.user.id) {
                    return message.reply(`<:a_lori_moletom:1003479428350873630> » Eu não posso me setar com o seu cargo vip.`)
                  }
                  if (usuario.roles.cache.has(documentVip.roleID)) return message.reply(`<:a_lori_moletom:1003479428350873630> » Esse usuário já possui seu cargo vip neste servidor.`)

                  usuario.roles.add(documentVip.roleID)

                  const msg = await message.reply(`<:a_lori_moletom:1003479428350873630> » Estou setando o usuário com seu cargo vip no banco de dados.`)
                  setTimeout(() => {
                    msg.edit({ content: `<:a_lori_moletom:1003479428350873630> » O usuário foi setado com seu cargo vip no servidor com sucesso.` }) // NIKII... THIS IS FAKE.
                  }, 5000)
                })
              })

            }

            else {
              message.reply(`<:a_lori_moletom:1003479428350873630> » Você precisa criar seu cargo vip para conseguir adiconar alguém.`)
            }

          }
            break;
          case '5': {

            if (documentVip.roleID) {

              message.reply(`<:a_lori_moletom:1003479428350873630> » Mencione o usuário que você deseja tirar o cargo vip.`).then(() => {
                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 60000, errors: ['time'], max: 1 }).on('collect', async message => {

                  // const roleedit = message.guild.roles.cache.find(r => r.id === documentVip.roleID);

                  const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

                  if (!usuario) {
                    return message.reply(`<:a_lori_moletom:1003479428350873630> » Mencione um usuário valido.`)
                  }
                  if (usuario.id === this.client.user.id) {
                    return message.reply(`<:a_lori_moletom:1003479428350873630> » Eu não posso me remover com o seu cargo vip.`)
                  }

                  usuario.roles.remove(documentVip.roleID)

                  const msg = await message.reply(`<:a_lori_moletom:1003479428350873630> » Estou tirando o usuário do seu cargo vip no banco de dados.`)
                  setTimeout(() => {
                    msg.edit({ content: `<:a_lori_moletom:1003479428350873630> » O usuário teve o seu cargo vip removido no servidor com sucesso.` }) // NIKII... THIS IS FAKE.
                  }, 5000)
                })
              })

            }

            else {
              message.reply(`<:a_lori_moletom:1003479428350873630> » Você precisa criar seu cargo vip para conseguir remover alguém.`)
            }
          }
        }
      }) // End
    })
  }
}
