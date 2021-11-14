const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class staff extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['s', 'ac']
        this.category = 'Somente Donos'
        this.adminOnly = true
    }

    async run(message, args) {
        let mens = args.join(" ");
        message.guild.members.cache.filter(member => member.roles.cache.get("718178715418230792")).forEach(member => {
            setTimeout(async () => {
                member.send(mens)
            }, 6000);
        })
    }
}