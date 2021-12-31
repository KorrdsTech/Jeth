const { Command, colors } = require('../../utils')
const Discord = require('discord.js');

module.exports = class KillCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'matar'
    this.aliases = ['kill']
    this.category = 'fun'
  }

  async run(message, args) {
    if (!message.channel.nsfw) return message.channel.send('<:CancelarK:673592197341249559> Este comando só pode ser executado em um canal **NSFW**')
    const slapUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!slapUser) return message.channel.send('`Mencione o usuário que deseje matar!`');

    const gifs = ['https://data.whicdn.com/images/104398900/original.gif', 'https://78.media.tumblr.com/2628ad116065497e0ddae5cc27481b38/tumblr_okg77jiBO51w264geo2_540.gif', 'http://68.media.tumblr.com/c9340ffe7bd88258ec374a9cdf571ec3/tumblr_okxuc75yRi1w0ii2ho1_400.gif', 'https://data.whicdn.com/images/231782998/original.gif', 'https://media1.tenor.com/images/25f853a32137e24b11cd13bc2142f63a/tenor.gif?itemid=7172028']

    const killEmbed = new Discord.MessageEmbed()
      .setColor(colors['default'])
      .setDescription(`:skull: ${message.author} **matou o usuário** ${message.mentions.users.first().username}`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setFooter(`Killstreak por ${message.author}`, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTimestamp();

    message.channel.send(killEmbed)
  }
}