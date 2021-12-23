const { Command } = require('../../utils')

module.exports = class anuncio extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = ['allunban', 'unbanall']
    this.category = 'mod'
  }

  async run(message) {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply('Desculpe, você não tem permissão de desbanir usuários neste servidor! <:moderador:662850826737418250>').catch(() => { });
    }
    if (message.member.permissions.has('BAN_MEMBERS')) {
      message.guild.fetchBans().then(bans => {
        if (bans.size == 0) { message.reply('There are no banned users.'); throw 'No members to unban.' };
        bans.forEach(ban => {
          message.guild.members.unban(ban.user.id);
        });
      }).then(() => message.reply('Unbanned all users.')).catch(e => console.log(e))
    } else {
      message.reply('You do not have enough permissions for this command.')
    }
  }
};
