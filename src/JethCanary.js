const { Client, Collection } = require('discord.js')
const Fs = require('fs')

module.exports = class JethCanary extends Client {
  constructor(options = {}) {
    super(options)

    this.commands = new Collection()
    this.initCommands('./src/commands')
    this.database = require('./utils/database.js')
    this.initListeners('./src/listeners')
  }

  initCommands(path) {
    Fs.readdirSync(path)
      .forEach(file => {
        try {
          let filePath = path + '/' + file
          if (file.endsWith('.js')) {
            const Command = require(`.${filePath}`)
            const commandName = file.replace(/.js/g, '').toLowerCase()
            const command = new Command(commandName, this)
            return this.commands.set(commandName, command)
          } else if (Fs.lstatSync(filePath).isDirectory()) {
            this.initCommands(filePath)
          }
        } catch (error) {
          console.error(error)
        }
      })
  }

  initListeners(path) {
    Fs.readdirSync(path)
      .forEach(file => {
        try {
          let filePath = path + '/' + file
          if (file.endsWith('.js')) {
            let Listener = require(`.${filePath}`)
            this.on(file.replace(/.js/g, ''), Listener)
          }

          let stats = Fs.lstatSync(filePath)
          if (stats.isDirectory()) {
            this.initListeners(filePath)
          }
        } catch (error) {
          console.error(error)
        }
      })
  }

  sendLoggerError(error) {
    console.log(error)
    let embed = new MessageEmbed()
      .setColor('RED')
      .setTitle(error.name)
      .setAuthor(this.user.username, this.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addDescription(error.message)
      .addField('Arquivo', `${error.fileName} ${error.lineNumber}`)
    return this.channels.get('658890776935137290').send({ embeds: [embed] })
  }
}