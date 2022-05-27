/* eslint-disable no-unused-vars */
const { Command, colors } = require('../../utils')
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js')
const modelVip = require('../../utils/database/collections/Vip');

module.exports = class Vip extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'Vip'
    this.aliases = ['vip', 'premium']
    this.category = 'VIP'
    this.bot_permissions = ['MANAGE_ROLES', 'MANAGE_CHANNELS']
  }

  async run(message, args) {
    // SelectMenu
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('select')
          .setPlaceholder('Nothing selected')
          .setMinValues(1)
          .setMaxValues(1)
          .addOptions([
            {
              label: 'Editar cargo',
              description: 'Esta opção permitirá com que você altere o nome do seu cargo',
              value: 'first_option',
            },
            {
              label: 'Editar call',
              description: 'Esta opção permitirá com que você altere o nome da sua call',
              value: 'second_option',
            },
            {
              label: 'Cor do cargo',
              description: 'Esta opção permitirá com que você altere a cor de seu cargo',
              value: 'third_option',
            },
          ]),
      );
    // Adicionar cargo VIP
    const adicionar = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('adicionar')
          .setLabel('Adicionar cargo')
          .setStyle('SUCCESS')
      );
    // remover cargo VIP
    const remover = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('remover')
          .setLabel('Remover cargo')
          .setStyle('DANGER')
      );

    const documentVip = await modelVip.findOne({
      guildID: message.guild.id,
      userID: message.author.id,
    }).catch(err => console.log(err))

    if (documentVip == null) {
      return message.reply(`<:a_lori_moletom:963820678157594703> » Você não possui vip no servidor.`)
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

    if (!guildDocument.vipGuild) {

      return message.reply(`<:a_lori_moletom:963820678157594703> » Seu servidor não está setado como vip para usufruir das opções.`)

    }

    if (!documentVip.vip) {

      return message.reply(`<:a_lori_moletom:963820678157594703> » Você não está setado como vip para usufruir das opções.`)

    }

    const dashboard = new MessageEmbed()
      .setAuthor({ name: `${message.guild.name} | Dashboard Vip`, iconURL: this.client.user.avatarURL({ dynamic: true, size: 1024 }) })
      .setDescription(`<:a_lori_moletom:963820678157594703> » Configure seu vip no servidor.`)
      .addFields([
        { name: `Informação do Sistema:`, value: `> <:newmemberbadge:967660459878666331> » Seu cargo: **${CheckRole}**\n> <:squareannouncement:967660459794776064> » Sua call: **${CheckCall}**` },
        { name: `Configuração do Sistema:`, value: `> <a:1r:940889951615205376> **» ${CheckRoleText} cargo.**\n> <a:2r:940889962889494618> **» ${CheckCallText} call.**\n> <a:3r:940889962772045895> **» Cor do cargo.**\n> <a:4r:940889960800739328> **» Adicionar usuário ao seu cargo vip.**\n> <a:5r:940889962767855627> **» Remover seu cargo vip do usuário.**` }
      ])
      .setFooter({ text: `Dashboard Vip de ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setThumbnail('https://media.discordapp.net/attachments/957238449558155304/964982682096390144/vip.png?width=461&height=461')
      .setColor(colors['default'])
      .setTimestamp();

    message.reply({ embeds: [dashboard], ephemeral: true, components: [row, adicionar, remover] }).then(msg => {

      const RoleFilter = (reaction, user) => reaction.emoji.id === `940889951615205376` && user.id === message.author.id;
      const CallFilter = (reaction, user) => reaction.emoji.id === `940889962889494618` && user.id === message.author.id;
      const ColorFilter = (reaction, user) => reaction.emoji.id === `940889962772045895` && user.id === message.author.id;
      const AUserFilter = (reaction, user) => reaction.emoji.id === `940889960800739328` && user.id === message.author.id;
      const RUserFilter = (reaction, user) => reaction.emoji.id === `940889962767855627` && user.id === message.author.id;

      const CreateRole = msg.createReactionCollector({ filter: RoleFilter, max: 1 });
      const CreateCall = msg.createReactionCollector({ filter: CallFilter, max: 1 });
      const Color = msg.createReactionCollector({ filter: ColorFilter, max: 1 });
      const AUser = msg.createReactionCollector({ filter: AUserFilter, max: 1 });
      const RUser = msg.createReactionCollector({ filter: RUserFilter, max: 1 });

      CreateRole.on('collect', async (reaction, user) => {
        switch (reaction.emoji.id) {
          case '940889951615205376':

            if (documentVip.roleID) {

              message.reply(`<:a_lori_moletom:963820678157594703> » Indique o nome do seu cargo vip.`).then(m => {
                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 60000, errors: ['time'], max: 1 }).on('collect', async message => {

                  const newnamerole = message.content
                  if (newnamerole.length > 100) return message.reply(`<:a_lori_moletom:963820678157594703> » Número máximo (100) de caracteres atingido.`)

                  const roleedit = message.guild.roles.cache.find(r => r.id === documentVip.roleID);

                  roleedit.edit({
                    name: `${newnamerole}`,
                  }).then(async () => {
                    const msg = await message.reply(`<:a_lori_moletom:963820678157594703> » Estou editando seu cargo vip no banco de dados.`)
                    setTimeout(() => {
                      msg.edit({ content: `<:a_lori_moletom:963820678157594703> » Seu cargo vip foi editado no servidor com sucesso.` })
                    }, 5000)
                  })

                })
              })

            } else {

              message.reply(`<:a_lori_moletom:963820678157594703> » Indique o nome do seu cargo vip.`).then(m => {
                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 60000, errors: ['time'], max: 1 }).on('collect', async message => {

                  const namerole = message.content
                  if (namerole.length > 100) return message.reply(`<:a_lori_moletom:963820678157594703> » Número máximo (100) de caracteres atingido.`)

                  message.guild.roles.create({
                    name: `${namerole}`,
                    color: parseInt(documentVip.colorVip?.replace('#', ''), 16)
                  }).then(rolecr => {
                    message.member.roles.add(rolecr.id)
                    documentVip.roleID = rolecr.id
                    documentVip.save().then(async () => {
                      const msg = await message.reply(`<:a_lori_moletom:963820678157594703> » Estou salvando seu cargo vip no banco de dados.`)
                      setTimeout(() => {
                        msg.edit({ content: `<:a_lori_moletom:963820678157594703> » Seu cargo vip no servidor foi salvo com sucesso.` })
                      }, 5000)
                    })

                  })

                })
              })

            }
        }
      }) // Fim collector 1

      CreateCall.on('collect', async (reaction, user) => {
        switch (reaction.emoji.id) {
          case '940889962889494618':

            if (documentVip.callID) {

              message.reply(`<:a_lori_moletom:963820678157594703> » Indique o novo nome da sua call vip.`).then(m => {
                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 160000, errors: ['time'], max: 1 }).on('collect', async message => {

                  const newnamecall = message.content
                  if (newnamecall.length > 50) return message.reply(`<:a_lori_moletom:963820678157594703> » Número máximo (50) de caracteres atingido.`)

                  const calledit = message.guild.channels.cache.find(c => c.id === documentVip.callID);

                  calledit.edit({
                    name: `${newnamecall}`,
                  }).then(async () => {
                    const msg = await message.reply(`<:a_lori_moletom:963820678157594703> » Estou editando sua call vip no banco de dados.`)
                    setTimeout(() => {
                      msg.edit({ content: `<:a_lori_moletom:963820678157594703> » Sua call vip foi editada no servidor com sucesso.` })
                    }, 5000)
                  })
                })
              })
            }

            else {

              if (documentVip.roleID) {

                message.reply(`<:a_lori_moletom:963820678157594703> » Indique o nome da sua call vip.`).then(m => {
                  message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 160000, errors: ['time'], max: 1 }).on('collect', async message => {

                    const namecall = message.content
                    if (namecall.length > 50) return message.reply(`<:a_lori_moletom:963820678157594703> » Número máximo (50) de caracteres atingido.`)

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
                        const msg = await message.reply(`<:a_lori_moletom:963820678157594703> » Estou salvando sua call vip no banco de dados.`)
                        setTimeout(() => {
                          msg.edit({ content: `<:a_lori_moletom:963820678157594703> » Sua call vip foi salva no servidor com sucesso.` })
                        }, 5000)
                      })

                    })
                  })
                })

              }

              else {

                message.reply(`<:a_lori_moletom:963820678157594703> » Você precisa criar seu cargo vip para conseguir criar a call.`)

              }

            }

        }
      }) // Fim collector 2 // Save backup in git repository Nikii Dev.

      Color.on('collect', async (reaction, user) => {
        switch (reaction.emoji.id) {
          case '940889962772045895':

            if (documentVip.roleID) {

              message.reply(`<:a_lori_moletom:963820678157594703> » Indique a cor do seu cargo vip.`).then(m => {
                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 60000, errors: ['time'], max: 1 }).on('collect', async message => {

                  const roleedit = message.guild.roles.cache.find(r => r.id === documentVip.roleID);
                  const newcolor = message.content

                  if (!newcolor.includes('#')) {
                    message.reply(`<:a_lori_moletom:963820678157594703> » Tipo de cor inválida! Lembre-se que só aceitamos cores Hexadecimal.`)
                    return
                  }

                  if (newcolor.length > 7) return message.reply(`<:a_lori_moletom:963820678157594703> » Número máximo (7) de caracteres atingido.`)

                  roleedit.edit({
                    color: `${newcolor}`,
                  }).then(async () => {
                    const msg = await message.reply(`<:a_lori_moletom:963820678157594703> » Estou editando a cor do seu cargo vip no banco de dados.`)
                    setTimeout(() => {
                      msg.edit({ content: `<:a_lori_moletom:963820678157594703> » A cor do seu cargo vip foi editada no servidor com sucesso.` }) // NIKII... THIS IS FAKE.
                    }, 5000)
                  })

                })
              })

            }

            else {
              message.reply(`<:a_lori_moletom:963820678157594703> » Você precisa criar seu cargo vip para conseguir editar a cor.`)
            }

        }
      })// Fim collecttor 3

      AUser.on('collect', async (reaction, user) => {
        switch (reaction.emoji.id) {
          case '940889960800739328':

            if (documentVip.roleID) {

              message.reply(`<:a_lori_moletom:963820678157594703> » Mencione o usuário que você deseja dar o cargo vip.`).then(m => {
                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 60000, errors: ['time'], max: 1 }).on('collect', async message => {

                  const roleedit = message.guild.roles.cache.find(r => r.id === documentVip.roleID);

                  const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

                  if (!usuario) {
                    return message.reply(`<:a_lori_moletom:963820678157594703> » Mencione um usuário valido.`)
                  }
                  if (usuario.id === this.client.user.id) {
                    return message.reply(`<:a_lori_moletom:963820678157594703> » Eu não posso me setar com o seu cargo vip.`)
                  }
                  if (usuario.roles.cache.has(documentVip.roleID)) return message.reply(`<:a_lori_moletom:963820678157594703> » Esse usuário já possui seu cargo vip neste servidor.`)

                  usuario.roles.add(documentVip.roleID)

                  const msg = await message.reply(`<:a_lori_moletom:963820678157594703> » Estou setando o usuário com seu cargo vip no banco de dados.`)
                  setTimeout(() => {
                    msg.edit({ content: `<:a_lori_moletom:963820678157594703> » O usuário foi setado com seu cargo vip no servidor com sucesso.` }) // NIKII... THIS IS FAKE.
                  }, 5000)
                })
              })

            }

            else {
              message.reply(`<:a_lori_moletom:963820678157594703> » Você precisa criar seu cargo vip para conseguir adiconar alguém.`)
            }

        }
      }) // Fim collecttor 4

      RUser.on('collect', async (reaction, user) => {
        switch (reaction.emoji.id) {
          case '940889962767855627':

            if (documentVip.roleID) {

              message.reply(`<:a_lori_moletom:963820678157594703> » Mencione o usuário que você deseja tirar o cargo vip.`).then(m => {
                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 60000, errors: ['time'], max: 1 }).on('collect', async message => {

                  const roleedit = message.guild.roles.cache.find(r => r.id === documentVip.roleID);

                  const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

                  if (!usuario) {
                    return message.reply(`<:a_lori_moletom:963820678157594703> » Mencione um usuário valido.`)
                  }
                  if (usuario.id === this.client.user.id) {
                    return message.reply(`<:a_lori_moletom:963820678157594703> » Eu não posso me remover com o seu cargo vip.`)
                  }

                  usuario.roles.remove(documentVip.roleID)

                  const msg = await message.reply(`<:a_lori_moletom:963820678157594703> » Estou tirando o usuário do seu cargo vip no banco de dados.`)
                  setTimeout(() => {
                    msg.edit({ content: `<:a_lori_moletom:963820678157594703> » O usuário teve o seu cargo vip removido no servidor com sucesso.` }) // NIKII... THIS IS FAKE.
                  }, 5000)
                })
              })

            }

            else {
              message.reply(`<:a_lori_moletom:963820678157594703> » Você precisa criar seu cargo vip para conseguir remover alguém.`)
            }

        }
      })

    })//

  }
} // Os comandos serão lançados em breve na aplicação Jeth. Versão aprimorada e melhorada dos comandos será lançada no Nikii Developements. | Disponivel em: https://discord.gg/wYd4rCYkrm
