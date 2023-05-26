const { Command } = require('../../utils')

module.exports = class blList extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'bllist'
    this.aliases = ['bllist', 'blacklist-list']
    this.category = 'Magic'
    this.adminOnly = true
  }

  // eslint-disable-next-line no-unused-vars
  GiantMessageDiscordAPI(textArray) {
    const splitedMessage = ['']
    let currentMessage = 0
    textArray.forEach(text => {
      console.log(text)
        const separetedText = text + '\n'
        if (splitedMessage.length + separetedText.length >= 2000) {
            currentMessage++
            splitedMessage[currentMessage] = ''
        }
        splitedMessage[currentMessage] = splitedMessage[currentMessage] + separetedText
    })

    return splitedMessage
}
  async run(message, args) {
    const staff = await this.client.database.user.getOrCreate(message.author.id)
    if (!staff.staff) {
      return message.reply('Você não pode utilizar este comando, somente os membros confiados da equipe @deleted-role')
    }
    const userDoc = await this.client.database.user.model.find({ 'blacklist': true })
    const msg = [];

    for (let i = 0; i < userDoc.length; i++) {
      const user = await this.client.users.fetch(userDoc[i]._id)
      msg.push(`${user.tag} - ${user.id}`)
    }

    await message.reply(`<:__:1090466363132354670> Lista de membros na blacklist:\n`)
    const splittedMessages = this.GiantMessageDiscordAPI(msg)
    splittedMessages.forEach(async msg =>{
    await message.reply(msg)
})
    }
  }