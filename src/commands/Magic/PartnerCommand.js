const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')

module.exports = class Partner extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'partner'
    this.aliases = ['partner', 'prm', 'parceiro']
    this.category = 'Magic'
    this.adminOnly = true
  }

  async run(message, args) {
    if (!args[0]) {
      return message.reply('criador burro você tem que falar o id do servidor para que eu póssa adicionar como partner...').then(sent => {
        setTimeout(() => sent.delete(), 5000)
      })
    }
    const server = await this.client.database.guild.getOrCreate(args[0])
    const servidor = this.client.guilds.cache.get(args[0])
    console.log(server)
    if (server.partner) {
      server.partner = false
      server.save().then(async () => {
        await message.reply(`${message.author},\`${servidor.name}\`,não é mais **partner**.. <:sadd:663813684103086091>`)
      })

    } else {
      server.partner = true
      server.save().then(async () => {
        await message.reply(`${message.author},\`${servidor.name}\`, Agora é **partner** <a:neon:663575128088641576>`).then(sent => setTimeout(() => sent.delete(), 5000))
        const embedpartner = new EmbedBuilder()
          .setColor(colors['default'])
          .addFields('Partner | Informações:', `Servidor adicionado: \n\`\`${servidor.name}\`\``, true)
          .addFields(`Servidor | Informações:`, `Dono do servidor: \n${servidor.owner}`, true)
          .setFooter({ text: `${servidor.name}`, iconURL: this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
        this.client.guilds.get('658049459636273155').channels.get('671415691051794473').send(embedpartner)
      })
    }
  }
}