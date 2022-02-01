const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')

module.exports = class UserInfoCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'userinfo'
    this.aliases = ['infomember', 'member']
    this.category = 'misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
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

    const pUser = message.guild.members.cache.get(args[0]?.replace(/<@!>/g, '') || message.author.id)
    const flags = []

    if (pUser.roles.cache.has('838581046881681419')) {
      flags.push('<:e_king:879546953787138068>')
    }
    if (pUser.roles.cache.has('831041495326261278')) {
      flags.push('<:a_blurpleemployee:856174396423274516>')
    }
    if (pUser.roles.cache.has('804590005577842689')) {
      flags.push('<a:0_:875581760262504468>')
    }
    if (pUser.roles.cache.has('839754099573522452')) {
      flags.push('<:a_blurplegift:856174396384215040>')
    }
    if (pUser.roles.cache.has('838921340085731338')) {
      flags.push('<:e_bug_hunter_lvl2:879567683182538783>')
    }
    if (pUser.roles.cache.has('838994687985451039')) {
      flags.push('<:a_blurplepartner:856174395869626399>')
    }
    const normalUser = new MessageEmbed()
      .setAuthor(pUser.user.tag, pUser.user.displayAvatarURL({ dynamic: true }))
      .addField(`Discord Tag`, `${flags?.join(' ')} **${pUser.user.tag}**`, true)
      .addField(`Discord Name`, `\`\`\`diff\n- ${pUser.user.username} -\`\`\``, true)
      .addField('ID', `\`\`\`\n${pUser.id}\`\`\``, true)
      .addField(`Apelido dentro do servidor`, pUser.nickname ? pUser.nickname : '`Nenhum apelido neste servidor.`', true)
      .addField(`Conta criada em`, `\`${moment(pUser.user.createdTimestamp).format('LL')}\``, true)
      .addField(`Dias no Discord:`, `Estou á \`${moment().diff(pUser.user.createdAt, 'days')}\` dia (s) no discord`, true)
      .addField(`Dias no servidor:`, `Estou á \`${moment().diff(pUser.joinedAt, 'days')}\` dia (s) no servidor`, true)
      .addField(`Meus Cargos`, pUser.roles.cache.map(role => role.toString()).join(' ').replace('@everyone', ' '), true)
      .addField('🌎 | Servidores compartilhados:', `${this.client.guilds.cache.filter(a => a.members.cache.get(pUser.user.id)).map(a => a.name).join(', ')}`, false)
      .setColor(colors['default'])
      .setThumbnail(pUser.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setFooter(`${message.guild.name} - ${moment().format('LL')}`, message.guild.iconURL({ dynamic: true, size: 1024 }));
    message.channel.send({ embeds: [normalUser] })
  }
}