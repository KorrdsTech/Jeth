const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class bug extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'bug'
    this.aliases = ['bug', 'reportar', 'bugreport', 'report', 'reportbug']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const dono = process.env.OWNERS?.trim().split(',')
    const report = args.join(' ');
    if (!args[3]) return message.reply('<a:astaff:671435205302681603> `Err! Explique aqui detalhadamente o bug encontrado, ele será reportado diretamente para o coder do bot.`')

    const embed = new MessageEmbed()
      .setColor(colors['mod'])
      .setDescription('**BUG-REPORT**')
      .addField('Ticket criado por:', `${message.author.tag}`, true)
      .addField('**ID:**', `${message.author.id}`, true)
      .addField('**Descrição:**', `${report}`, true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date())

    dono.forEach((ownerID) => {
      this.client.users.cache.get(ownerID).send({ embeds: [embed] }).catch(console.error)
    })
    message.reply(`Seu ticket foi enviado com sucesso!`);
  }
};