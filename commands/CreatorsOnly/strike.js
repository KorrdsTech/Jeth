const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class strike extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = []
        this.category = 'Only Devs'
        this.adminOnly = false
    }

    async run(message, args) {
        let staff = await this.client.database.Users.findById(message.author.id)
        if (!staff.staff) {
            return message.channel.send('Você não pode utilizar este comando, somente os membros confiados da equipe <@&718178715426619489>')
        }
        switch (args[0]) {
            case "add": {
                let user = await this.client.users.fetch(args[1])
                let userDB = await this.client.database.Users.findById(user.id)
                const strike = new MessageEmbed()

                    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
                    .setTitle('System | Trust & Safety')
                    .setColor(colors.default)
                    .setDescription(`\n\n<:a_blurpleemployee:856174396423274516> O Discord é focado em manter um conteúdo seguro e confiável para nossa comunidade, e sua conta foi sinalizada pela comunidade do Discord por violar nossas Diretrizes da Comunidade.\n\n<:Kaeltec:673592197177933864> **Staff:** ${message.author.username} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Infrator:** ${user.username} \n**ID:** ${user.id}`)
                    .setImage(`https://miro.medium.com/max/3200/0*SCBRci_mo1Yhc9km`)
                    .setFooter("https://discordapp.com/guidelines・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
                    .setTimestamp(new Date());
                userDB.strike += 1
                userDB.save().then(() => message.channel.send(strike))
                if (userDB.strike >= 3) {
                    userDB.blacklist = true
                    userDB.blacklistReason = "[STRIKE EXCEDIDO] - Quebra dos termos de uso do Discord."
                    userDB.save().then(() => message.channel.send(`O usuário \`${user.tag}\` foi adicionado da blacklist.`))
                }
                message.channel.send(`O usuário \`${user.tag}\` acabou levando strike (${userDB.strike}))`)
                user.send('Olá, \n\nO Discord é focado em manter um conteúdo seguro e confiável para nossa comunidade, e sua conta foi sinalizada pela comunidade do Discord por violar nossas Diretrizes da Comunidade.\n\nSinceramente,\nDiscord Trust & Safety Team')
            }
                break
            case "remove": {
                let user = await this.client.users.fetch(args[1])
                let userDB = await this.client.database.Users.findById(user.id)
                message.channel.send(`${user.tag} Teve seu strike removido! <:9605discordslashcommand:832746522865172530>`)
                userDB.strike -= 1
                userDB.save()
                if (userDB.strike < 3) {
                    userDB.blacklist = false
                    userDB.blacklistReason = null
                    userDB.save().then(() => message.channel.send(`O usuário \`${user.tag}\` foi removido da blacklist.`))
                }
                message.channel.send(`O usuário \`${user.tag}\` teve 1 strike removido (${userDB.strike})`)
            }
                break
            default: {
                message.channel.send("Você não informou a opção e o ID do usuário que deseja dar strike.")
            }
        }
    }
}