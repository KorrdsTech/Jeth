const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const client = new Discord.Client();

module.exports = class allunban extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['allunban', 'unbanall']
        this.category = 'Moderação'
    }

    async run(message) {
         const embed = new MessageEmbed()
         .setColor(colors.default)
         .setDescription('<:a_blurplecertifiedmoderator:856174396225355776> **Não pode desbanir este usuário!** tenha certeza de que você possui a permissão `BAN_MEMBERS` então você poderá desbanir usuários.')


         const embed2 = new MessageEmbed()
         .setColor(colors.default)
         .setDescription('<:a_blurplecertifiedmoderator:856174396225355776> **Todos os usuários desbanidos!** você com sucesso desbaniu todos os usuários do servidor.')

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply(embed).catch(() => { });
        }
        if (message.member.hasPermission("BAN_MEMBERS")) {
                message.guild.fetchBans().then(bans => {
                    if (bans.size == 0) {message.reply("There are no banned users."); throw "No members to unban."};
                    bans.forEach(ban => {
                        message.guild.members.unban(ban.user.id);
                    });
                }).then(() => message.reply(embed2)).catch(e => console.log(e))
            } else {message.reply(embed)}
    }
};
