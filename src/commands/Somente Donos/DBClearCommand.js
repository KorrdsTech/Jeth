const { Command, colors } = require('../../utils')

module.exports = class dbclear extends Command {
    constructor(name, client) {
        super(name, client)

        this.name = 'dbclear'
        this.aliases = ['dbclear', 'limpardb', 'dblimpar']
        this.category = 'Somente Donos'
        this.adminOnly = true
    }

    async run(message) {

        this.client.guilds.cache.forEach(g => {
            this.client.database.Guilds.findOneAndDelete(g.id).then(async () => {
                message.channel.send(`${g.name} deletada....`)
            })
        })
        this.client.users.cache.forEach(u => {
            this.client.database.Users.findOneAndDelete(u.id).then(async () => {
                message.channel.send(`${u.tag} deletado...`)
            })
        })
    }
}