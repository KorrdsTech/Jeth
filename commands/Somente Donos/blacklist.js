const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class blacklist extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['blacklist', 'blist']
        this.category = 'Somente Donos'
        this.adminOnly = false
    }

    async run(message, args) {
        let staff = await this.client.database.Users.findById(message.author.id)
        if (!staff.staff) {
            return message.channel.send('Você não pode utilizar este comando, somente os membros confiados da equipe <@&718178715426619489>')
        }
        if (!args[0]) {
            return message.channel.send('Você tem que falar o id do usuario para que eu póssa adicionar na blacklist...').then(sent => sent.delete({ timeout: 5000 }))
        }
        const usuario = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ""))
        if (!usuario) {
            message.channel.send('Mencione um membro valido.')
        }
        const guildDocument = await this.client.database.Users.findById(usuario.id)
        if (!guildDocument) {
            new this.client.database.Users({
                _id: usuario.id
            }).save()
        }
        const reason = args.slice(1).join(" ")
        if (!reason) {
            reason = "Qual o motivo da blacklist?"
        }

        let warnembed18 = new MessageEmbed()

            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setTitle(`${message.author.username}`)
            .setDescription(`:do_not_litter: **Você foi blacklisted ${message.guild.name} :no_entry_sign:** \nO que isto significa ? você não poderá mais fazer parte dos servidores que apoiam a network da Jeth, por quebrar um dos termos de serviço do discord, este tipo de punição não oferece appeal e se você se encontra nesta situação provavelmente terá sua conta encerrada.`)
            .setColor("BLACK")
            .addField('<:pepe:651487933148299291> **Staffer:**', `${message.author}`)
            .addField('📝 Motivo:', `${reason}`)
            .setFooter('https://discordapp.com/guidelines・Discord da Jeth 🛠')
            .setTimestamp(new Date());

        let warnembed14 = new MessageEmbed()

            .setThumbnail(usuario.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setAuthor(`${message.author.username} Aplicou uma network blacklist`, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor("BLACK")
            .setDescription(`**Blacklisted!** \n \n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Infrator:** ${usuario.username} \n**ID:** ${usuario.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
            .setFooter("☕️・https://discordapp.com/guidelines", message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setTimestamp(new Date());

        if (guildDocument.blacklist) {
            guildDocument.blacklist = false
            guildDocument.save().then(async () => {
                this.client.guilds.cache.map(gd => gd.members.unban(usuario))
                usuario.send('<:a_blurpleintegration:856174395801468989> Você foi removido da blacklist, e sua infração foi perdoada.')
                await message.channel.send(`${message.author},\`${usuario.tag}\`,não está mais na blacklist.`)
                
            })
        } else {
            guildDocument.blacklist = true
            guildDocument.save().then(async () => {
                this.client.guilds.cache.map(gd => gd.members.ban(usuario, { reason: `Blacklisted: Quebra dos termos de serviço do discord` }))
                usuario.send(warnembed18)
                message.channel.send(`${message.author},\`${usuario.tag}\`,está na blacklist.`).then(sent => sent.delete({ timeout: 5000 }))
                message.channel.send(warnembed14);
            })
        }
    }
}