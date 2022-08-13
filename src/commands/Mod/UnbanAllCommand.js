const { Command, colors } = require('../../utils')
const { EmbedBuilder } = require('discord.js')

module.exports = class allunban extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'unbanall'
    this.aliases = ['unbanall', 'allunban', 'unbanall']
    this.category = 'Mod'
  }

  async run(message) {
    const embed = new EmbedBuilder()
      .setColor(colors['default'])
      .setDescription('<:a_blurplecertifiedmoderator:856174396225355776> **Não pode desbanir este usuário!** tenha certeza de que você possui a permissão `BAN_MEMBERS` então você poderá desbanir usuários.')

    const embed2 = new EmbedBuilder()
      .setColor(colors['default'])
      .setDescription('<:a_blurplecertifiedmoderator:856174396225355776> **Todos os usuários desbanidos!** você com sucesso desbaniu todos os usuários do servidor.')

    const embed3 = new EmbedBuilder()
      .setColor(colors['default'])
      .setDescription('<:a_blurplecertifiedmoderator:856174396225355776> **Não posso desbanir este usuário!** tenha certeza de que eu tenho a permissão `BAN_MEMBERS` então eu poderei desbanir usuários.')

    const defina = new EmbedBuilder()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Configuração Incompleta (UNBANALL):**', `${message.author.username}`, true)
      .setDescription('Configure da forma ensinada abaixo.') // inline false
      .addField('*Uso do comando:*', '`PunishmentLogs set <canal>`', true)
      .addField('*Exemplo:*', '`PunishmentLogs set #geral`', true)

    const channel = await this.client.database.guild.getOrCreate(message.guild.id)
    const log = this.client.channels.cache.get(channel.punishChannel)
    if (!log) message.reply({ embeds: [defina] })
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply({ embeds: [embed] }).catch(() => { });
    }
    if (!message.guild.me.permissions.has('BAN_MEMBERS')) return message.reply({ embeds: [embed3] })
    message.guild.bans.fetch().then(bans => {
      if (bans.size == 0) { message.reply('There are no banned users.'); throw 'No members to unban.' }
      bans.forEach(ban => {
        message.guild.members.unban(ban.user.id);
      });
    }).then(() => log.send({ embeds: [embed2] })).catch(e => console.log(e))
  }
};
