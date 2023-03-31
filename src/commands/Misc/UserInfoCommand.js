const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')

module.exports = class userinfo extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'userinfo'
    this.aliases = ['userinfo', 'infomember', 'member']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {

    const Jeth = this.client.guilds.cache.get('1001368891160805506')
    const pUser = message.guild.members.cache.get(args[0]?.replace(/[<@!>]/g, '') || message.author.id)
    const flags = []
    if (Jeth) {
      if (Jeth.members.cache.get(pUser.user.id)) {
        if (Jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1001368891248889962')) {
          flags.push('<:ThisUserIsCEO:938280523585957978>')
        }
      }

      if (Jeth.members.cache.get(pUser.user.id)) {
        if (Jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1001368891240480781')) {
          flags.push('<:ThisUserIsJethStaff:938280523447566376>')
        }
      }

      if (Jeth.members.cache.get(pUser.user.id)) {
        if (Jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('804590005577842689')) {
          flags.push('<:ThisUserIsServerBooster:938280524047343656>')
        }
      }

      if (Jeth.members.cache.get(pUser.user.id)) {
        if (Jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1001368891215323216')) {
          flags.push('<:ThisUserIsVIP:938280523468509245>')
        }
      }

      if (Jeth.members.cache.get(pUser.user.id)) {
        if (Jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1001368891227914268')) {
          flags.push('<:ThisUserIsBugHunter:938280523426578534>')
        }
      }

      if (Jeth.members.cache.get(pUser.user.id)) {
        if (Jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1001368891240480778')) {
          flags.push('<:ThisUserIsJethPartner:938282680028651600>')
        }
      }

      if (Jeth.members.cache.get(pUser.user.id)) {
        if (Jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1001368891185975351')) {
          flags.push('<:Bravery:938280523153965097>')
        }
      }

      if (Jeth.members.cache.get(pUser.user.id)) {
        if (Jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1001368891185975349')) {
          flags.push('<:Balance:938280523409817600>')
        }
      }

      if (Jeth.members.cache.get(pUser.user.id)) {
        if (Jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1001368891185975350')) {
          flags.push('<:Brilliance:938280523426578533>')
        }
      }

      if (Jeth.members.cache.get(pUser.user.id)) {
        if (Jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1001368891248889960')) {
          flags.push('<:ThisUserIsTrustSafety:938280523091025964>')
        }
      }

      if (Jeth.members.cache.get(pUser.user.id)) {
        if (Jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1001368891248889961')) {
          flags.push('<:ThisUserIsJethDev:939896774267654264>')
        }
      }

      if (Jeth.members.cache.get(pUser.user.id)) {
        if (Jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1001368891240480779')) {
          flags.push('<a:ThisUserIsPatreon:940901127048814644>')
        }
      }
    }

    const normalUser = new MessageEmbed()
      .setAuthor({ name: pUser.user.tag, iconURL: pUser.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
      .addField(`Discord Tag`, `${flags?.join(' ')} \n**${pUser.user.tag}**`, true)
      .addField('Status', `\`\`\`md\n# ${pUser.presence.status} \`\`\``, true)
      .addField('Jogando', `\`\`\`md\n# ${pUser.presence.activities[0]?.name ?? 'Nada'}\`\`\``, false)
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
      .setFooter({ text: `${message.guild.name} - ${moment().format('LL')}`, iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) });

    message.reply({ embeds: [normalUser] })
  }
}