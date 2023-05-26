const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class saida extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'saida'
    this.aliases = ['saida', 'bye', 'bye-bye', 'leave']
    this.category = 'Mod'
  }

  async run(message, args) {
    const embedA = new MessageEmbed()

      .setTimestamp()
      .setColor(colors['default'])
      .setTitle('**Err:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_GUILD`', true)
       
    if (!message.member.permissions.has('MANAGE_GUILD'))
      return message.reply({ embeds: [embedA] })
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)
    if (args[0] === 'canal') {
      const channel = message.guild.channels.cache.find(c => c.name === args.slice(1).join(' ')) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
      if (!channel || channel.type === 'category') return message.reply('Coloque um canal válido!')

      guildDocument.channelsaida = channel.id
      guildDocument.save().then(async () => {
        await message.reply(`Canal definido: ${channel}`)
      })
    } else if (args[0] === 'mensagem') {
      const mensagem = args.slice(1).join(' ')

      if (!mensagem) return message.reply(`Coloque qual será a mensagem do saida, lembre-se nósso sistema aceita embed...`)

      guildDocument.saidaMessage = mensagem
      guildDocument.save().then(async () => {
        guildDocument.saidaModule = true
        guildDocument.save().then(async () => {
          const defaultChannel = await message.guild.channels.cache.get(guildDocument.channelsaida)
          if (!defaultChannel) return message.reply(`Este servidor não possui um canal definido no saida...\nUse: \`${message.prefix}saida canal #canal\` para definir um e use o comando novamente!`)
          await message.reply(`Mensagem definida\nsaida Ativado...`)
        })
      })
    } else if (args[0] === 'desativar') {
      if (!guildDocument.saidaModule) return message.reply(`Este servidor não possui um saida ativado!`)
      const lastChannel = message.guild.channels.cache.get(guildDocument.channelsaida)
      guildDocument.saidaModule = false
      guildDocument.channelsaida = ''
      guildDocument.saidaMessage = ''

      guildDocument.save().then(async () => {
        await message.reply(`O saida foi removido do canal ${lastChannel} e desativado`)
      })
    } else {
      const embed = new MessageEmbed()
        .setAuthor({ name: this.client.user.tag, iconURL: this.client.user.displayAvatarURL({ dynamic: true, size: 1024 })})
        .setDescription(`Dúvidas de como usar a Saida?\nAqui vai algumas dicas...`)
        .setColor(colors['default'])
        .addField('Modos de usar', [
          `\`${guildDocument.prefix}saida canal #canal\` - Define o canal onde o saida será definido.`,
          `\`${guildDocument.prefix}saida mensagem <mensagem>\` - Define a mensagem que será exibida no saida.`,
          `\`${guildDocument.prefix}saida desativar\` - Caso haja algum saida ligado/definido, ele será removido e o sistema desligado.`,
          `\n**Lembre-se se ver os \`Placeholders\` abaixo para não errar nada!**\n`
        ].join('\n'), false)
        .addField('Placeholders', [
          `O sistema de saida(leave-member) aceita embed!`,
          `Não sabe fazer uma? é facil clique aqui: **[[CLIQUE]](https://leovoel.github.io/embed-visualizer/)**`,
          `**[Utilize ${guildDocument.prefix}embed para mais informações]**`,
          `\n**Lembre-se se ver os \`Parâmetros\` abaixo para não errar nada!**\n`
        ].join('\n'), false)
        .addField('Parâmetros.', [
          '**${USER}** - Para marcar o membro na entrada.',
          '**${AVATAR}** - Para definir o avatar do membro.',
          '**${USER-ID}** - Para definir o **ID** do membro.',
          '**${USER-NAME}** - Para definir o nome do membro.',
        ].join('\n'), false)

      const embed2 = new MessageEmbed()
        .setAuthor({  name: this.client.user.tag, iconURL: this.client.user.displayAvatarURL({ dynamic: true, size: 1024 })})
        .setDescription(`Dúvidas de como esta a saida do servidor?\nAqui vai o seu painel...`)
        .setColor(colors['default'])
      let canalBemVindo = `<:errroror:1040860335147581511> Desativado`;
      if (guildDocument.channelsaida.length) {
        canalBemVindo = `<:concludinho:1040860364251877427> Ativo | Canal: <#${guildDocument.channelsaida}>`;
      }
      embed2.addField('saida | Canal de saida:', canalBemVindo);
      let MsgCount = `<:errroror:1040860335147581511> Desativado`;
      if (guildDocument.saidaMessage.length) {
        MsgCount = `<:concludinho:1040860364251877427> Ativo | Mensagem: ${guildDocument.saidaMessage.length > 800 ? `${guildDocument.saidaMessage.slice(0, 801)}[...]` : guildDocument.saidaMessage}`;
      }
      embed2.addField('Saida | Mensagem de Saida:', MsgCount);
      const msgsaida = guildDocument.saidaModule ?
        `<:concludinho:1040860364251877427> Ativo` :
        `<:errroror:1040860335147581511> Desativado`
      embed2.addField('saida está:', msgsaida)

      let embedCount = 1
      message.reply({ embeds: [embed] }).then(async m => {
        await m.react('1040856493920096286')// ir para frente
        const filter = (e, u) => (u.id == message.author.id) & (e.emoji.id == '1040856493920096286' || e.emoji.name == '◀️')
        const col = m.createReactionCollector({ filter, time: 180_000, errors: ['time'] })
        col.on('collect', async (e) => {
          if (embedCount != 2 && e.emoji.id == '1040856493920096286') { // ir para frente

            await m.react('◀️')
            e.users.cache.map(u => e.remove(u.id))
            m.edit({ embeds: [embed2] })
            embedCount = 2
            await m.react('◀️')// volta para trás
          } else if (e.emoji.name == '◀️' && embedCount == 2) {

            await m.react('1040856493920096286')
            e.users.cache.map(u => e.remove(u.id))

            m.edit({ embeds: [embed] })
            embedCount = 1
          }
        })
      })
    }
  }
}