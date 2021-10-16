const CommandExecuter = require('../../structures/commands/CommandExecuter')
module.exports = {
  name: 'messageCreate',
  exec: async (client, message) => {
    CommandExecuter.exec(client, message)
  }
}