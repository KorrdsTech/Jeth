const { MessageEmbed } = require('discord.js');

module.exports = async function onMessageDelete(message, messageDelete) {
  if (!message.guild) return;

  try {
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: 'MESSAGE_DELETE',
    });

    // Since there's only 1 audit log entry in this collection, grab the first one
    const deletionLog = fetchedLogs.entries.first();

    // Perform a coherence check to make sure that there's *something*
    if (!deletionLog) {
      console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
      return;
    }

    // Now grab the user object of the person who deleted the message
    // Also grab the target of this action to double-check things
    const { executor, target } = deletionLog;

    // Update the output with a bit more information
    // Also run a check to make sure that the log returned was for the same author's message
    const logChannelId = '831041533469655070';
    const logChannel = message.guild.channels.cache.get(logChannelId);

    if (!logChannel) {
      console.log(`Log channel (${logChannelId}) not found.`);
      return;
    }

    const embed = new MessageEmbed()
      .setColor('#ff0000')
      .setDescription(`Uma mensagem de ${message.author.tag} foi deletada`);

    if (target.id === message.author.id) {
      embed.addField('Deletada por', executor.tag);
    } else {
      embed.addField('Autor da mensagem', message.author.tag);
      embed.addField('Deletada por', 'Desconhecido');
    }

    logChannel.send({ embeds: [embed] });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
  }
};
