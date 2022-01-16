const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')

module.exports = class chat extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['lock', 'trava']
        this.category = 'Moderação'
        this.subcommandsOnly = false
    }

    async run(message, args) {
        const embedA = new Discord.MessageEmbed()

            .setTimestamp()
            .setColor(colors.mod)
            .setTitle('**Err:**', true)
            .setDescription('Missing Permissions') // inline false
            .addField('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
            .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send(embedA)

        const embedlock = new MessageEmbed()
            .setColor(colors.default)
            .setDescription(`<a:sireneRoxa:739828671400902697> ${message.author} realmente deseja lockar o chat <#${message.channel.id}>?`)

        const ell = await message.channel.send(embedlock),
            emojis = ['739830713792331817', '739831089543118890'];//array de emojis

        for (const i in emojis) {//loop de reações na msg que defini acima
            await ell.react(emojis[i]);
        }

        const collector = ell.createReactionCollector(
            ((_, u) => _ && u.id === message.author.id),
            { time: 60000 }
          )
           //criando o collector com o filtro acima, max é o maximo de reações como na array tem 3 emojis o numero irá ser 3, e o time é o tempo maximo para reações coloquei 30s
            collector.on('collect', (reaction) => {
                console.log(reaction.emoji.id)
                switch(reaction.emoji.id) {
                case '739830713792331817': 
                    const embedlockado = new MessageEmbed()
                        .setDescription(`<:concludo:739830713792331817> O canal <#${message.channel.id}> foi bloqueado com sucesso!`)
                        .setColor(colors.default)
                    ell.edit(embedlockado)
                    message.channel.updateOverwrite(message.guild.id,
                        { SEND_MESSAGES: false })
                    break
                case '739831089543118890': 
                    const embeddeslockado = new MessageEmbed()
                        .setDescription(`<:concludo:739830713792331817> O canal <#${message.channel.id}> foi desbloqueado com sucesso!`)
                        .setColor(colors.default)
                    ell.edit(embeddeslockado)
                    message.channel.updateOverwrite(message.guild.id,
                        { SEND_MESSAGES: true })
                    break
            }
        })

    }
}