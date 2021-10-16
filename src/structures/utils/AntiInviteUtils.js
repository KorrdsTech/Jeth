module.exports = class AntinviteUtils{
  async static exec(client, message, { guildData }) {
    if (!(guildData.antInvite) && !(message.member.permissions.has('ADMINISTRATOR'))) return
    if (!this.isInvite(message.content)) return

    
  }

  static isInvite(invite) {
    if ((/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io))/g).test(invite)) {
      const inviteReplace_1 = invite
        .replace(/(https:\/\/)?(http:\/\/)/g, '')
        .replace(/(discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io)/g, '')
        .replace(/(\/)/g, '')

      if (inviteReplace_1.length < 1) return false
      if ((/(\/+(\s+[a-z0-9-.]+)?.+)/g).test(invite)) {
        return true
      } else {
        return false
      }
    }

    return (/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io))/g).test(invite)
  }
}