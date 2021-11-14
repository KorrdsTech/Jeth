const { Command, colors } = require('../../utils')
const Discord = require("discord.js");

module.exports = class slaptable extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = ['mesa', 'connor']
    this.category = 'Entretenimento'
  }
  async run(message, args) {

    var gifs = ['https://c.tenor.com/LdLkO1UjQM8AAAAC/slam-table-28stab-wounds.gif'];

    let slapEmbed = new Discord.MessageEmbed()
      .setDescription(`**TWENTY-EIGHT STAB WOUNDS!**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setColor(colors.default)
      .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp();
    message.channel.send(slapEmbed)
  }
}