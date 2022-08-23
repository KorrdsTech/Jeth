const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js');

module.exports = class Eightball extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'eightball'
    this.aliases = ['8ball', 'eightball', 'cristal']
    this.category = 'Fun'
  }

  async run(message, args) {
    if (!args[2]) return message.reply('`Por favor, faça a pergunta completa`')

    const replies = ['Sim.', 'Não.', 'Eu não sei.', 'talvez.', 'Depende.']
    const result = Math.floor(Math.random() * replies.length);
    const question = args.join(' ');

    const ballembed = new EmbedBuilder()
      .setAuthor(message.author.tag)
      .setColor(colors['default'])
      .addFields('Questão', question)
      .addFields('Resposta', replies[result])
      .setFooter({ text: 'Moderando Discord', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp()

    message.reply({ embeds: [ballembed] });
  }
}