const { MessageEmbed } = require('discord.js')
const { colors } = require('../utils')
const Discord = require('discord.js')

module.exports = async function onMessageDelete(message, client, messageDelete, msg) {
        // message Delete Module
        if (!message.guild) return;
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
        });
        // Since there's only 1 audit log entry in this collection, grab the first one
        const deletionLog = fetchedLogs.entries.first();
    
        // Perform a coherence check to make sure that there's *something*
        if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
    
        // Now grab the user object of the person who deleted the message
        // Also grab the target of this action to double-check things
        const { executor, target } = deletionLog;
    
        // Update the output with a bit more information
        // Also run a check to make sure that the log returned was for the same author's message
        if (target.id === message.author.id) {
            message.guild.channels.cache.get('831041533469655070').send(`Uma mensagem de ${message.author.tag} foi deletada por ${executor.tag}.`);
        } else {
            message.guild.channels.cache.get('831041533469655070').send(`Uma mensagem de ${message.author.tag} foi deletada, mas ainda não sabemos por quem.`);
        }
}; // end of it finnaly :3