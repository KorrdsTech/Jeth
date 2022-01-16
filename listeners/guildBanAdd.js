const { MessageEmbed } = require('discord.js')

module.exports = async function onGuildBanAdd(ban) {

    const guild = this.guilds.cache.get('804575416098488380')
	const loggs = guild.channels.cache.get('832809257643671552')
	
        if (ban.id !== guild.id) return;
            const fetchedLogs = await guild.fetchAuditLogs({
                limit: 1,
                type: 'MEMBER_BAN_ADD',
            })

	// Since there's only 1 audit log entry in this collection, grab the first one
	const banLog = fetchedLogs.entries.first();

	// Perform a coherence check to make sure that there's *something*
	if (!banLog) return loggs.send(`<a:a_Wumpus_Sad:924250380953583659> ${ban.user.tag} foi banido do ${ban.guild.name} mas nenhum registro de auditoria foi encontrado.`);

	// Now grab the user object of the person who banned the member
	// Also grab the target of this action to double-check things
	const { executor, target } = banLog;

    const banned = new MessageEmbed()

	  .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTitle('Ação | Ban')
      .setColor("#ff112b")
      .setImage('https://media.discordapp.net/attachments/806749828943970315/905317119321858078/df54d411305571ca5d82371db65a97ea.gif')
      .setFooter("🧁・Discord da Jeth")
      .setTimestamp(new Date());

	// Update the output with a bit more information
	// Also run a check to make sure that the log returned was for the same banned member
        const channel = guild.channels.cache.get('832809257643671552')
		banned.setDescription(`**Banido!** \n \n<:Kaeltec:673592197177933864> **Staff:**  ${executor.tag} \n**ID:**  ${executor.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${target.tag} \n**ID:** ${target.id}`)
        channel.send(banned) 
		return
	// } else {
	// 	const channel = guild.channels.cache.get('832809257643671552')
	// 	banned.setDescription(`**Banido!** \n \n<:Kaeltec:673592197177933864> **Staff:**  😵‍💫Desconhecido😵‍💫 \n**ID:**  😵‍💫Desconhecido😵‍💫` + `\n<:Kaeltec:673592197177933864> **Banido:** ${target.tag} \n**ID:** ${target.id}`)
    //     channel.send(banned)
	// }
	}