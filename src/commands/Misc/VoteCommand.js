const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')

module.exports = class vote extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'vote'
    this.aliases = ['vote', 'votar']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message) {
    const embed = new EmbedBuilder()
      .setThumbnail('https://cdn.discordapp.com/attachments/804599688728412171/873270109416857670/frame.png')
      .setTitle('<:a_blurplepartner:856174395869626399> **Jeth Analytic:**')
      .setColor(colors['default'])
      .setImage('https://i.imgur.com/qUzuwG8.png')
      .setDescription(`<:a_blurplestar:856174396179480576> Deixe seu voto no bot da Jeth nos ajudando a crescer no discord e podendo ganhar recompensas dependendo de eventos, não se esqueça também de deixar sua análise nos comentários do bot, seja boa ou ruim, isto nos ajuda a melhorar [Avalie Aqui!](https://top.gg/bot/718210363014905866/vote)`)
      .setFooter({ text: `・Avaliado pela equipe Trust & Safety`, iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date());
    message.reply({ embeds: [embed] })
  }
}