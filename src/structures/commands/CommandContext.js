module.exports = class CommandContext {
  constructor(client, message, args, database) {
    this.client = client
    this.message = message
    this.args = args
    this.database = database
  }
}