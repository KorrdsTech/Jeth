const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')

module.exports = class apagar extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'clear'
    this.aliases = ['apagar', 'clear', 'limpar', 'clean']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const embedA = new EmbedBuilder()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.has('MANAGE_MESSAGES'))
      return message.reply({ embeds: [embedA] })
    const deleteCount = parseInt(args[0], 10);
    try {
      message.delete();
    } catch (error) {
      console.log(error);
      message.reply(error);
    }
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply('`Por favor, forneça um número entre 2 e 100 para o número de mensagens a serem excluídas`');

    const fetched = await message.channel.messages.fetch({ limit: deleteCount });
    message.channel.bulkDelete(fetched)
    const embedB = new EmbedBuilder()
      .setTimestamp()
      .setColor(colors['default'])
      .setTitle(`<:ayaya:683491996790554629> ${message.author.username}`, true)
      .setDescription(`As mensagens requisitadas no servidor ${message.guild} foram **deletadas** com sucesso!`)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })
    return message.author.send({ embeds: [embedB] })
      .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
  }
}