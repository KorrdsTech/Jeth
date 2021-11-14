const { Command, colors } = require('../../utils')

module.exports = class userclear extends Command {

    constructor(name, client) {
        super(name, client)

        this.aliases = ['limparuser', 'userlimpar']
        this.category = 'Somente Donos'
        this.adminOnly = true
    }

    async run(message) {
        this.client.users.forEach(u => {
            this.client.database.Users.findOneAndDelete(u.id).then(async () => {
                message.channel.send(`${u.tag} deletado...`)
            })
        })
    }
}