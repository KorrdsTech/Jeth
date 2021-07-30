const { Command, colors } = require('../../utils')
const Discord = require('discord.js')
const client = new Discord.Client();

module.exports = class cadastrar extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['cadastrar']
        this.category = 'VipCommands'
        this.adminOnly = true
    }

    async run(message, args) {
        let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let membro = message.guild.members.cache.get(args[0]) ? message.guild.members.cache.get(args[0]) : message.mentions.members.first() ? message.mentions.members.first() : message.author
        if (!membro) message.reply('Não encontrei o usuário!')

        this.client.database.Guilds.findOne({ _id: message.guild.id }, (e, server) => {
            if (server) {
                if (!server.partner) {
                    message.reply(`<a:Jeth_hype:665309103748284426> Este servidor não tem parceria com o bot então,você não pode usar o comando.`)
                } else {
                    this.client.database.Users.findOne({ _id: membro.id }, (e, doc) => {
                        if (doc) {
                            if (doc.vip)
                                doc.gifban = '',
                                    doc.vip = false
                            else doc.vip = true

                            doc.save().then(() => {
                                message.channel.send(`<a:Jeth_hype:665309103748284426> O **VIP** do membro ${membro} foi ${doc.vip ? 'ativado' : 'desativado'}.`)
                            })
                        } else {
                            const saved = new this.client.database.Users({ _id: membro.id })
                            saved.save().then(() => {
                                message.channel.send("<a:loading:663803525603655682> Salvando cadastro... Execute o comando novamente!")
                            })
                        }
                    })
                }
            } else {
                const saved = new this.client.database.Guilds({ _id: membro.id })
                saved.save().then(() => {
                    message.channel.send("<a:loading:663803525603655682> Salvando cadastro... Execute o comando novamente!")
                })
            }
        })
    }
}

//const { Command, TranslateFunctions } = require('../../utils')
// const { MessageEmbed } = require('discord.js')

// module.exports = class setcargo extends Command {
//     constructor(name, client) {
//         super(name, client)

//         this.aliases = ['setar-cargo', 'cargoadd']
//         this.category = 'sla'
//     }

//     async run(message, args) {
//         message.delete()
//         let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])
//         let cargo_nome = message.mentions.roles.first() || message.mentions.roles.array([1])
//         const embedA = new MessageEmbed()
//             .setTimestamp()
//             .setColor(colors.mod)
//             .setTitle('**Err:**', `${usuario}`, true)
//             .setDescription('Missing Permissions') // inline false
//             .addField('*Verifique se você possui a permissão:*', '`MANAGE_ROLES`', true)
//             .setFooter('Jeth | Developers', message.author.displayAvatarURL())

//         if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(embedA)
//         if (!usuario) return message.reply("Você não mencionou o usuário!");
//         if (!cargo_nome) return message.reply("Você não colocou um cargo valido!");
//         if (usuario.id === message.guild.ownerID) {
//             message.reply("Você não tem permissão para setar role neste usuário");
//             return 0;
//         }
//         if (usuario.id === this.client.user.id) {
//             message.reply("Não posso me setar cargo.");
//             return 0;
//         }
//         let executorRole = message.member.roles.highest;
//         let targetRole = usuario.roles.highest;
//         if (executorRole.comparePositionTo(targetRole) <= 0 && message.author.id !== message.guild.ownerID) {
//             message.reply("Você não tem permissão para setar role neste usuário");
//             return 0;
//         }
//         let clientRole = message.guild.me.roles.highest;
//         if (clientRole.comparePositionTo(targetRole) <= 0) {
//             message.reply("Você não tem permissão para setar role neste usuário");
//             return 0;
//         }