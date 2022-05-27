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
    // buttons
    const block = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('block')
          .setLabel('Bloquear')
          .setStyle('DANGER'),
      );
    const unblock = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('unblock')
          .setLabel('Desbloquear')
          .setStyle('SUCCESS'),
      );
    const cancel = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('cancel')
          .setLabel('Cancelar')
          .setStyle('SECONDARY'),
      );

    const embedA = new MessageEmbed()

      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('MANAGE_MESSAGES'))
      return message.reply({ embeds: [embedA] })

    const embedlock = new MessageEmbed()
      .setColor(colors['default'])
      .setDescription(`<a:sireneRoxa:739828671400902697> ${message.author} realmente deseja lockar o chat <#${message.channel.id}>?`)

    const ell = await message.reply({ embeds: [embedlock], ephemeral: true, components: [block, unblock, cancel] })

    const embedlockado = new MessageEmbed()
      .setDescription(`<:concludo:739830713792331817> O canal <#${message.channel.id}> foi bloqueado com sucesso!`)
      .setColor(colors['default'])

    const embeddeslockado = new MessageEmbed()
      .setDescription(`<:concludo:739830713792331817> O canal <#${message.channel.id}> foi desbloqueado com sucesso!`)
      .setColor(colors['default'])

    // col.on('collect', async (reaction) => {
    //   console.log(reaction.emoji.id)
    //   switch (reaction.emoji.id) {
    //     case '739830713792331817':
    //       ell.edit({ embeds: [embedlockado] })
    //       message.channel.updateOverwrite(message.guild.id,
    //         { SEND_MESSAGES: false })
    //       break
    //     case '739831089543118890':
    //       ell.edit({ embeds: [embeddeslockado] })
    //       message.channel.updateOverwrite(message.guild.id,
    //         { SEND_MESSAGES: true })
    //       break
    //   }
    // })

  }
}