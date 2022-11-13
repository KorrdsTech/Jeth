const { Command, colors } = require('../../utils')
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js')
const modelBan = require('../../utils/database/collections/Bans');

module.exports = class BanCommand extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'ban'
    this.aliases = ['ban', 'banir', 'vaza', 'some']
    this.category = 'Mod'
    this.bot_permissions = ['BAN_MEMBERS']
  }

  async run(message, args) {
    const emptyMessage = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Ban:**', `${message.author.username}`, true)
      .setDescription('Criado para facilitar a punição de usuários do seu servidor.') // inline false
      .addFields({ name: '*Uso do comando:*', value: '`Ban <@user> [motivo]`', inline: true })
      .addFields({ name: '*Exemplo:*', value: '`Ban @Solaris#0006 Ban hammer has spoken!`', inline: true })
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    const embedA = new MessageEmbed()

      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addFields({ name: '*Verifique se você possui a permissão:*', value: '`BAN_MEMBERS`', inline: true })
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply({ embeds: [embedA] })
    const userDocuent = await this.client.database.user.getOrCreate(message.author.id)
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id) //Db
    const log = this.client.channels.cache.get(guildDocument.punishChannel) // Com log
    const razao = args.slice(1).join(' ');

    let documentBans = await modelBan.findOne({
      guildID: message.guild.id,
      userID: message.author.id,
    }).catch(err => console.log(err))

    if (!documentBans) {
      documentBans = new modelBan({
        guildID: message.guild.id,
        userID: message.author.id,
      })

      await documentBans.save().catch(err => console.log(err))
    }

    if (!log) return message.reply(`<:ModMute:980288914914947113> » Este servidor não possui o canal de logs de ounições setado.\n<:reinterjection:955577574304657508> » Utilize \`${guildDocument.prefix}PunishmentLogs\` para saber mais.`)

    if (!args[0]) return message.reply({ embeds: [emptyMessage] })
    const usuario = await this.client.users.fetch(args[0]?.replace(/[<@!>]/g, '')).catch(() => console.log()) // SIM, você consegue banir gente que n esta no seu servidor | Solução para o if funcionar, n tava conseguindo ness porr | Console n retorna nada pq da erro mas n da, sacou?
    if (!usuario) return message.reply({ embeds: [emptyMessage] })

    // Motivos

    const primeiro = 'Conteúdo pornográfico/Gore.'
    const segundo = 'Promover ou participar de Raids a outros servidores.'
    const terceiro = 'Discurso de ódio ou Racismo e derivados.'
    const quarto = 'Apologia ao Nazismo e/ou pornografia infântil.'
    const quinto = 'Ações que comprometem o servidor/usuários.'
    const sexto = 'Divulgação inapropriada.'
    const setimo = 'Roubo de contas digitais/scam.'

    const bans = await message.guild.bans.fetch(); // Check ban

    if (bans.get(usuario.id)) return message.reply(`<:ModMute:980288914914947113> » Este usuário já se encontra banido.`)

    const mentionedMember = message.guild.members.cache.get(usuario.id)

    if (mentionedMember) {
      const mentionedPotision = mentionedMember.roles.highest.position
      const memberPosition = message.member.roles.highest.position
      const botPotision = message.guild.me.roles.highest.position

      if (memberPosition <= mentionedPotision) return message.reply(`<:ModMute:980288914914947113> » Você não pode banir esse usuário, pois o seu cargo é menor/equivalente ao dele.`)

      else if (botPotision <= mentionedPotision) return message.reply(`<:ModMute:980288914914947113> » Eu não posso banir esse usuário, pois o cargo dele é maior que o meu.`)
    }

    const dashboard = new MessageEmbed()
      .setAuthor({ name: `${message.guild.name} | Dashboard Trust & Safety`, iconURL: this.client.user.avatarURL({ dynamic: true, size: 1024 }) })
      .setDescription(`<:reinterjection:955577574304657508> » Aplique uma punição de banimento em um usuário.`)
      .addFields([
        { name: `Informação do Usuário:`, value: `> <:members:963208373644447764> **Usuário:** ${usuario}\n> <:plus:955577453441597550> **ID:** ${usuario.id}\n> <:roles:963208373606682725> **Conta criada em:** <t:${~~(usuario.createdTimestamp / 1000)}:F>` },
        { name: `Configuração do Sistema:`, value: `> <:ModMute:980288914914947113> **» Selecione qualquer opção na lista para continuar.**` }
      ])
      .setFooter({ text: `${message.author.username}, você tem 3 minutos para interagir.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setThumbnail('https://cdn-icons.flaticon.com/png/512/3694/premium/3694290.png?token=exp=1653835711~hmac=be1fd43871e4498590084d1b61752139')
      .setColor(colors.mod) // Troca isso dps
      .setTimestamp();

    const raw = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('yes')
        .setLabel('Confirmar')
        .setStyle('SUCCESS')
        .setDisabled(false),

      new MessageButton()
        .setCustomId('esc')
        .setLabel('Cancelar')
        .setStyle('DANGER')
        .setDisabled(false)
    );

    const rew = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('ban-menu')
          .setPlaceholder('🛡 Selecione o motivo(s) do banimento.')
          .setMinValues(1)
          .setMaxValues(7)
          .addOptions([
            {
              label: primeiro,//Nome da option
              value: primeiro,//Valor do emoji, o id dele no buttons
              emoji: `<a:1r:940889951615205376>`, //emoji q vai ficar grandão do lado do texto
            },
            {
              label: segundo,
              value: segundo,
              emoji: `<a:2r:940889962889494618>`,
            },
            {
              label: terceiro,
              value: terceiro,
              emoji: `<a:3r:940889962772045895>`,
            },
            {
              label: quarto,
              value: quarto,
              emoji: `<a:4r:940889960800739328>`,
            },
            {
              label: quinto,
              value: quinto,
              emoji: `<a:5r:940889962767855627>`,
            },
            {
              label: sexto,
              value: sexto,
              emoji: `<a:6r:940889963216650291>`,
            },
            {
              label: setimo,
              value: setimo,
              emoji: `<a:7r:940889958749728779>`,
            },
          ]),
      )

    if (!razao) message.reply({ embeds: [dashboard], ephemeral: true, components: [rew] }).then(msg => {

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
        switch (x.values) {

          case x.values: {

            message.reply({ content: `❓ » Você confirma o banimento de ${usuario} pelo(s) motivo(s) abaixo?\n\`\`\`diff\n- ${x.values.join('\n- ')}\`\`\``, components: [raw] })

            const collector = message.channel.createMessageComponentCollector({
              componentType: 'BUTTON',
              time: 60000,
              max: 1,
            });

            collector.on('collect', i => {

              if (i.user.id != message.author.id)
                return

              switch (i.customId) {

                case 'yes': { // no

                  const puni = new MessageEmbed() // Trust e Safety Embed
                    .setAuthor({ name: `${message.guild.name} | Trust & Safety - Banimento`, iconURL: this.client.user.avatarURL({ dynamic: true, size: 1024 }) })
                    .addFields([
                      {
                        name: `<:author:982837926150963220> | Usuário banido:`,
                        value: `<:members:963208373644447764> **Tag:** \`${usuario.tag}\`\n<:plus:955577453441597550> **ID:** \`${usuario.id}\``,
                        inline: false
                      },
                      {
                        name: `<:author:982837926150963220> | Staff:`,
                        value: `<:staff:982837873919279114> **Tag:** \`${message.author.tag}\`\n<:plus:955577453441597550> **ID:** \`${message.author.id}\``,
                        inline: false
                      },
                      {
                        name: `<:clips:982837820823601173> | Motivo(s):`,
                        value: `<:plus:955577453441597550> **${x.values.join(`\n<:plus:955577453441597550> `)}**`,
                        inline: false
                      },
                      {
                        name: `📅 | Data:`,
                        value: `<:plus:955577453441597550> **<t:${~~(new Date() / 1000)}:F>**`,
                        inline: false
                      },
                    ])
                    .setFooter({ text: `${message.author.username} já baniu ${documentBans.bans} usuários.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setThumbnail('https://cdn-icons.flaticon.com/png/512/3694/premium/3694290.png?token=exp=1653835711~hmac=be1fd43871e4498590084d1b61752139')
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
                    .setImage(`${userDocuent.gifban || ''}`)
                    .setColor(colors.mod) // Troca isso dps, se nunca troca neh solaris prr
                    .setTimestamp();

                  const puni1 = new MessageEmbed() // Trust e Safety Embed
                    .setTitle('Ação | Ban')
                    .addFields([
                      {
                        name: `<:author:982837926150963220> | Usuário banido:`,
                        value: `<:members:963208373644447764> **Tag:** \`${usuario.tag}\`\n<:plus:955577453441597550> **ID:** \`${usuario.id}\``,
                        inline: false
                      },
                      {
                        name: `<:author:982837926150963220> | Staff:`,
                        value: `<:staff:982837873919279114> **Tag:** \`${message.author.tag}\`\n<:plus:955577453441597550> **ID:** \`${message.author.id}\``,
                        inline: false
                      },
                      {
                        name: `<:clips:982837820823601173> | Motivo(s):`,
                        value: `<:plus:955577453441597550> **${razao}**`,
                        inline: false
                      },
                      {
                        name: `📅 | Data:`,
                        value: `<:plus:955577453441597550> **<t:${~~(new Date() / 1000)}:F>**`,
                        inline: false
                      },
                    ])
                    .setFooter({ text: `${message.author.username} já baniu ${documentBans.bans} usuários.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setThumbnail('https://cdn-icons.flaticon.com/png/512/3694/premium/3694290.png?token=exp=1653835711~hmac=be1fd43871e4498590084d1b61752139')
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
                    .setImage(`${userDocuent.gifban || ''}`)
                    .setColor(colors.mod) // Troca isso dps, se nunca troca neh solaris prr
                    .setTimestamp();

                  documentBans.bans += 1
                  documentBans.save().catch(err => console.log(err))

                  if (!razao) {
                    message.guild.bans.create(usuario.id, { reason: `${x.values.join(' | ')}` }) // Oxi?? ja foikk
                    log.send({ embeds: [puni] }) // Log
                    message.reply(`<:staff:982837873919279114> » Usuário banido com sucesso.`) // Check
                    return usuario.send({ content: `<:ModMute:980288914914947113> » Olá ${usuario}! Venho avisar que você foi banido do servidor **${message.guild.name}**.\n🧾 » Segue abaixo a log do seu banimento:`, embeds: [puni] }).catch(() => console.log(`Não consegui mandar DM ao usuário: ${usuario.tag}`))
                  }
                  else {
                    message.guild.bans.create(usuario.id, { reason: `${razao}` })
                    log.send({ embeds: [puni1] }) // Log
                    message.reply(`<:staff:982837873919279114> » Usuário banido com sucesso.`) // Check
                    return usuario.send({ content: `<:ModMute:980288914914947113> » Olá ${usuario}! Venho avisar que você foi banido do servidor **${message.guild.name}**.\n🧾 » Segue abaixo a log do seu banimento:`, embeds: [puni1] }).catch(() => console.log(`Não consegui mandar DM ao usuário: ${usuario.tag}`))
                  }

                }
                case 'esc': { // yes
                  message.reply(`<:ModMute:980288914914947113> » Processo de banimento cancelado com sucesso.`) // Tchau
                }

              }
            })

          }

        }

      }) //

    })

  }
}
