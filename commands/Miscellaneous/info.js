const { Command, colors } = require('../../utils');
const Discord = require('discord.js');
const client = new Discord.Client()

module.exports = class info extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = ['info', 'informação', 'botinfo', 'informações']
    this.category = 'Miscellaneous'
    this.subcommandsOnly = false
  }

  async run(message, client) {
    const moment = require('moment')
    moment.locale('pt-br')
    const moment1 = require('moment-duration-format')
    var client = this.client
    var embed = new Discord.MessageEmbed()

      .setDescription("<:info:695503582342152273> **Informações:**")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTimestamp()
      .setColor(colors.default)
      .setImage('https://media.giphy.com/media/3NnnS6Q8hVPZC/giphy.gif')
      .setDescription('**💖 Uma pequena bot focada em moderação sendo desenvolvida dentro deste vasto mundo conhecido como Discord 👧**')
      .addFields(
        {
          name: '<:7377_Discordbutcool:832746857159196672> Meu nome: **Jeth#5979**', value: `Estou online à: ${moment.duration(this.client.uptime).format("D [dias], H [horas], m [min], s [segundos]")}`, inline: true
        },
        { name: '<:9461systemmessageuser:832746852633149460> Programadores:', value: '<@753778869013577739> \n <@395788326835322882>', inline: false }
      )
      .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }));
    message.channel.send(embed).catch(() => { });
  }
};
