const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class CountCall extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['contarcall', 'contar-call', 'membros-call', 'membersc', 'a.ac']
        this.category = 'misc'
    }

    async run(message) {
        const voiceChannels = message.member.guild.channels.cache.filter(({ type, members }) => type === 'voice' && members.size).array();

        const embeds = [];

        for (let i = 0; i < voiceChannels.length; i++) {
            if (i % 25 === 0) {
                const embed = new MessageEmbed()
                    .setColor(colors.default);

                embeds.push(embed);
            };

            const { name, members } = voiceChannels[i];
            const embed = embeds[embeds.length - 1];

            let users = members.map(({ user }) => user.tag).join('\n');

            if (users.length > 1024)
                users = users.substr(0, 1020) + ' ...';

            embed.addField(`Call: ${name}`, `Usuario's:\n \`\`${users}\`\``)
            embed.setColor(colors.default)
            embed.setAuthor(this.client.message.author + ' | Contagem de Membros', this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))


            for (const embed of embeds) {
                message.channel.send({ embeds: [embed] });
            };

            if (users.length = '0') return message.channel.send('Talvez aqui não esteja ninguém em call.').then(sent => sent.delete({ timeout: 5000 }))

        };
    }
}