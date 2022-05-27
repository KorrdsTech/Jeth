const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class suggestion extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'suggestion'
    this.aliases = ['suggestion', 'sugestão']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const erroDePermissão = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_GUILD`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('MANAGE_GUILD'))
      return message.reply({ embeds: [erroDePermissão] })

    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)
    const documento = await this.client.database.guild.getOrCreate(message.guild.id)
    const prefix = documento.prefix
    const mododeuso = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['default'])
      .setTitle('**PAINEL DE AJUDA**')
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(`Para definir o canal de sugestão basta utilizar o comando\n **${prefix}suggestion canal <#canal>** \n\nAssim que o canal for definido, qualquer mensagem enviada nele, receberá a reação dos emojis Sim, não ou não especificado.\nCaso queira desativar o canal de sugestões basta utilizar \n**${prefix}suggestion remover**`) // inline false
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })

    if (!args[0]) message.reply({ embeds: [mododeuso] })
    if (args[0] === 'canal') {
      const channel = message.guild.channels.cache.find(c => c.name === args.slice(1).join(' ')) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
      if (!channel || channel.type === 'category') return message.reply('Coloque um canal válido!')

      guildDocument.sugesChannel = channel.id
      guildDocument.sugesModule = true
      guildDocument.save().then(async () => {
        await message.reply(`Canal definido: ${channel}\n<:9605discordslashcommand:832746522865172530> O Canal de sugestões foi definido e está ativo!`)
      })
    }
    else if (args[0] === 'remover') {
      guildDocument.sugesChannel = ''
      guildDocument.sugesModule = false
      guildDocument.save().then(async () => {
        await message.reply(`<a:warnRoxo:664240941175144489> O canal de sugestões foi desativado`)
      })
    }
  }
}

exports.help = {
  name: 'serverinfo'
}