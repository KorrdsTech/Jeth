const Collection = require('./Collection')
const mongoose = require('mongoose')
const canal = require('./collections/Canal')
const cargo = require('./collections/Cargo')
const guild = require('./collections/Guild')
const user = require('./collections/User')
module.exports = class Database {
  constructor() {
    mongoose.connect(process.env.MONG, {}, (err) => {
      if (err) return console.log(`(x) Não consegui me conectar no banco de dados \n${err.stack}`)
      console.log('(>) Eu me conectei no meu banco de dados!')
    })

    this.canal = new Collection(canal)
    this.cargo = new Collection(cargo)
    this.guild = new Collection(guild)
    this.user = new Collection(user)
  }
}