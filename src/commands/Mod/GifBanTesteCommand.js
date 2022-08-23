const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')

module.exports = class GifBanTeste extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'gifbanteste'
    this.aliases = ['gifban-test', 'gifban-teste']
    this.category = 'Mod'
    this.permissions = ['MANAGE_GUILD']
  }

  async run(message) {
    const doc = await this.client.database.user.getOrCreate(message.author.id)

    const teste = new EmbedBuilder()
      .setAuthor('Moderadora | Banimento Teste', this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(`${message.author} baniu @USER#0000!`)
      .setImage(`${doc.gifban}`)
      .addFields('Usuário:', `USER#0000`, true)
      .addFields('ID:', `0000000000000000`, true)
      .addFields('Motivo:', `Banido por ${message.author.tag} — Não relatou um motivo.`, false)
      .setColor(colors.default)
      .setFooter('Moderando Discord', message.guild.iconURL({ dynamic: true, size: 1024 }))

    message.channel.send({ embeds: [teste] })
  }
}