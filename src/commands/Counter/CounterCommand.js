/* eslint-disable no-unused-vars */
const { Command, TranslateFunctions, emojis } = require('../../utils')
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js')

// NAO, NAO E NAO... ESSE COMANDO N ESTA ORGANIZADO :) MAS PELO MENOS FUNCIONA

module.exports = class colorEmbed extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'Counter'
    this.aliases = ['counter', 'contador']
    this.category = 'Configurações'
    this.permissions = ['MANAGE_CHANNELS']
    this.bot_permissions = ['MANAGE_CHANNELS']
  }

  async run(message, args) {

    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)
    const cordb = guildDocument.color_embed

    const rew = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('counter-menu')
          .setPlaceholder('💾 Abrir dashboard do contador.')
          .addOptions([
            {
              label: 'Definir Canal',//Nome da option
              description: 'Definal o canal aonde o contador será ativado.',//description
              value: '1',//Valor do emoji, o id dele no buttons
              emoji: `<a:1r:940889951615205376>`, //emoji q vai ficar grandão do lado do texto
            },
            {
              label: 'Tipo do Contador',
              description: 'Altere o tipo do contador.',
              value: '2',
              emoji: `<a:2r:940889962889494618>`,
            },
            {
              label: 'Definir Mensagem',
              description: 'Defina a mensagem que será exibida no contador.',
              value: '3',
              emoji: `<a:3r:940889962772045895>`,
            },
            {
              label: 'Resetar Definições',
              description: 'Resete as configurações contador quando precisar.',
              value: '4',
              emoji: `<a:4r:940889960800739328>`,
            },
          ]),
      )

    const tm = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('typec-menu')
          .setPlaceholder('📋 Contadores público.')
          .addOptions([
            {
              label: 'Azul',
              value: 'azul',
              emoji: `<a:set1:664306595391602698>`,
            },
            {
              label: 'Aqua',
              value: 'aqua',
              emoji: `<a:fil2:735932752171630663>`,
            },
            {
              label: 'Violeta',
              value: 'violeta',
              emoji: `<a:t3:683857609023160322>`,
            },
            {
              label: 'Rosa',
              value: 'rosa',
              emoji: `<a:j_4:675774964997029918>`,
            },
            {
              label: 'Ruby',
              value: 'ruby',
              emoji: `<a:k5:683064092793110558>`,
            },
            {
              label: 'EXA',
              value: 'exa',
              emoji: `<a:5r:922390293557411840>`,
            },
            {
              label: 'RedBlack',
              value: 'redblack',
              emoji: `<a:lo7:735367392703807560>`,
            },
            {
              label: 'ICE',
              value: 'ice',
              emoji: `<a:8ice:737078967244423189>`,
            },
            {
              label: 'BLK',
              value: 'blk',
              emoji: `<a:BLK9:770793783583309866>`,
            },

          ]),
      )

    const statsC = guildDocument.counterStatus ?
      `Ativado` :
      `Desativado`

    const channelC = guildDocument.counterChannel ?
      `<#${guildDocument.counterChannel}>` :
      `Nenhum`

    const dashboard = new MessageEmbed()
      .setAuthor({ name: `${message.guild.name} | Dashboard Contador`, iconURL: this.client.user.avatarURL({ dynamic: true, size: 1024 }) })
      .setDescription(`<:servers:963208373707341824> » Configure o Sistema de Contador.`)
      .addFields([
        { name: `Informação do Sistema:`, value: `> <:roles:963208373606682725> » Canal: **${channelC}**\n> <:roles:963208373606682725> » Tipo: **${guildDocument.counterType}**\n> <:roles:963208373606682725> » Mensagem: \`${guildDocument.counterMessage}\`\n> <:roles:963208373606682725> » Status: **${statsC}**` },
        { name: `Configuração do Sistema:`, value: `> <:ModMute:980288914914947113> **» Selecione qualquer opção na lista para continuar, após selecionada, siga as futuras informações.**` }
      ])
      .setFooter({ text: `Dashboard de ${message.author.tag} | Dashboard fecha em 3 minutos.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setThumbnail('https://cdn-icons.flaticon.com/png/512/3694/premium/3694290.png?token=exp=1653835711~hmac=be1fd43871e4498590084d1b61752139')
      .setColor(cordb) // Troca isso dps
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
          message.reply({ content: `<:9204adminbadge:938280523388842014> » Dashboard [Contador] de ${message.author} foi fechado. (Automático)` })
        }, 1000)
      });

      collector.on('collect', async (x) => {
        if (x.user.id != message.author.id)
          return
        switch (x.values[0]) {

          case '1': {

            message.reply(`<:ModMute:980288914914947113> » Indique o canal aonde será setado o contador.`).then(() => {
              message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 60000, errors: ['time'], max: 1 }).on('collect', async message => {

                const channel = message.guild.channels.cache.find(c => c.name === args.slice(1).join(' ')) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

                if (!channel || channel.type === 'category') return message.reply(`<:ModMute:980288914914947113> » Mencione um canal válido.`)

                if (channel.id == guildDocument.counterChannel)
                  return message.reply(`<:ModMute:980288914914947113> » O canal inserido é o mesmo setado atualmente.`)

                guildDocument.counterStatus = true
                guildDocument.counterChannel = channel.id
                guildDocument.save().then(async () => {

                  const msg = await message.reply(`<:9204adminbadge:938280523388842014> » Estou salvando o canal no banco de dados.`)
                  setTimeout(() => {
                    msg.edit({ content: `<:9204adminbadge:938280523388842014> **»** O canal aonde o contador será exibido foi setado com sucesso.\n<:servers:963208373707341824> **»** Canal definido: **${channel}**` })
                  }, 5000)
                })

                const contador = guildDocument.counterType
                const defaultChannel = await message.guild.channels.cache.get(guildDocument.counterChannel)
                if (contador == '{azul}') {
                  await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.azul(message.guild.memberCount)))
                }
                if (contador == '{aqua}') {
                  await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.aqua(message.guild.memberCount)))
                }
                if (contador == '{violeta}') {
                  await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.violeta(message.guild.memberCount)))
                }
                if (contador == '{rosa}') {
                  await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.rosa(message.guild.memberCount)))
                }
                if (contador == '{ruby}') {
                  await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.ruby(message.guild.memberCount)))
                }
                if (contador == '{exa}') {
                  await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.exa(message.guild.memberCount)))
                }
                if (contador == '{redblack}') {
                  await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.redblack(message.guild.memberCount)))
                }
                if (contador == '{ice}') {
                  await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.ice(message.guild.memberCount)))
                }
                if (contador == '{blk}') {
                  await channel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.blk(message.guild.memberCount)))
                }

              })
            })
          } // End
            break;

          case '2': {

            if (!guildDocument.counterChannel) return message.reply(`<:ModMute:980288914914947113> » Este servidor não setou o canal do contador.`)

            message.reply({ content: `<:ModMute:980288914914947113> » Selecione o tipo de contador:`, ephemeral: true, components: [tm] }).then(msg => {

              const filter = (interaction) => {
                return interaction.isSelectMenu() && interaction.message.id === msg.id;
              };

              const collector = msg.createMessageComponentCollector({
                filter: filter,
                time: 180000,
                max: 1,
              });

              collector.on('end', async (r, reason) => {
                if (reason != 'time') return;
              });

              collector.on('collect', async (x) => {
                if (x.user.id != message.author.id)
                  return
                switch (x.values[0]) {

                  case 'azul': {
                    guildDocument.counterType = '{azul}'
                    guildDocument.save().then(async () => {
                      message.reply(`<:9204adminbadge:938280523388842014> » Tipo do contador foi alterado para **Azul**.`)
                    })
                    const defaultChannel = await message.guild.channels.cache.get(guildDocument.counterChannel)
                    const contador = guildDocument.counterType
                    await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.azul(message.guild.memberCount)))
                  }

                    break;
                  case 'aqua': {
                    guildDocument.counterType = '{aqua}'
                    guildDocument.save().then(async () => {
                      message.reply(`<:9204adminbadge:938280523388842014> » Tipo do contador foi alterado para **Aqua**.`)
                    })
                    const defaultChannel = await message.guild.channels.cache.get(guildDocument.counterChannel)
                    const contador = guildDocument.counterType
                    await
                    setTimeout(async () => {
                      defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.aqua(message.guild.memberCount)))
                    }, 5000)

                  }
                    break;
                  case 'violeta': {
                    guildDocument.counterType = '{violeta}'
                    guildDocument.save().then(async () => {
                      message.reply(`<:9204adminbadge:938280523388842014> » Tipo do contador foi alterado para **Violeta**.`)
                      const defaultChannel = await message.guild.channels.cache.get(guildDocument.counterChannel)
                      const contador = guildDocument.counterType
                      await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.violeta(message.guild.memberCount)))
                    })
                  }
                    break;
                  case 'rosa': {
                    guildDocument.counterType = '{rosa}'
                    guildDocument.save().then(async () => {
                      message.reply(`<:9204adminbadge:938280523388842014> » Tipo do contador foi alterado para **Rosa**.`)
                      const defaultChannel = await message.guild.channels.cache.get(guildDocument.counterChannel)
                      const contador = guildDocument.counterType
                      await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.rosa(message.guild.memberCount)))
                    })
                  }
                    break;
                  case 'ruby': {
                    guildDocument.counterType = '{ruby}'
                    guildDocument.save().then(async () => {
                      message.reply(`<:9204adminbadge:938280523388842014> » Tipo do contador foi alterado para **Ruby**.`)
                      const defaultChannel = await message.guild.channels.cache.get(guildDocument.counterChannel)
                      const contador = guildDocument.counterType
                      await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.ruby(message.guild.memberCount)))
                    })
                  }
                    break;
                  case 'exa': {
                    guildDocument.counterType = '{exa}'
                    guildDocument.save().then(async () => {
                      message.reply(`<:9204adminbadge:938280523388842014> » Tipo do contador foi alterado para **EXA**.`)
                      const defaultChannel = await message.guild.channels.cache.get(guildDocument.counterChannel)
                      const contador = guildDocument.counterType
                      await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.exa(message.guild.memberCount)))
                    })
                  }
                    break;
                  case 'redblack': {
                    guildDocument.counterType = '{redblack}'
                    guildDocument.save().then(async () => {
                      message.reply(`<:9204adminbadge:938280523388842014> » Tipo do contador foi alterado para **RedBlack**.`)
                      const defaultChannel = await message.guild.channels.cache.get(guildDocument.counterChannel)
                      const contador = guildDocument.counterType
                      await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.redblack(message.guild.memberCount)))
                    })
                  }
                    break;
                  case 'ice': {
                    guildDocument.counterType = '{ice}'
                    guildDocument.save().then(async () => {
                      message.reply(`<:9204adminbadge:938280523388842014> » Tipo do contador foi alterado para **ICE**.`)
                      const defaultChannel = await message.guild.channels.cache.get(guildDocument.counterChannel)
                      const contador = guildDocument.counterType
                      await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.ice(message.guild.memberCount)))
                    })
                  }
                    break;
                  case 'blk': {
                    guildDocument.counterType = '{blk}'
                    guildDocument.save().then(async () => {
                      message.reply(`<:9204adminbadge:938280523388842014> » Tipo do contador foi alterado para **BLK**.`)
                      const defaultChannel = await message.guild.channels.cache.get(guildDocument.counterChannel)
                      const contador = guildDocument.counterType
                      await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.blk(message.guild.memberCount)))
                    })
                  }

                }// END
              })
            })

          } // END CASE 2 2 2 2  2 2 2 2
            break;
          case '3': {

            if (!guildDocument.counterChannel) return message.reply(`<:ModMute:980288914914947113> » Este servidor não setou o canal do contador.`)

            message.reply(`<:ModMute:980288914914947113> » Indique a mensagem que será exibida.\n<:servers:963208373707341824> » Utilize \`{contador}\` para o contador ser exibido.`).then(() => {
              message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 60000, errors: ['time'], max: 1 }).on('collect', async message => {

                const cmessage = message.content

                guildDocument.counterMessage = cmessage
                guildDocument.save().then(async () => {

                  const msg = await message.reply(`<:9204adminbadge:938280523388842014> » Estou salvando a mensagem no banco de dados.`)
                  setTimeout(() => {
                    msg.edit({ content: `<:9204adminbadge:938280523388842014> **»** A mensagem do contador que será exibida foi setada com sucesso.` })
                  }, 5000)
                })

                const contador = guildDocument.counterType
                const defaultChannel = await message.guild.channels.cache.get(guildDocument.counterChannel)
                if (contador == '{azul}') {
                  await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.azul(message.guild.memberCount)))
                }
                if (contador == '{aqua}') {
                  await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.aqua(message.guild.memberCount)))
                }
                if (contador == '{violeta}') {
                  await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.violeta(message.guild.memberCount)))
                }
                if (contador == '{rosa}') {
                  await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.rosa(message.guild.memberCount)))
                }
                if (contador == '{ruby}') {
                  await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.ruby(message.guild.memberCount)))
                }
                if (contador == '{exa}') {
                  await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.exa(message.guild.memberCount)))
                }
                if (contador == '{redblack}') {
                  await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.redblack(message.guild.memberCount)))
                }
                if (contador == '{ice}') {
                  await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.ice(message.guild.memberCount)))
                }
                if (contador == '{blk}') {
                  await defaultChannel.setTopic(guildDocument.counterMessage.replace('{contador}', TranslateFunctions.blk(message.guild.memberCount)))
                }

              })
            })
          } // End
            break;
          case '4': {

            if (!guildDocument.counterChannel) return message.reply(`<:ModMute:980288914914947113> » Este servidor não setou o canal do contador.`)

            guildDocument.counterChannel = ''
            guildDocument.counterType = '{azul}'
            guildDocument.counterMessage = '{contador}'
            guildDocument.counterStatus = false

            guildDocument.save().then(async () => {
              const lastChannel = await message.guild.channels.cache.get(guildDocument.counterChannel)

              const msg = await message.reply(`<:9204adminbadge:938280523388842014> » Estou resetando as configurações no banco de dados.`)
              setTimeout(() => {
                msg.edit({ content: `<:9204adminbadge:938280523388842014> **»** A configurações do contador foram resetadas com sucesso.` })
              }, 5000)
            })

          }

        }
      })

    })

  }
}