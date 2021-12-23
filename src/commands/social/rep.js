const { Command, colors } = require('../../utils')
const moment = require('moment')
moment.locale('pt-br')

module.exports = class Registrou extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = []
        this.category = 'social'
        this.subcommandsOnly = false
    }

    async run(message, args) {
        let member = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ''))
        if (!member) return message.reply('eu procurei, procurei, e não achei este usuário')
        if (member.id === message.author.id) return message.reply(`Você não pode dar rep para si mesmo.`)
        let author = await this.client.database.Users.findById(message.author.id)
        let user = await this.client.database.Users.findById(member.id)
        if (!user) {
            new this.client.database.Users({
                _id: member.id
            }).save()
        }
        if (author) {
            if (user) {
                let time = ((parseInt(author.repTime) - Date.now()) > 3600000) ? moment.utc(parseInt(author.repTime - Date.now())).format('hh:mm:ss') : moment.utc(parseInt(author.repTime - Date.now())).format('mm:ss')
                if (parseInt(author.repTime) < Date.now()) {

                    user.rep += 1

                    if (message.author.id === '753778869013577739') {
                        author.repTime = 0 + Date.now()
                        author.save()
                        user.save()
                    } else
                        author.repTime = 3600000 + Date.now()
                    author.save()
                    user.save()

                    message.reply(`Você deu um ponto de reputação para o ${member}, agora esse usuario tem ${user.rep} pontos de reputação.`)
                } else {
                    message.reply(`Você precisa esperar: ${time} minutos.`)
                }
            } else {
                message.channel.send(`${message.author},Olá parece que este usuário é novo aqui,então criamos um registro pra vc :D`)
            }
        } else {
            message.channel.send(`${message.author},Olá parece que vc é novo aqui com os comandos,então criamos um registro pra vc :D`)
        }
    }
}