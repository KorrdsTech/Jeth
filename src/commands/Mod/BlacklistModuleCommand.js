const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class blacklistModule extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'blacklistModule'
    this.aliases = ['bmodule', 'blacklistmodule', 'bm']
    this.category = 'Mod'
    this.adminOnly = false
  }

  async run(message, args) {
    const emptyMessage = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **BlacklistModule:**', `${message.author.username}`, true)
      .setDescription('Com este comando você poderá ativar ou desativar a opção de banir um usuário que está na blacklist de seu servidor.') // inline false
      .addField('*Uso do comando:*', '`bModule on `', true)
      .addField('*Uso do comando:*', '`bModule off`', true)
      .addField('*Exemplo:*', '`bModule on/off`', true)

    const embedA = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_GUILD`', true)
       

    if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply({ embeds: [embedA] })

    if (!args[0]) return message.reply({ embeds: [emptyMessage] })

    const blacklistGuild = await this.client.database.guild.getOrCreate(message.guild.id)
    if (args[0] === 'on') {
      blacklistGuild.blacklistModule = true
      blacklistGuild.save()
      await message.reply('Módulo ativo com sucesso!')
    }
    else if (args[0] === 'off') {
      blacklistGuild.blacklistModule = false
      blacklistGuild.save()
      await message.reply('Módulo desativado com sucesso!')
    }
  }
}