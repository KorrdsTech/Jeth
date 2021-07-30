const { Command, colors } = require('../../utils')
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')

module.exports = class memberinfo extends Command {
	constructor(name, client) {
		super(name, client)

		this.aliases = ['infomember', 'member']
		this.category = 'Miscellaneous'
		this.subcommandsOnly = false
	}

	async run(message, args, user) {
		const status = {
			online: {
				msg: `Online`,
				color: "00C903"
			},
			idle: {
				msg: `Ausente`,
				color: "FF9A00"
			},
			dnd: {
				msg: `Não incomodar`,
				color: "FF0000"
			},
			offline: {
				msg: `Desconectado/invisivel`,
				color: "D8D8D8"
			},
		};

		let pUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author)

		let normalUser = new Discord.MessageEmbed()
			.setAuthor(pUser.user.tag, pUser.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.addField(`Discord Tag`, `**${pUser.user.tag}**`, true)
			.addField("Status", `**${status[pUser.presence.status].msg}**`, true)
			.addField("Jogando", `\`\`\`md\n# ${pUser.user.presence.game ? `${pUser.presence.game.name}` : "Nada"}\`\`\``, false)
			.addField(`Discord Name`, `\`\`\`diff\n- ${pUser.user.username} -\`\`\``, true)
			.addField('ID', `\`\`\`\n${pUser.id}\`\`\``, true)
			.addField(`Apelido dentro do servidor`, pUser.nickname ? pUser.nickname : "`Nenhum apelido neste servidor.`", true)
			.addField(`Conta criada em`, `\`${moment(pUser.user.createdTimestamp).format("LL")}\``, true)
			.addField(`Dias no Discord:`, `Estou á \`${moment().diff(pUser.user.createdAt, "days")}\` dia (s) no discord`, true)
			.addField(`Dias no servidor:`, `Estou á \`${moment().diff(pUser.joinedAt, "days")}\` dia (s) no servidor`, true)
			.addField(`Meus Cargos`, pUser.roles.cache.map(role => role.toString()).join(" ").replace('@everyone', ' '), true)
			.addField('🌎 | Servidores compartilhados:', `${this.client.guilds.cache.filter(a => a.members.cache.get(pUser.user.id)).map(a => a.name).join(', ')}`, false)
			.setColor(colors.default)
			.setThumbnail(pUser.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setFooter(`${message.guild.name} - ${moment().format("LL")}`, message.guild.iconURL({ dynamic: true, size: 1024 }));

		let embed = new Discord.MessageEmbed()
			.setDescription('**Veja todas as insígnias que este usuário possui dentro da Jeth:**\n\nCaso você não esteja vendo nenhuma insígnia, certifique-se de estar visualizando pelo nosso servidor oficial da Jeth, caso mesmo assim elas não estejam sendo aparecendo utilize /bug')
			.setColor(colors.default)
			.setThumbnail(pUser.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setFooter(`${message.guild.name} - ${moment().format("LL")}`, message.guild.iconURL({ dynamic: true, size: 1024 }));


		await message.channel.send(normalUser).then(msg => {
			setTimeout(() => {
				msg.react('754934349069287505')
			}, 500)
			const collector = msg.createReactionCollector((r, u) => (r.emoji.id === '667590654200774656', '667590655744147521', '667590655698141197') && (u.id !== this.client.user.id && u.id === message.author.id))
			collector.on('collect', async r => {
				switch (r.emoji.id) {
					case '754934349069287505':
						if (pUser.roles.cache.has('718178715426619491')) {
							embed.addField('<a:b_developer:754934350276984912>', '**This member is the bot Owner.**')
						}
						if (pUser.roles.cache.has('718178715418230792')) {
							embed.addField('<a:astaff:671435205302681603>', '**This user is a staff member.**')
						}
						if (pUser.roles.cache.has('750461952614203393')) {
							embed.addField('<a:r_server_boosting:751195793108500601>', '**This user is a server booster.**')
						}
						if (pUser.roles.cache.has('718178715409973347')) {
							embed.addField('<:b_early_supporter:742242543143616572>', '**This user is a vip member.**')
						}
						if (pUser.roles.cache.has('718178715418230791')) {
							embed.addField('<:a_BugHunterLvl2:754934348884738139>', '**This user reported bot bugs for the devs.**')
						}
						if (pUser.roles.cache.has('718178715414167582')) {
							embed.addField('<:b_DiscordPartner:754934349215826060>', '**This user is a Jeth partner.**')
						}
						await msg.edit(embed)
						msg.reactions.cache.get("754934349069287505").users.remove();
						msg.reactions.cache.get("754934349069287505").users.remove(pUser);
						msg.react('665721366514892839')
						msg.delete({timeout: 6400})
						break;
					case '665721366514892839':
						await msg.edit(normalUser)
						msg.reactions.cache.get('665721366514892839').users.remove();
						msg.reactions.cache.get('665721366514892839').users.remove(pUser);
						msg.react('754934349069287505')
						break;

				}
			})
		})
	}
}