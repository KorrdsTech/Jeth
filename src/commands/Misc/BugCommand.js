const { Command, colors } = require('../../utils')
const { Discord, MessageEmbed } = require('discord.js')

module.exports = class bug extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'bug'
    this.aliases = ['bug', 'reportar', 'bugreport', 'report', 'reportbug']
    this.category = 'Fun'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const dono = ['442774319819522059']
    const report = args.join(' ');
    if (!args[3]) return message.reply('<a:astaff:671435205302681603> `Err! Explique aqui detalhadamente o bug encontrado, ele será reportado diretamente para o coder do bot.`')

    const embed = new MessageEmbed()
      .setColor(colors.mod)
      .setDescription('**BUG-REPORT**')
      .addField('Ticket criado por:', `${message.author.tag}`, true)
      .addField('**ID:**', `${message.author.id}`, true)
      .addField('**Descrição:**', `${report}`, true)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp(new Date())

    this.client.users.cache.get(dono.toString()).send({ embeds: [embed] })
    message.reply(`Seu ticket foi enviado com sucesso!`);
  }
};