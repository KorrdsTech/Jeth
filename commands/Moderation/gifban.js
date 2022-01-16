const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class GifBan extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['banimentogif', 'bangif', 'gifbanimento']
        this.category = 'Moderation'
    }

    async run(message, args) {
        let guildDocument = await this.client.database.Guilds.findById(message.guild.id)

        // const embedA = new Discord.MessageEmbed()
        // .setTimestamp()
        // .setColor(colors.mod)
        // .setTitle('**Err:**', `${message.author}`, true)
        // .setDescription('Missing Permissions') // inline false
        // .addField('*Verifique se você possui a permissão:*', '`MANAGE_GUILD`', true)
        // .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL)
        // if (!message.member.hasPermission('MANAGE_GUILD'))
        // return message.channel.send(embedA)
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
                const saved = new client.database.Users({ _id: message.author.id })
                saved.save().then(() => {
                    message.channel.send("<a:loading:663803525603655682> Salvando cadastro... Execute o comando novamente!")
                })
            }
        })
    }
}