const { Command } = require('../../utils')

module.exports = class StaffCommand extends Command {
  constructor(client) {
    super(client)

    this.aliases = ['s', 'ac']
    this.category = 'magic'
    this.adminOnly = true
  }

  async run(message, args) {
    const mens = args.join(' ');
    message.guild.members.cache.filter(member => member.roles.cache.get('718178715418230792')).forEach(member => {
      setTimeout(async () => {
        member.send(mens)
      }, 6000);
    })
  }
}