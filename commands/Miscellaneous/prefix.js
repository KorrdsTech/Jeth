const { Command, colors } = require('../../utils')

module.exports = class Prefix extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['prefixo', 'setprefix', 'set.prefix', 'prefix.set']
        this.category = 'Miscellaneous'
        this.subcommandsOnly = false
    }

    async run(message, args) {
        let documento = await this.client.database.Guilds.findById(message.guild.id)
        if (!documento) {
            this.client.database.Guilds({
                _id: message.guild.id
            }).save()
        }
        if (!args[0]) { return message.channel.send(`${message.author}, defina um novo prefixo! **${documento.prefix}prefix <novo prefix>**`) } // Tell them if they didn't supply any arguments.

        if (args.join(' ').length > 2) return message.channel.send(`${message.author}, eu possuo um limite máximo de 2 caracteres em meu prefix, tente novamente amiguinho(a).`)

        documento.prefix = args.join(' ')
        documento.save()

        message.channel.send(`<:concludo:739830713792331817> ${message.author}, meu prefix foi alterado para **${documento.prefix}**`)
    }
}