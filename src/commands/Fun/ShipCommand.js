const { Command, colors } = require('../../utils')
const Discord = require('discord.js');
const { getMember } = require('../../utils/functions.js');

module.exports = class ship extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'ship'
    this.aliases = ['ship', 'shipar']
    this.category = 'Fun'
  }

  async run(message, args) {
        // Get a member from mention, id, or username
    let person = getMember(message, args[0]);

        // If no person is found
        // It's going to default to the author
        // And we don't want to love ourself in this command
        // So we filter out our ID from the server members
        // And get a random person from that collection
    if (!person || message.author.id === person.id) {
      person = message.guild.members
        .filter(m => m.id !== message.author.id)
        .random();
    }

        // love is the percentage
        // loveIndex is a number from 0 to 10, based on that love variable
    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = '💖'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);

    const imagens_ships = [
      'https://c.tenor.com/VSWscdkd4-8AAAAC/anime-love.gif',
      'https://i.pinimg.com/originals/0a/32/03/0a3203ced13826a92230cc61214318da.gif',
      'https://i.gifer.com/2q3j.gif'
    ];

    const embed = new Discord.MessageEmbed()
      .setColor(colors.default)
      .addField(`💗 **${person.displayName}** ama **${message.member.displayName}** este tanto:`,
        `💟 ${Math.floor(love)}%\n\n${loveLevel}`)
      .setImage(imagens_ships[Math.floor(Math.random() * imagens_ships.length)])
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp();
    message.channel.send(embed);
  }
}