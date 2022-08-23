const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')

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
    const logs = this.client.channels.cache.get('831041529825067038')
    if (!args[3]) return message.reply('<a:astaff:671435205302681603> `Err! Explique aqui detalhadamente o bug encontrado, ele será reportado diretamente para o coder do bot.`')

    const embed = new EmbedBuilder()
      .setColor(colors['mod'])
      .setDescription('**BUG-REPORT**')
      .addFields('Ticket criado por:', `${message.author.tag}`, true)
      .addFields('**ID:**', `${message.author.id}`, true)
      .addFields('**Descrição:**', `${report}`, true)
      .setFooter({ text: 'Moderando Discord', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date())

    dono.forEach((ownerID) => {
      this.client.users.cache.get(ownerID).send({ embeds: [embed] }).catch(console.error)
    })
    await logs.send({ embeds: [embed] })
    message.reply(`Seu ticket foi enviado com sucesso!`);
  }
};