const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class reply extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = []
        this.category = 'Miscellaneous'
        this.subcommandsOnly = false
    }

    async run(message, args) {
        var ids = ["442774319819522059", "395788326835322882"];

        let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const embedA = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor(colors.mod)
            .setTitle('**Err:**', `${usuario}`, true)
            .setDescription('Missing Permissions') // inline false
            .addField('*Verifique se você possui a permissão:*', '`Jeth_OWNER`', true)
            .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

        if (!ids.includes(message.author.id))

            return message.channel.send(embedA);

        var razao13 = args.slice(1).join(" ");
        if (!razao13) return message.reply('Faltando argumentos')

        const embedB = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor(colors.default)
            .setTitle('**Ticket Reply:**', `${usuario}`, true)
            .setDescription('Você recebeu resposta à algum ticket aberto dentro de nosso suporte, pode ser por ter pedido ajuda, por ter dado alguma sugestão e outros.') // inline false
            .addField("<:b_information:742270909259317278> Resposta:", razao13, true)
            .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

        usuario.send(embedB)
        if (!Error) {
            return message.channel.send('<:rejected:739831089543118890> Erro, usuário com Direct Message Bloqueada!');
        } else
            message.channel.send("<:concludo:739830713792331817> Reply enviado com sucesso! 🗳")
    }
}
