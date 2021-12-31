const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class ChatCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'chat'
    this.aliases = ['lock', 'trava']
    this.category = 'misc'
    this.subcommandsOnly = false
    this.permissions = ['MANAGE_CHANNELS']
  }

  async run(message, args) {
    const embedban = new MessageEmbed()
      .setColor(colors['default'])
      .setDescription(`<a:sireneRoxa:739828671400902697> ${message.author} realmente deseja lockar o chat <#${message.channel.id}>?`)

    const msg = await message.channel.send(embedban),
      emojis = ['739830713792331817', '739831089543118890'];//array de emojis

    for (const i in emojis) {//loop de reações na msg que defini acima
      await msg.react(emojis[i]);
    }

    const filter = (r, u) => r.me && u.equals(message.author), //filtro para pegar a reação que o bot irá criar e pegando o author da reação
      collector = msg.createReactionCollector({ filter }); //criando o collector com o filtro acima, max é o maximo de reações como na array tem 3 emojis o numero irá ser 3, e o time é o tempo maximo para reações coloquei 30s

    collector.on('collect', (r) => {//evento collector
      switch (r.emoji.id) {//switch basico pegando o nome do emoji
        case '739830713792331817': {
          const embedbanido = new MessageEmbed()
            .setDescription(`<:concludo:739830713792331817> O canal <#${message.channel.id}> foi bloqueado com sucesso!`)
            .setColor(colors['default'])
          msg.edit(embedbanido)
          message.channel.updateOverwrite(message.guild.id,
            { SEND_MESSAGES: false })
          break;
        }
        case '739831089543118890': {
          const embedbanido = new MessageEmbed()
            .setDescription(`<:concludo:739830713792331817> O canal <#${message.channel.id}> foi desbloqueado com sucesso!`)
            .setColor(colors['default'])
          msg.edit(embedbanido)
          message.channel.updateOverwrite(message.guild.id,
            { SEND_MESSAGES: true })
          break;
        }
      }
    })

  }
}