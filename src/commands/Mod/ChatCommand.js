const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class chat extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'chat'
    this.aliases = ['chat', 'lock', 'trava']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message) {
    const embedA = new MessageEmbed()

      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
      .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

    if (!message.member.permissions.cache.has('MANAGE_MESSAGES'))
      return message.reply({ embeds: [embedA] })

    const embedlock = new MessageEmbed()
      .setColor(colors['default'])
      .setDescription(`<a:sireneRoxa:739828671400902697> ${message.author} realmente deseja lockar o chat <#${message.channel.id}>?`)

    const ell = await message.reply(embedlock),
      emojis = ['739830713792331817', '739831089543118890'];//array de emojis

    for (const i in emojis) {//loop de reações na msg que defini acima
      await ell.react(emojis[i]);
    }

    const filter = (_, u) => (_ && u.id === message.author.id)

    const embedlockado = new MessageEmbed()
      .setDescription(`<:concludo:739830713792331817> O canal <#${message.channel.id}> foi bloqueado com sucesso!`)
      .setColor(colors['default'])

    const embeddeslockado = new MessageEmbed()
      .setDescription(`<:concludo:739830713792331817> O canal <#${message.channel.id}> foi desbloqueado com sucesso!`)
      .setColor(colors['default'])

    const col = ell.createReactionCollector({ filter, time: 180_000, errors: ['time'] })
    col.on('collect', async (reaction) => {
      console.log(reaction.emoji.id)
      switch (reaction.emoji.id) {
        case '739830713792331817':
          ell.edit(embedlockado)
          message.channel.updateOverwrite(message.guild.id,
            { SEND_MESSAGES: false })
          break
        case '739831089543118890':
          ell.edit(embeddeslockado)
          message.channel.updateOverwrite(message.guild.id,
            { SEND_MESSAGES: true })
          break
      }
    })

  }
}