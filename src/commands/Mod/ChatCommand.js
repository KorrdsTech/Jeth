const { Command, colors } = require('../../utils')
const { MessageActionRow, MessageButton, EmbedBuilder } = require('discord.js')

module.exports = class chat extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'chat'
    this.aliases = ['chat', 'lock', 'trava']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }
  async run(message) {
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

    const embedNoPermission = new EmbedBuilder()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addFields('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('MANAGE_MESSAGES'))
      return message.reply({ embeds: [embedNoPermission] })

    const embedToLock = new EmbedBuilder()
      .setColor(colors['default'])
      .setDescription(`<a:sireneRoxa:739828671400902697> ${message.author} qual acão você deseja fazer em <#${message.channel.id}>?`)

    const ell = await message.reply({ embeds: [embedToLock], components: [actions] })

    const embedLocked = new EmbedBuilder()
      .setDescription(`<:concludo:739830713792331817> O canal <#${message.channel.id}> foi bloqueado com sucesso!`)
      .setColor(colors['default'])

    const embedUnlocked = new EmbedBuilder()
      .setDescription(`<:concludo:739830713792331817> O canal <#${message.channel.id}> foi desbloqueado com sucesso!`)
      .setColor(colors['default'])

    const collector = ell.createMessageComponentCollector({
      filter: (i) => i.user.id === message.author.id && i.message.id === ell.id,
      max: 1,
    })
    collector.on("collect", (interaction) => {
      interaction.deferUpdate();
      switch (interaction.customId) {
        case "lock":
          message.channel.edit({
            permissionOverwrites: [
              {
                id: message.guildId,
                type: "role",
                deny: ["SEND_MESSAGES"]
              }
            ]
          })
          ell.edit({ embeds: [embedLocked], components: [] })
          break;
        case "unlock":
          message.channel.edit({
            permissionOverwrites: [
              {
                id: message.guildId,
                type: "role",
                allow: ["SEND_MESSAGES"]
              }
            ]
          })
          ell.edit({ embeds: [embedUnlocked], components: [] })
          break;
        case "cancel":
          if (ell.deletable) ell.delete();
          break;
      }
    });
  }
}