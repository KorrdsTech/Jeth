const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class saida extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['bye', 'bye-bye', 'leave']
        this.category = 'Moderation'
    }

    async run(message, args) {
        const embedA = new MessageEmbed()

            .setTimestamp()
            .setColor(colors.default)
            .setTitle('**Err:**', `${message.author}`, true)
            .setDescription('Missing Permissions') // inline false
            .addField('*Verifique se você possui a permissão:*', '`MANAGE_GUILD`', true)
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
        if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send({ embeds: [embedA] })
        let guildDocument = await this.client.database.Guilds.findById(message.guild.id)
        if (args[0] === 'canal') {
            let channel = message.guild.channels.cache.find(c => c.name === args.slice(1).join(' ')) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!channel || channel.type === 'category') return message.channel.send('Coloque um canal válido!')

            guildDocument.channelsaida = channel.id
            guildDocument.save().then(async () => {
                await message.channel.send(`Canal definido: ${channel}`)
            })
        } else if (args[0] === 'mensagem') {
            let mensagem = args.slice(1).join(' ')

            if (!mensagem) return message.channel.send(`Coloque qual será a mensagem do saida, lembre-se nósso sistema aceita embed...`)

            guildDocument.saidaMessage = mensagem
            guildDocument.save().then(async () => {
                guildDocument.saidaModule = true
                guildDocument.save().then(async () => {
                    let defaultChannel = await message.guild.channels.cache.get(guildDocument.channelsaida)
                    if (!defaultChannel) return message.channel.send(`Este servidor não possui um canal definido no saida...\nUse: \`${message.prefix}saida canal #canal\` para definir um e use o comando novamente!`)
                    await message.channel.send(`Mensagem definida\nsaida Ativado...`)
                })
            })
        } else if (args[0] === 'desativar') {
            if (!guildDocument.saidaModule) return message.channel.send(`Este servidor não possui um saida ativado!`)
            let lastChannel = message.guild.channels.cache.get(guildDocument.channelsaida)
            guildDocument.saidaModule = false
            guildDocument.channelsaida = ''
            guildDocument.saidaMessage = ''

            guildDocument.save().then(async () => {
                await message.channel.send(`O saida foi removido do canal ${lastChannel} e desativado`)
            })
        } else {
            let embed = new MessageEmbed()
                .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setDescription(`Dúvidas de como usar a Saida?\nAqui vai algumas dicas...`)
                .setColor(colors.default)
                .addField('Modos de usar', [
                    `\`${guildDocument.prefix}saida canal #canal\` - Define o canal onde o saida será definido.`,
                    `\`${guildDocument.prefix}saida mensagem <mensagem>\` - Define a mensagem que será exibida no saida.`,
                    `\`${guildDocument.prefix}saida desativar\` - Caso haja algum saida ligado/definido, ele será removido e o sistema desligado.`,
                    `\n**Lembre-se se ver os \`Placeholders\` abaixo para não errar nada!**\n`
                ].join('\n'), false)
                .addField('Placeholders', [
                    `O sistema de saida(leave-member) aceita embed!`,
                    `Não sabe fazer uma? é facil clique aqui: **[[CLIQUE]](https://leovoel.github.io/embed-visualizer/)**`,
                    `**[Utilize ${guildDocument.prefix}embed para mais informações]**`,
                    `\n**Lembre-se se ver os \`Parâmetros\` abaixo para não errar nada!**\n`
                ].join('\n'), false)
                .addField('Parâmetros.', [
                    '**${USER}** - Para marcar o membro na entrada.',
                    '**${AVATAR}** - Para definir o avatar do membro.',
                    '**${USER-ID}** - Para definir o **ID** do membro.',
                    '**${USER-NAME}** - Para definir o nome do membro.',
                ].join('\n'), false)

            let embed2 = new MessageEmbed()
                .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setDescription(`Dúvidas de como esta a saida do servidor?\nAqui vai o seu painel...`)
                .setColor(colors.default)
            let canalBemVindo = `<:rejected:739831089543118890> Desativado`;
            if (guildDocument.channelsaida.length) {
                canalBemVindo = `<:concludo:739830713792331817> Ativo | Canal: <#${guildDocument.channelsaida}>`;
            }
            embed2.addField("saida | Canal de saida:", canalBemVindo);
            let MsgCount = `<:rejected:739831089543118890> Desativado`;
            if (guildDocument.saidaMessage.length) {
                MsgCount = `<:concludo:739830713792331817> Ativo | Mensagem: ${guildDocument.saidaMessage.length > 800 ? `${guildDocument.saidaMessage.slice(0, 801)}[...]` : guildDocument.saidaMessage}`;
            }
            embed2.addField("Saida | Mensagem de Saida:", MsgCount);
            let msgsaida = guildDocument.saidaModule ?
                `<:concludo:739830713792331817> Ativo` :
                `<:rejected:739831089543118890> Desativado`
            embed2.addField("saida está:", msgsaida)

            let embedCount = 1
            message.channel.send({ embed }).then(async m => {
                await m.react('666762183249494027')// ir para frente
                let col = m.createReactionCollector((e, u) => (u.id == message.author.id) &&
                    (e.emoji.id == '666762183249494027' /* para frente */ || e.emoji.id == '665721366514892839') /* para trás */,
                    { time: 180000, errors: ['time'] })
                let reacoes = col.on('collect', async (e, u) => {
                    if (embedCount != 2 && e.emoji.id == '666762183249494027') { // ir para frente

                        await m.react('665721366514892839')
                        e.users.cache.map(u => e.remove(u.id))
                        m.edit(embed2)
                        embedCount = 2
                        await m.react('665721366514892839')// volta para trás
                    } else if (e.emoji.id == '665721366514892839' && embedCount == 2) {

                        await m.react('666762183249494027')
                        e.users.cache.map(u => e.remove(u.id))

                        m.edit(embed)
                        embedCount = 1
                    }
                })
            })
        }
    }
}