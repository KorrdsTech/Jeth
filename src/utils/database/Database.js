const { Collection } = require('discord.js');
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

    this.canal = new Collection();
    this.cargo = new Collection();
    this.guild = new Collection();
    this.user = new Collection();
    this.warn = new Collection();

    this.initCollections();
  }

  async initCollections() {
    try {
      const canalData = await Canal.find();
      canalData.forEach((data) => {
        this.canal.set(data._id, data);
      });

      const cargoData = await Cargo.find();
      cargoData.forEach((data) => {
        this.cargo.set(data._id, data);
      });

      const guildData = await Guild.find();
      guildData.forEach((data) => {
        this.guild.set(data._id, data);
      });

      const userData = await User.find();
      userData.forEach((data) => {
        this.user.set(data._id, data);
      });

      const warnData = await Warn.find();
      warnData.forEach((data) => {
        this.warn.set(data._id, data);
      });
    } catch (error) {
      console.error(`Erro ao inicializar as coleções do banco de dados: ${error}`);
    }
  }
};
