const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class apagar extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = ['clear', 'limpar', 'clean']
    this.category = 'Miscellaneous'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const embedA = new Discord.MessageEmbed()

      .setTimestamp()
      .setColor(colors.mod)
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
      .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
      return message.channel.send(embedA)
    const deleteCount = parseInt(args[0], 10);
    try {
      message.delete();
    } catch (error) {
      console.log(error);
      message.channel.send(error);
    }
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("`Por favor, forneça um número entre 2 e 100 para o número de mensagens a serem excluídas`");

    const fetched = await message.channel.messages.fetch({ limit: deleteCount });
    message.channel.bulkDelete(fetched)
    const embedB = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor(colors.default)
      .setTitle(`<:ayaya:683491996790554629> ${message.author}`, true)
      .setDescription(`As mensagens requisitadas no servidor ${message.guild} foram **deletadas** com sucesso!`)
      .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
    return message.author.send(embedB)
      .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
  }
}