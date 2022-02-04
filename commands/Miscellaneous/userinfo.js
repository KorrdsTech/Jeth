const { Command, colors } = require('../../utils')
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')

module.exports = class userinfo extends Command {
	constructor(name, client) {
		super(name, client)

		this.aliases = ['infomember', 'member']
		this.category = 'Miscellaneous'
		this.subcommandsOnly = false
	}

	async run(message, args, user) {


		const jeth = this.client.guilds.cache.get('804575416098488380')
		const pUser = message.guild.members.cache.get(args[0]?.replace(/[<@!>]/g, '') || message.author.id)
		const flags = []

		if (jeth.members.cache.get(pUser.user.id)) {
			if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('838581046881681419')) {
		  flags.push('<:CEO:938280523585957978>')
		}
	}

		if (jeth.members.cache.get(pUser.user.id)) {
			if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('831041495326261278')) {
		  flags.push('<:StaffJeth:938280523447566376>')
		}
	}

	if (jeth.members.cache.get(pUser.user.id)) {
		if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('804590005577842689')) {
		  flags.push('<:ServerBooster:938280524047343656>')
		}
	}

	if (jeth.members.cache.get(pUser.user.id)) {
		if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('839754099573522452')) {
		  flags.push('<:UsuarioVIP:938280523468509245>')
		}
	}
	
		if (jeth.members.cache.get(pUser.user.id)) {
			if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('838921340085731338')) {
		  flags.push('<:BugHunter:938280523426578534>')
		}
	}

		if (jeth.members.cache.get(pUser.user.id)) {
			if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('838994687985451039')) {
		  flags.push('<:ParceiroJeth:938282680028651600>')
		}
	}

		if (jeth.members.cache.get(pUser.user.id)) {
			if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('927895349769687080')) {
			flags.push('<:Bravery:938280523153965097>')
		}
	}

		if (jeth.members.cache.get(pUser.user.id)) {
			if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('927895430124159037')) {
			flags.push('<:Balance:938280523409817600>')
		}
	}

		if (jeth.members.cache.get(pUser.user.id)) {
			if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('927895419466420254')) {
			flags.push('<:Brilliance:938280523426578533>')
		}
	}

		if (jeth.members.cache.get(pUser.user.id)) {
			if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('838650358342352927')) {
			flags.push('<:TrustSafety:938280523091025964>')
		}
	}

		let normalUser = new Discord.MessageEmbed()
			.setAuthor(pUser.user.tag, pUser.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.addField(`Discord Tag`, `${flags?.join(' ')} \n**${pUser.user.tag}**`, true)
			.addField("Status", `\`\`\`md\n# ${pUser.presence.status} \`\`\``, true)
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

		message.channel.send(normalUser)
	}
}