const { Command } = require('../../utils')

module.exports = class GifBan extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'gifban'
    this.aliases = ['gifban', 'banimentogif', 'bangif', 'gifbanimento']
    this.category = 'Mod'
    this.permissions = ['MANAGE_GUILD']
  }

  async run(message, args) {
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)
    const doc = await this.client.database.user.getOrCreate(message.author.id)

    if (!doc.vip) {
      message.reply(`Você não está setado como vip do bot e não pode setar seu gif de banimento.`)
    } else { // faz por else talvez resolva
      if (!args[0]) {
        return message.channel.send(`${message.author}, você deve enviar uma imagem ou especificar um link válido.`)
      }

      doc.gifban = args[0]
      doc.save()
      message.channel.send(`${message.author}, você alterou a sua ilustração de banimento!,Utilize **${guildDocument.prefix}vip**.`)
    }
  }
}