const { Command, colors } = require('../../utils');
const { EmbedBuilder } = require('discord.js');
const moment = require('moment')
require('moment-duration-format')

module.exports = class info extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'botinfo'
    this.aliases = ['info', 'informação', 'botinfo', 'informações']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    moment.locale('pt-br')
    const embed = new EmbedBuilder()
      .setDescription('<:info:695503582342152273> **Informações:**')
      .setThumbnail(this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTimestamp()
      .setColor(colors['default'])
      .setImage('https://media.giphy.com/media/3NnnS6Q8hVPZC/giphy.gif')
      .setDescription('**💖 Uma pequena bot focada em Mod sendo desenvolvida dentro deste vasto mundo conhecido como Discord 👧**\n[Me adicione aqui!](https://discord.com/oauth2/authorize?client_id=718210363014905866&scope=bot+identify+guilds+email+applications.commands&permissions=8)')
      .addFields([
        { name: `<:7377_Discordbutcool:832746857159196672> Meu nome: **${this.client.user.tag}**`, value: `Estou online à: ${moment.duration(this.client.uptime).format('D [dias], H [horas], m [min], s [segundos]')}` },
        { name: '<:9461systemmessageuser:832746852633149460> Programadores:', value: '<@442774319819522059>\n<@395788326835322882>', inline: false }
      ])
      .setFooter({ text: 'Moderando Discord', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) });
    message.reply({ embeds: [embed] })
  }
};
