const { RichEmbed } = require('discord.js')
const devs = ['395788326835322882', '442774319819522059']
class Command {
    constructor(name, client) {
        this.name = name
        this.parent = ''
        this.client = client
        this.aliases = []
        this.category = 'normal'
        this.argsRequired = false
        this.usage = ''
        this.adminOnly = false
        this.subcommandsOnly = false
        this.invalidArgsMessage = 'Erro; Argumentos inválidos'
        this.subcommands = []
        this.examples = []
    }

    process(message, args) {
        if (this.adminOnly && !devs.includes(message.author.id))
            return
        if (this.argsRequired && args.length === 0)
            return typeof this.invalidArgsMessage === 'function' ? this.invalidUsageMessage(message, args) : message.channel.send(this.invalidArgsMessage)

        let sub = this.subcommands.find(s => s.name === args[0] || s.aliases.includes(args[0]))

        if (sub)
            return sub.process(message, args.slice(1))
        else if (!sub && this.subcommandsOnly)
            return message.channel.send(this.embedHelpSUBS(message))
        else
            return this.run(message, args)
    }
    run() { }
}

module.exports = Command