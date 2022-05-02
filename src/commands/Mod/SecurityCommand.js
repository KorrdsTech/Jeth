const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class security extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'security'
    this.aliases = ['div', 'antidiv', 'anticonvite', 'anti-spam', 'bsf']
    this.category = 'Mod'
  }

  async run(message, args) {
    const erroDePermissão = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`ADMINISTRATOR`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ embeds: [erroDePermissão] })
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)
    if (args[0] === 'canal') {
      const channel = message.guild.channels.cache.find(c => c.name === args.slice(1).join(' ')) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
      if (!channel || channel.type === 'category') return message.reply('Coloque um canal válido!')

      guildDocument.infoantinv = channel.id
      guildDocument.save().then(async () => {
        await message.reply(`Canal definido: ${channel}`)
      })
    } else if (args[0] === 'desativar') {
      if (!guildDocument.antInvite) return message.reply(`O Módulo de ant-invite já está desativado OU seu módulo não possui um canal definido.`)
      guildDocument.antInvite = false
      guildDocument.infoantinv = ''
      guildDocument.save()
      message.reply('Okay o módulo de Anti-Invite foi desativado.')
    } else if (args[0] === 'ativar') {
      if (!guildDocument.infoantinv) return message.reply('Este servidor não tem um canal de log de invite setado. utilize' + guildDocument.prefix + 'antiinvite #canal')
      guildDocument.antInvite = true
      guildDocument.save()
      message.reply('Okay o módulo de Anti-Invite foi Ativado.')
    } else if (args[0] === 'ligar') {
      if (!guildDocument.infoantspam) return message.reply('O módulo não está configurado, verifique a mensagem definida.')
      guildDocument.antSpam = true
      guildDocument.save().then(
        message.reply('Okay o módulo de BSF foi ativado.'))
    } else if (args[0] === 'desligar') {
      if (!guildDocument.antSpam) return message.reply(`O Módulo BlockSpamFlood já está desativado OU seu módulo não possui um canal definido.`)
      guildDocument.antSpam = false
      guildDocument.infoantspam = '[AUTOMOD] Spam/Flood em canais de texto.'
      guildDocument.timerSpam = '10m'
      guildDocument.save().then(
        message.reply('Okay o módulo de BSF foi desativado.'))
    } else if (args[0] === 'reason') {
      const mensagem = args.join(' ').slice(7);
      if (!mensagem) return message.reply('Exemplo de uso: *-bsf mensagem* isto é um teste')
      guildDocument.infoantspam = mensagem
      guildDocument.save().then(async () => {
        message.reply(`Mensagem definida: ${mensagem}`)
      })
    } else if (args[0] === 'timer') {
      const tempo = args[1];
      if (!tempo) return message.reply('Exemplo de uso: *-bsf timer* 1d')
      guildDocument.timerSpam = tempo
      guildDocument.save().then(async () => {
        message.reply(`Timer definido: ${tempo}`)
      })
    } else {
      const embed = new MessageEmbed()
      embed.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })
      embed.setColor(colors['default'])
      embed.setDescription(`Dúvidas de como usar o Módulo de Segurança?\nAqui vai algumas dicas...`)
      embed.addField('Modos de usar', [
        `**BLOQUEAR DIVULGAÇÃO DE SERVIDORES**`,
        `\`${guildDocument.prefix}div canal <#CANAL>\` - Define o canal onde será definido o log de Anti-Invite.`,
        `\`${guildDocument.prefix}div ativar \` - Para ligar o sistema de Anti-Invite.`,
        `\`${guildDocument.prefix}div desativar\` - Caso haja algum Anti-Invite ligado/definido, ele será removido e o sistema desligado.`,
        `**BLOQUEAR SPAM/FLOOD**`,
        `\`${guildDocument.prefix}bsf reason <MENSAGEM>\` - Altera a mensagem padrão que irá para as logs, razão pela qual o usuário foi punido por spam. (caso deixe vazio será subistituida por um padrão DEFAULT)`,
        `\`${guildDocument.prefix}bsf timer <VALOR>\` - Altera o tempo em que o usuário permanecerá bloqueado das ativades do servidor por spam/flood. (caso deixe vazio será subistituida por um padrão DEFAULT)`,
        `\`${guildDocument.prefix}bsf ligar \` - Para ligar o sistema de Anti-Spam.`,
        `\`${guildDocument.prefix}bsf desligar\` - Caso haja algum Anti-Spam ligado/definido, ele será removido e o sistema desligado.`,
      ].join('\n'), false)

      const embed2 = new MessageEmbed()
        .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(`Dúvidas de como está o Anti-Invite/BlockSpamFlood-BSF? \nAqui vai o seu painel...`)
        .setColor(colors['default'])
      let canalBemVindo = `<:rejected:739831089543118890> Desativado`;
      let canalteste = `<:rejected:739831089543118890> Desativado`;
      if (guildDocument.infoantinv.lenght > 0) {
        canalBemVindo = `<:concludo:739830713792331817> Ativo | Canal: <#${guildDocument.infoantinv}>`;
      }
      if (guildDocument.infoantspam.lenght > 0) {
        canalteste = `<:concludo:739830713792331817> Ativo | Mensagem: ${guildDocument.infoantspam}`;
      }
      embed2.addField('Anti-Invite | Define o canal de logs anti-invite:', canalBemVindo);
      embed2.addField('BlockSpamFlood-BSF | Mensagem definida de logs:', canalBemVindo);
      const msgWelcome = guildDocument.antInvite ?
        `<:concludo:739830713792331817> Ativo` :
        `<:rejected:739831089543118890> Desativado`
      embed2.addField('Anti-Invite está:', msgWelcome);
      const msgSpam = guildDocument.antSpam ?
        `<:concludo:739830713792331817> Ativo` :
        `<:rejected:739831089543118890> Desativado`
      embed2.addField('BlockSpamFlood-BSF está:', msgSpam);

      let embedCount = 1
      message.reply({ embeds: [embed] }).then(async m => {
        await m.react('666762183249494027')// ir para frente
        const filter = (e, u) => (u.id == message.author.id) & (e.emoji.id == '666762183249494027' || e.emoji.id == '665721366514892839')
        const col = m.createReactionCollector({ filter, time: 180_000, errors: ['time'] })
        col.on('collect', async (e) => {
          if (embedCount != 2 && e.emoji.id == '666762183249494027') { // ir para frente

            await m.react('665721366514892839')
            e.users.cache.map(u => e.remove(u.id))
            m.edit({ embeds: [embed2] })
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