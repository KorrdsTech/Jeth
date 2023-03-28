const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class RenameChannel extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'renamechannel'
    this.aliases = ['RenameChannel', 'RenomearCanal', 'ChannelRename']
    this.category = 'Mod'
  }

  async run(message, args) {
    const embedA = new MessageEmbed()

      .setTimestamp()
      .setColor(colors['default'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_CHANNEL`', true)
       
    if (!message.member.permissions.has('MANAGE_CHANNEL')) message.reply({ embeds: [embedA] })
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if (!channel) return message.reply('Mencione o canal que deseja trocar o nome')
    const name = args.slice(1).join('\u2006').replace('&', '＆').replace('|', '│')
    if (!name) return message.reply('Nenhum nome foi inserido')

    channel.setName(name).then(() => {
      message.reply(`Nome do canal ${channel} alterado com sucesso para ${name}!`)
    })
  }
}