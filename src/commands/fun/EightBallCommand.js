const { Command, colors } = require('../../utils')
const Discord = require('discord.js');

module.exports = class EightBallCommand extends Command {
  constructor(client) {
    super(client)

    this.name = '8ball'
    this.aliases = ['cristal']
    this.category = 'fun'
  }

  async run(message, args) {

    if (!args[2]) return message.reply('`Por favor, faça a pergunta completa`')
    const replies = ['Sim.', 'Não.', 'Eu não sei.', 'talvez.', 'Depende.']

    const result = Math.floor(Math.random() * replies.length);
    const question = args.join(' ');

    const ballembed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag)
      .setColor(colors['default'])
      .addField('Questão', question)
      .addField('Resposta', replies[result])
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp()

    message.channel.send(ballembed);
  }
}