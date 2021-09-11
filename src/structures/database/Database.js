const mongoose = require('mongoose')
const Collection = require('./Collection')
module.exports = class Database {
  constructor() {
    if (process.env.MONG) {
      mongoose.connect(process.env.MONG, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
        if (error) return console.log(`Sorry, I'm unable to connect to the database: ${error.message}`)
        console.log('Successfully connected to the database.')
      })
    }
  }
}