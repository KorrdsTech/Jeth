const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class blockdiv extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'blockdiv'
    this.aliases = ['div', 'antidiv', 'anticonvite']
    this.category = 'Mod'
  }

  async run(message, args) {
    const erroDePermissão = new MessageEmbed()
      .setTimestamp()
      .setColor(colors.mod)
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`ADMINISTRATOR`', true)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))

    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({ embeds: [erroDePermissão] })
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)
    if (args[0] === 'canal') {
      const channel = message.guild.channels.cache.find(c => c.name === args.slice(1).join(' ')) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
      if (!channel || channel.type === 'category') return message.channel.send('Coloque um canal válido!')

      guildDocument.infoantinv = channel.id
      guildDocument.save().then(async () => {
        await message.channel.send(`Canal definido: ${channel}`)
      })
    } else if (args[0] === 'desativar') {
      if (!guildDocument.antInvite) return message.channel.send(`O Módulo de ant-invite já está desativado OU seu módulo não possui um canal definido.`)
      guildDocument.antInvite = false
      guildDocument.infoantinv = ''
      guildDocument.save()
      message.channel.send('Okay o módulo de Anti-Convite foi desativado.')
    } else if (args[0] === 'ativar') {
      if (!guildDocument.infoantinv) return message.channel.send('Este servidor não tem um canal de log de invite setado. utilize' + guildDocument.prefix + 'antiinvite #canal')
      guildDocument.antInvite = true
      guildDocument.save()
      message.channel.send('Okay o módulo de Anti-Convite foi Ativado.')
    } else {
      const embed = new MessageEmbed()
      embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
      embed.setColor(colors.default)
      embed.setDescription(`Dúvidas de como usar o Counter?\nAqui vai algumas dicas...`)
      embed.addField('Modos de usar', [
        `\`${guildDocument.prefix}div canal #canal\` - Define o canal onde será definido o log de Anti-Invite.`,
        `\`${guildDocument.prefix}div ativar \` - Para ligar o sistema de Anti-Invite.`,
        `\`${guildDocument.prefix}div desativar\` - Caso haja algum Anti-Invite ligado/definido, ele será removido e o sistema desligado.`,
      ].join('\n'), false)

      const embed2 = new MessageEmbed()
        .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(`Dúvidas de como esta o Anti-Invite?\nAqui vai o seu painel...`)
        .setColor(colors.default)
      let canalBemVindo = `<:rejected:739831089543118890> Desativado`;
      if (guildDocument.infoantinv.length) {
        canalBemVindo = `<:concludo:739830713792331817> Ativo | Canal: <#${guildDocument.infoantinv}>`;
      }
      embed2.addField('Anti-Invite | Define o canal de logs anti-invite:', canalBemVindo);
      const msgWelcome = guildDocument.antInvite ?
        `<:concludo:739830713792331817> Ativo` :
        `<:rejected:739831089543118890> Desativado`
      embed2.addField('Anti-Invite está:', msgWelcome)

      let embedCount = 1
      message.channel.send({ embeds: [embed] }).then(async m => {
        await m.react('666762183249494027')// ir para frente
        const filter = (e, u) => (u.id == message.author.id) & (e.emoji.id == '666762183249494027' || e.emoji.id == '665721366514892839')
        const col = m.createReactionCollector({ filter, time: 180_000, errors: ['time'] })
        col.on('collect', async (e) => {
          if (embedCount != 2 && e.emoji.id == '666762183249494027') { // ir para frente

            await m.react('665721366514892839')
            e.users.cache.map(u => e.remove(u.id))
            m.edit(embed2)
            embedCount = 2
            await m.react('665721366514892839')// volta para trás
          } else if (e.emoji.id == '665721366514892839' && embedCount == 2) {

            await m.react('666762183249494027')
            e.users.cache.map(u => e.remove(u.id))

            m.edit({ embeds: [embed] })
            embedCount = 1
          }
        })
      })
    }
  }
}