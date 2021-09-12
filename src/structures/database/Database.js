const mongoose = require('mongoose')
const Collection = require('./Collection')
const channel = require('./collections/Channels')
const guild = require('./collections/Guild')
const role = require('./collections/Roles')
const user = require('./collections/User')
const userMuted = require('./collections/UsersMuted')
module.exports = class Database {
  constructor() {
    if (process.env.MONG) {
      mongoose.connect(process.env.MONG, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
        if (error) return console.log(`Sorry, I'm unable to connect to database: ${error.message}`)
        console.log('Successfully connected to database.')
      })
    }

    this.channels = new Collection(channel)
    this.guilds = new Collection(guild)
    this.roles = new Collection(role)
    this.users = new Collection(user)
    this.usersMuted = new Collection(userMuted)
  }
}