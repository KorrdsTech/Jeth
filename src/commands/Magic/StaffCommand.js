const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class staff extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'staff'
    this.aliases = ['staff', 's', 'ac']
    this.category = 'Magic'
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