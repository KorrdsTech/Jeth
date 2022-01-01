const { Command } = require('../../utils')

module.exports = class GifBanCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'gifban'
    this.aliases = ['banimentogif', 'bangif', 'gifbanimento']
    this.category = 'mod'
  }

  async run(message, args) {
    const guildDocument = await this.client.database.Guilds.findById(message.guild.id)
    this.client.database.Users.findOne({ _id: message.author.id }, (e, doc) => {
      if (doc) {
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
      } else {
        const saved = new this.client.database.Users({ _id: message.author.id })
        saved.save().then(() => {
          message.channel.send('<a:loading:663803525603655682> Salvando cadastro... Execute o comando novamente!')
        })
      }
    })
  }
}