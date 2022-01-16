const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class strike extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = []
        this.category = 'CreatorsOnly'
        this.adminOnly = false
    }

    async run(message, args) {
        let staff = await this.client.database.Users.findById(message.author.id)
        if (!staff.staff) {
            return message.channel.send('Você não pode utilizar este comando, somente os membros confiados da equipe <@&718178715426619489>')
        }
        switch (args[0]) {
            case "add": {
                const usuario = await this.client.users.fetch(args[1].replace(/[<@!>]/g, ""))
                if (!usuario) {
                    message.channel.send('Mencione um membro valido.')
                }
                const guildDocument = await this.client.database.Users.findById(usuario.id)
                if (!guildDocument) {
                    new this.client.database.Users({
                        _id: usuario.id
                    }).save()
                }
                const strike = new MessageEmbed()

                    .setThumbnail(usuario.displayAvatarURL({ dynamic: true, size: 1024 }))
                    .setTitle('System | Trust & Safety')
                    .setColor(colors.default)
                    .setDescription(`\n\n<:a_blurpleemployee:856174396423274516> O Discord é focado em manter um conteúdo seguro e confiável para nossa comunidade, e sua conta foi sinalizada pela comunidade do Discord por violar nossas Diretrizes da Comunidade.\n\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Infrator:** ${usuario.username} \n**ID:** ${usuario.id}`)
                    .setImage(`https://miro.medium.com/max/3200/0*SCBRci_mo1Yhc9km`)
                    .setFooter("https://discordapp.com/guidelines・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
                    .setTimestamp(new Date());
                guildDocument.strike += 1
                guildDocument.save().then(() => message.channel.send(strike))
                if (guildDocument.strike >= 3) {
                    guildDocument.blacklist = true
                    guildDocument.blacklistReason = "[STRIKE EXCEDIDO] - Quebra dos termos de uso do Discord."
                    guildDocument.save().then(() => message.channel.send(`O usuário \`${usuario.tag}\` foi adicionado da blacklist.`))
                }
                message.channel.send(`O usuário \`${usuario.tag}\` acabou levando strike (${guildDocument.strike}))`)
                usuario.send('Olá, \n\nO Discord é focado em manter um conteúdo seguro e confiável para nossa comunidade, e sua conta foi sinalizada pela comunidade do Discord por violar nossas Diretrizes da Comunidade.\n\nSinceramente,\nDiscord Trust & Safety Team')
            }
                break
            case "remove": {
                message.channel.send(`${usuario.tag} Teve seu strike removido! <:a_blurplecertifiedmoderator:856174396225355776>`)
                guildDocument.strike -= 1
                guildDocument.save()
                if (guildDocument.strike < 3) {
                    guildDocument.blacklist = false
                    guildDocument.blacklistReason = null
                    guildDocument.save().then(() => message.channel.send(`O usuário \`${usuario.tag}\` foi removido da blacklist.`))
                }
                message.channel.send(`O usuário \`${usuario.tag}\` teve 1 strike removido (${guildDocument.strike})`)
            }
                break
            default: {
                message.channel.send("Você não informou a opção e o ID do usuário que deseja dar strike.")
            }
        }
    }
}