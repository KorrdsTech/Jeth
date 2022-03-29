const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class Warn extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'warn'
    this.aliases = ['warn', 'aviso', 'advertencia', 'punir']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const emptyMessage = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Warn:**', `${message.author.username}`, true)
      .setDescription('Com este comando você irá emitir um aviso que ficará salvo para o usuário, caso o usuário já tenha um aviso prévio ele será subistituído pelo aviso mais recente, portanto certifique-se de verificar se o usuário já tem um aviso salvo utilizando o comando **history**.') // inline false
      .addField('*Uso do comando:*', '`warn <@user> <motivo>`', true)
      .addField('*Exemplo:*', '`warn @Solaris#0006 Not listen to the rules of this academy!`', true)

    if (!args[0]) return message.reply({ embeds: [emptyMessage] })

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    const documento = await this.client.database.user.getOrCreate(member.id)

    const razao = args.slice(1).join(' ')
    if (!razao) message.reply('Por favor insira um motivo válido.')

    const embedA = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${member}`, true)
      .setDescription('Missing Permissions')
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_ROLES`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply({ embeds: [embedA] })
    if (!member) return message.reply('Mencione o member que deseja dar warn!')

    const warnembed = new MessageEmbed()

      .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
      .setTitle('Ação | Aviso')
      .setColor(colors['mod'])
      .setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Advertido:** ${member.user.username} \n**ID:** ${member.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${razao}`)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp();

    documento.warnreason = razao
    await documento.save().then(
      message.reply({ embeds: [warnembed] })
    )
  }
}