const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class evalcmd extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'eval'
    this.aliases = ['evaluate', 'ev', 'eval']
    this.category = 'Somente Donos'
    this.adminOnly = true
  }

  async run(message, args) {

    try {
      const util = require('util');
      const code = args.join(' ');
      const ev = eval(code)
      let str = util.inspect(ev, {
        depth: 1
      })
      str = `${str.replace(new RegExp(`${this.client.token}`, 'g'), 'undefined')}`;
      if (str.length > 1800) {
        str = str.substr(0, 1800)
        str = str + '...'
      }
      message.channel.send(str, { code: 'js' })

    } catch (err) {
      if (err.stack.length > 1800) {
        err.stack = err.stack.substr(0, 1800)
        err.stack = `${err.stack}...`
      }
      const embed = new MessageEmbed()
        .setColor('#ff004c')
        .setTitle(`Oh no... An error occurred while doing this action, I'm sorry for what happened. :sob:`)
        .setDescription(`\`\`\`${err.stack}\`\`\``)

      message.channel.send(embed)
    }
  }
}