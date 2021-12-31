const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class ClearCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'apagar'
    this.aliases = ['clear', 'limpar', 'clean']
    this.category = 'misc'
    this.subcommandsOnly = false
    this.permissions = ['MANAGE_MESSAGES']
  }

  async run(message, args) {
    const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 2 || deleteCount > 100) return message.reply('`Por favor, forneça um número entre 2 e 100 para o número de mensagens a serem excluídas`');

    const fetched = await message.channel.messages.fetch({ limit: deleteCount });
    message.channel.bulkDelete(fetched)
    const embed = new MessageEmbed()
    embed.setTimestamp()
    embed.setColor(colors['default'])
    embed.setTitle(`<:ayaya:683491996790554629> ${message.author.username}`, true)
    embed.setDescription(`As mensagens requisitadas no servidor ${message.guild} foram **deletadas** com sucesso!`)
    embed.setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
    return message.author.send({ embeds: [embed] })
      .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
  }
}