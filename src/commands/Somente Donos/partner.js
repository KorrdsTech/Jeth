const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class Partner extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['prm', 'parceiro']
        this.category = 'Somente Donos'
        this.adminOnly = true
    }

    async run(message, args) {
        if (!args[0]) {
            return message.reply('criador burro você tem que falar o id do servidor para que eu póssa adicionar como partner...').then(sent => sent.delete(5000))
        }
        let server = await this.client.database.Guilds.findById(args[0])
        let servidor = this.client.guilds.cache.get(args[0])
        console.log(server)
        if (server.partner) {
            server.partner = false
            server.save().then(async () => {
                await message.channel.send(`${message.author},\`${servidor.name}\`,não é mais **partner**.. <:sadd:663813684103086091>`)
            })

        } else {
            server.partner = true
            server.save().then(async () => {
                await message.channel.send(`${message.author},\`${servidor.name}\`, Agora é **partner** <a:neon:663575128088641576>`).then(sent => sent.delete(5000))
                let embedpartner = new MessageEmbed()
                    .setColor(colors.default)
                    .addField('Partner | Informações:', `Servidor adicionado: \n\`\`${servidor.name}\`\``, true)
                    .addField(`Servidor | Informações:`, `Dono do servidor: \n${servidor.owner}`, true)
                    .setFooter(`${servidor.name}`, `${this.client.user.displayAvatarURL({ dynamic: true, size: 1024 })}`)
                this.client.guilds.get('658049459636273155').channels.get('671415691051794473').send(embedpartner)
            })
        }
    }
}