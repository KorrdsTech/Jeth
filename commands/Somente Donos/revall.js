const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class Revall extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['removeall']
        this.category = 'Somente Donos'
    }

    async run(message, args) {

        if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
            return message.reply("Voce nao tem permissao para isso <:noswift:529635602292015134>").catch(() => { });
        }
        if (!message.guild.me.hasPermission("ADMINISTRATOR", false, true)) {
            return message.reply("nao tenho permissao para isso <:noswift:529635602292015134>").catch(() => { });
        }
        if (message.mentions.roles.size < 1) return message.channel.send("Marque um cargo").catch(() => { });

        var role = message.mentions.roles.first();

        if (message.guild.me.highestRole.comparePositionTo(role) < 0) {
            return message.channel.send("Eu preciso estar acima do cargo mencionado <:noswift:529635602292015134>").catch(() => { });
        }

        await message.channel.send(`Começando | 0/${message.guild.memberCount}`)
            .then(m => {
                message.guild.members.fetch()
                    .then(async guilda => {
                        let membros = guilda.members.array();
                        await f(membros, 0, role, m);
                    })
                    .catch(() => { });
            })
            .catch(() => { });
    };
}

var f = async (membros, i = 0, role, message) => {
    if (i % 20 === 0) {
        await message.edit(`${i}/${message.guild.memberCount} **Removendo o cargo ${role} de todos os usuários do servidor**`).catch(() => { });
    }
    if (membros[i]) {
        await membros[i].removeRole(role, "AutoRole").catch(() => { });
    }
    ++i;
    if (i < message.guild.memberCount) {
        setTimeout(() => f(membros, i, role, message), 500);
    } else {
        await message.edit("Feito").catch(() => { });
    }
};