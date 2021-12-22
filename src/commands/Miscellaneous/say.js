const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class Say extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['say']
        this.category = 'Miscellaneous'
        this.subcommandsOnly = false
    }

    async run(message, args) {
        const embedA = new Discord.MessageEmbed()

            .setTimestamp()
            .setColor(colors.mod)
            .setTitle('**Err:**', `${message.author}`, true)
            .setDescription('Missing Permissions') // inline false
            .addField('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
            .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send({ embeds: [embedA] })
        let mensagem = args.join(" ")
        message.channel.send(`${mensagem} \n\n<:9461systemmessageuser:832746852633149460> *Mensagem executada por: ${message.author}*`)
    }
}