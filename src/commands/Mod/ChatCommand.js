const { Command, colors } = require('../../utils')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = class chat extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'chat'
    this.aliases = ['chat', 'lock', 'trava']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message) {
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id) //Db
    if (guildDocument.wantModSysEnable === true) {
      const actions = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('lock')
            .setLabel('Bloquear')
            .setStyle('DANGER'),
          new MessageButton()
            .setCustomId('unlock')
            .setLabel('Desbloquear')
            .setStyle('SUCCESS'),
          new MessageButton()
            .setCustomId('cancel')
            .setLabel('Cancelar')
            .setStyle('SECONDARY'),
        );

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

      const role = message.guild.roles.cache.get(guildDocument.moderadores)

      if (!guildDocument.moderadores) {
        message.channel.send({ embeds: [embedB] })
        return
      }
      if (!message.member.roles.cache.has(role.id)) {
        message.channel.send({ embeds: [embedPerm] })
        return
      }

      const embedToLock = new MessageEmbed()
        .setColor(colors['default'])
        .setDescription(`<:apppending:1040856493920096286> ${message.author} qual acão você deseja fazer em <#${message.channel.id}>?`)

      const ell = await message.reply({ embeds: [embedToLock], components: [actions] })

      const embedLocked = new MessageEmbed()
        .setDescription(`<:concludinho:1040860364251877427> O canal <#${message.channel.id}> foi bloqueado com sucesso!`)
        .setColor(colors['default'])

      const embedUnlocked = new MessageEmbed()
        .setDescription(`<:concludinho:1040860364251877427> O canal <#${message.channel.id}> foi desbloqueado com sucesso!`)
        .setColor(colors['default'])

      const collector = ell.createMessageComponentCollector({
        filter: (i) => i.user.id === message.author.id && i.message.id === ell.id,
        max: 1,
      })
      collector.on('collect', (interaction) => {
        interaction.deferUpdate();
        switch (interaction.customId) {
          case 'lock':
            message.channel.edit({
              permissionOverwrites: [
                {
                  id: message.guildId,
                  type: 'role',
                  deny: ['SEND_MESSAGES']
                }
              ]
            })
            ell.edit({ embeds: [embedLocked], components: [] })
            break;
          case 'unlock':
            message.channel.edit({
              permissionOverwrites: [
                {
                  id: message.guildId,
                  type: 'role',
                  allow: ['SEND_MESSAGES']
                }
              ]
            })
            ell.edit({ embeds: [embedUnlocked], components: [] })
            break;
          case 'cancel':
            if (ell.deletable) ell.delete();
            break;
        }
      });
    } else if (guildDocument.wantModSysEnable === false) {
      const actions = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('lock')
            .setLabel('Bloquear')
            .setStyle('DANGER'),
          new MessageButton()
            .setCustomId('unlock')
            .setLabel('Desbloquear')
            .setStyle('SUCCESS'),
          new MessageButton()
            .setCustomId('cancel')
            .setLabel('Cancelar')
            .setStyle('SECONDARY'),
        );

      const embedNoPermission = new MessageEmbed()
        .setTimestamp()
        .setColor(colors['mod'])
        .setTitle('**Err:**', true)
        .setDescription('Missing Permissions') // inline false
        .addField('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
        .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })

      if (!message.member.permissions.has('MANAGE_MESSAGES'))
        return message.reply({ embeds: [embedNoPermission] })

      const embedToLock = new MessageEmbed()
        .setColor(colors['default'])
        .setDescription(`<:apppending:1040856493920096286> ${message.author} qual acão você deseja fazer em <#${message.channel.id}>?`)

      const ell = await message.reply({ embeds: [embedToLock], components: [actions] })

      const embedLocked = new MessageEmbed()
        .setDescription(`<:concludinho:1040860364251877427> O canal <#${message.channel.id}> foi bloqueado com sucesso!`)
        .setColor(colors['default'])

      const embedUnlocked = new MessageEmbed()
        .setDescription(`<:concludinho:1040860364251877427> O canal <#${message.channel.id}> foi desbloqueado com sucesso!`)
        .setColor(colors['default'])

      const collector = ell.createMessageComponentCollector({
        filter: (i) => i.user.id === message.author.id && i.message.id === ell.id,
        max: 1,
      })
      collector.on('collect', (interaction) => {
        interaction.deferUpdate();
        switch (interaction.customId) {
          case 'lock':
            message.channel.edit({
              permissionOverwrites: [
                {
                  id: message.guildId,
                  type: 'role',
                  deny: ['SEND_MESSAGES']
                }
              ]
            })
            ell.edit({ embeds: [embedLocked], components: [] })
            break;
          case 'unlock':
            message.channel.edit({
              permissionOverwrites: [
                {
                  id: message.guildId,
                  type: 'role',
                  allow: ['SEND_MESSAGES']
                }
              ]
            })
            ell.edit({ embeds: [embedUnlocked], components: [] })
            break;
          case 'cancel':
            if (ell.deletable) ell.delete();
            break;
        }
      });
    }
  }
}
