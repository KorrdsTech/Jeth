const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class Punishment extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'Punishment'
    this.aliases = ['punicoes', 'punições', 'punishment']
    this.category = 'Mod'
  }

  async run(message, args) {
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)

    const emptyMessage = new MessageEmbed()
      .setColor(colors['default'])
      .setThumbnail('https://cdn.discordapp.com/emojis/938280523388842014.webp?size=96&quality=lossless')
      .setTitle('<:plus:955577453441597550> **Utilidades Punitivas:**', `${message.author.username}`, true)
      .setDescription('Criado para facilitar o gerenciamento de dados da database em seu servidor, facilitando a forma de utilizar os comandos.') // inline false
      .addField('*Define onde as logs de punições serão enviadas:*', `${guildDocument.prefix}*Punishment logs <#canal>*\n**Exemplo:** ${guildDocument.prefix}*Punishment logs #geral*`, false)
      .addField('*Remove canal de logs das punições:*', `${guildDocument.prefix}*Punishment remove <#canal>*`, false)
      .addField('**CONTROLE DE PUNIÇÕES AVANÇADO**', '\nEste módulo permite que opções de escolha como se o controle de banimentos por cargo possam ser acessados.', false)
      .addField('*Definir cargo de moderadores:*', `${guildDocument.prefix}*Punishment mods <@cargo>*\n**Exemplo:** ${guildDocument.prefix}*Punishment mods @moderador*`, false)
      .addField('*Ativar sistema de controle avançado:*', `${guildDocument.prefix}*Punishment ativar*`, false)
      .addField('*Desativar sistema de controle avançado:*', `${guildDocument.prefix}*Punishment desativar*`, false)

    const embedA = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_GUILD`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply({ embeds: [embedA] })

    if (args[0] === 'logs') {
      const channel = message.guild.channels.cache.find(c => c.name === args.slice(1).join(' ')) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
      if (!channel || channel.type === 'category') return message.reply('Coloque um canal válido!')
      guildDocument.punishChannel = channel.id
      guildDocument.save()
      message.reply('Canal definido com sucesso!')
      return (0);
    } else if (args[0] === 'remove') {
      guildDocument.punishChannel = ''
      guildDocument.save()
      message.reply('Canal removido com sucesso!')
      return (0);
    } else if (args[0] === 'mods') {
      const cargos = message.guild.roles.cache.find(r => r.name === args.slice(1).join(' ')) || message.guild.roles.cache.get(args[1]) || message.mentions.roles.first()
      if (!cargos) return message.reply('Por favor coloque um cargo valido!')
      guildDocument.moderadores = cargos.id
      guildDocument.save()
      message.reply('Cargo definido com sucesso!')
      return (0);
    } else if (args[0] === 'ativar') {
      guildDocument.wantModSysEnable = true
      guildDocument.save()
      message.reply('Sistema de moderação avançado ativado com sucesso.')
      return (0);
    } else if (args[0] === 'desativar') {
      guildDocument.wantModSysEnable = false
      guildDocument.save()
      message.reply('Sistema de moderação avançado desativado com sucesso.')
      return (0);
    }

    const embed2 = new MessageEmbed()
      .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setThumbnail('https://cdn.discordapp.com/emojis/938280523388842014.webp?size=96&quality=lossless')
      .setDescription(`Dúvidas de como está as configurações?\nAqui está os status`)
      .setColor(colors['lightgreen'])

    let canalMod = `<:errroror:1040860335147581511> Desativado`;
    if (guildDocument.punishChannel.length) {
      canalMod = `<:concludinho:1040860364251877427> Ativo | Canal: <#${guildDocument.punishChannel}>`;
    }
    embed2.addField('Sistema | Canal Punições:', canalMod);
    let cargoMod = `<:ModMute:980288914914947113> Desativado`;
    if (guildDocument.moderadores) {
      cargoMod = `<:concludinho:1040860364251877427> Ativo: <@&${guildDocument.moderadores}>`;
    }
    embed2.addField('Sistema | Cargo Moderador:', cargoMod);
    const final = guildDocument.wantModSysEnable ?
      `<:concludinho:1040860364251877427> Ativo` :
      `<:errroror:1040860335147581511> Desativado`
    embed2.addField('O Sistema está:', final)

    let embedCount = 1

    if (!args[0]) message.reply({ embeds: [emptyMessage] }).then(async m => {

      await m.react('1040856493920096286') // ir para frente
      const filter = (e, u) => (u.id == message.author.id) & (e.emoji.id == '1040856493920096286' || e.emoji.name == '◀️')
      const col = m.createReactionCollector({ filter, time: 180_000, errors: ['time'] })
      col.on('collect', async (e) => {
        if (embedCount != 2 && e.emoji.id == '1040856493920096286') { // ir para frente

          await m.react('◀️')
          e.users.cache.map(u => e.remove(u.id))
          m.edit({ embeds: [embed2] })
          embedCount = 2
          await m.react('◀️') // volta para trás
        } else if (e.emoji.name == '◀️' && embedCount == 2) {
          await m.react('1040856493920096286')
          e.users.cache.map(u => e.remove(u.id))
          m.edit({ embeds: [emptyMessage] })
          embedCount = 1
        }
      })
    })
  }
}