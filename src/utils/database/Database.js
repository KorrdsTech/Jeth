const Collection = require('./Collection');
const mongoose = require('mongoose');
const Canal = require('./collections/Canal');
const Cargo = require('./collections/Cargo');
const Guild = require('./collections/Guild');
const User = require('./collections/User');
const Warn = require('./collections/Warn');

module.exports = class Database {
  constructor() {
    mongoose.connect(process.env.MONG, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log('(>) Eu me conectei no meu banco de dados!');
      })
      .catch((err) => {
        console.error(`(x) Não consegui me conectar no banco de dados \n${err.stack}`);
      });

    this.canal = new Collection(Canal);
    this.cargo = new Collection(Cargo);
    this.guild = new Collection(Guild);
    this.user = new Collection(User);
    this.warn = new Collection(Warn);
  }
};
