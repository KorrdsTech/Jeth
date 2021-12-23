const { Command, colors } = require('../../utils')
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')

module.exports = class userinfo extends Command {
	constructor(name, client) {
		super(name, client)

		this.aliases = ['infomember', 'member']
		this.category = 'misc'
		this.subcommandsOnly = false
	}

	async run(message, args, user) {
		// const status = {
		// 	online: {
		// 		msg: `Online`,
		// 		color: '00C903'
		// 	},
		// 	idle: {
		// 		msg: `Ausente`,
		// 		color: 'FF9A00'
		// 	},
		// 	dnd: {
		// 		msg: `Não incomodar`,
		// 		color: 'FF0000'
		// 	},
		// 	offline: {
		// 		msg: `Desconectado/invisivel`,
		// 		color: 'D8D8D8'
		// 	},
		// };

		let pUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author)

		let normalUser = new Discord.MessageEmbed()
			.setAuthor(pUser.user.tag, pUser.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.addField(`Discord Tag`, `**${pUser.user.tag}**`, true)
			.addField('Status', `\`\`\`md\n# ${pUser.presence.status} \`\`\``, true)
			.addField('Jogando', `\`\`\`md\n# ${pUser.user.presence.game ? `${pUser.presence.game.name}` : 'Nada'}\`\`\``, false)
			.addField(`Discord Name`, `\`\`\`diff\n- ${pUser.user.username} -\`\`\``, true)
			.addField('ID', `\`\`\`\n${pUser.id}\`\`\``, true)
			.addField(`Apelido dentro do servidor`, pUser.nickname ? pUser.nickname : '`Nenhum apelido neste servidor.`', true)
			.addField(`Conta criada em`, `\`${moment(pUser.user.createdTimestamp).format('LL')}\``, true)
			.addField(`Dias no Discord:`, `Estou á \`${moment().diff(pUser.user.createdAt, 'days')}\` dia (s) no discord`, true)
			.addField(`Dias no servidor:`, `Estou á \`${moment().diff(pUser.joinedAt, 'days')}\` dia (s) no servidor`, true)
			.addField(`Meus Cargos`, pUser.roles.cache.map(role => role.toString()).join(' ').replace('@everyone', ' '), true)
			.addField('🌎 | Servidores compartilhados:', `${this.client.guilds.cache.filter(a => a.members.cache.get(pUser.user.id)).map(a => a.name).join(', ')}`, false)
			.setColor(colors.default)
			.setThumbnail(pUser.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setFooter(`${message.guild.name} - ${moment().format('LL')}`, message.guild.iconURL({ dynamic: true, size: 1024 }));

		let deviants = new Discord.MessageEmbed()
			.setAuthor(pUser.user.tag, pUser.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.addField(`Discord Tag`, `**${pUser.user.tag}**`, true)
			.addField('Status', `\`\`\`md\n# ${pUser.presence.status} \`\`\``, true)
			.addField('Jogando', `\`\`\`md\n# ${pUser.user.presence.game ? `${pUser.presence.game.name}` : 'Nada'}\`\`\``, false)
			.addField(`Discord Name`, `\`\`\`diff\n- ${pUser.user.username} -\`\`\``, true)
			.addField('ID', `\`\`\`\n${pUser.id}\`\`\``, true)
			.addField(`Apelido dentro do servidor`, pUser.nickname ? pUser.nickname : '`Nenhum apelido neste servidor.`', true)
			.addField(`Conta criada em`, `\`${moment(pUser.user.createdTimestamp).format('LL')}\``, true)
			.addField(`Dias no Discord:`, `Estou á \`${moment().diff(pUser.user.createdAt, 'days')}\` dia (s) no discord`, true)
			.addField(`Dias no servidor:`, `Estou á \`${moment().diff(pUser.joinedAt, 'days')}\` dia (s) no servidor`, true)
			.addField('🌎 | Servidores compartilhados:', `${this.client.guilds.cache.filter(a => a.members.cache.get(pUser.user.id)).map(a => a.name).join(', ')}`, false)
			.setColor(colors.default)
			.setThumbnail(pUser.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setFooter(`${message.guild.name} - ${moment().format('LL')}`, message.guild.iconURL({ dynamic: true, size: 1024 }));
		{
			let roll = pUser.roles.cache.map(role => role.toString()).join(' ').replace('@everyone', ' ')
			if (!roll.includes('831041498870710313')) message.channel.send(deviants)
		}
		let embed = new Discord.MessageEmbed()
			.setDescription('**Veja todas as insígnias que este usuário possui dentro da Jeth:**\n\nCaso você não esteja vendo nenhuma insígnia, certifique-se de estar visualizando pelo nosso servidor oficial da Jeth, caso mesmo assim elas não estejam sendo aparecendo utilize /bug')
			.setColor(colors.default)
			.setThumbnail(pUser.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setFooter(`${message.guild.name} - ${moment().format('LL')}`, message.guild.iconURL({ dynamic: true, size: 1024 }));


		await message.channel.send(normalUser).then(msg => {
			setTimeout(() => {
				msg.react('856174396036743230')
			}, 500)
			const collector = msg.createReactionCollector((r, u) => (r.emoji.id === '856174395801468989', '856174396129148968') && (u.id !== this.client.user.id && u.id === message.author.id))
			collector.on('collect', async r => {
				switch (r.emoji.id) {
					case '856174396036743230':
						if (pUser.roles.cache.has('838581046881681419')) {
							embed.addField('<:e_king:879546953787138068>', '**This member is the bot Owner.**')
						}
						if (pUser.roles.cache.has('831041495326261278')) {
							embed.addField('<:a_blurpleemployee:856174396423274516>', '**This user is a staff member.**')
						}
						if (pUser.roles.cache.has('804590005577842689')) {
							embed.addField('<a:0_:875581760262504468>', '**This user is a server booster.**')
						}
						if (pUser.roles.cache.has('839754099573522452')) {
							embed.addField('<:a_blurplegift:856174396384215040>', '**This user is a vip member.**')
						}
						if (pUser.roles.cache.has('838921340085731338')) {
							embed.addField('<:e_bug_hunter_lvl2:879567683182538783>', '**This user reported bot bugs for the devs.**')
						}
						if (pUser.roles.cache.has('838994687985451039')) {
							embed.addField('<:a_blurplepartner:856174395869626399>', '**This user is a Jeth partner.**')
						}
						await msg.edit(embed)
						msg.reactions.cache.get('856174396036743230').users.remove();
						msg.reactions.cache.get('856174396036743230').users.remove(pUser);
						msg.react('856174395801468989')
						break;
					case '856174395801468989':
						await msg.edit(normalUser)
						msg.reactions.cache.get('856174395801468989').users.remove();
						msg.reactions.cache.get('856174395801468989').users.remove(pUser);
						msg.react('856174396036743230')
						break;

				}
			})
		})
	}
}