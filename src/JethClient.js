const { Client, Collection, MessageEmbed } = require('discord.js');
const { colors } = require('./utils');
const fs = require('node:fs')
const path = require('path');
const Database = require('./utils/database/Database');

module.exports = class JethClient extends Client {
  constructor(options) {
    super(options);

    this.commands = new Collection();
    this.database = new Database();
    
    this.initCommands('./src/commands');
    this.initListeners('./src/listeners');

    // Manipulador de erro para o evento 'shardError'
    this.on('shardError', (error, shardID) => {
      console.error(`Erro na shard ${shardID}:`, error);
    });

    // Manipulador de erro para o evento 'shardDisconnect'
    this.on('shardDisconnect', (closeEvent, shardID) => {
      console.error(`Shard ${shardID} desconectada. Código do fechamento: ${closeEvent.code}`);
    });

    // Manipulador de erro para o evento 'shardReconnecting'
    this.on('shardReconnecting', (shardID) => {
      console.log(`Reconectando a shard ${shardID}...`);
    });

    // Manipulador de erro para o evento 'shardResume'
    this.on('shardResume', (replayedEvents, shardID) => {
      console.log(`Shard ${shardID} reconectada. Eventos retransmitidos: ${replayedEvents}`);
    });
  }

  async initCommands(path) {
    fs.readdirSync(path)
      .forEach(file => {
        try {
          const filePath = `${path}/${file}`;
          if (file.endsWith('.js')) {
            const Command = require(filePath.replace('/src',''));
            const command = new Command(this);
            const commandName = (command.name !== undefined) ? command.name : file.replace(/.js/g, '').toLowerCase();
            this.commands.set(commandName, command);
          } else if (fs.lstatSync(filePath).isDirectory()) {
            this.initCommands(filePath);
          }
        } catch (error) {
          console.error(error);
        }
      });
  }

  async initListeners(path) {
    fs.readdirSync(path)
      .forEach(file => {
        try {
          const filePath = path + '/' + file
          if (file.endsWith('.js')) {
            const Listener = require(`.${filePath}`)
            this.on(file.replace(/.js/g, ''), Listener)
          }

          const stats = fs.lstatSync(filePath)
          if (stats.isDirectory()) {
            this.initListeners(filePath)
          }
        } catch (error) {
          console.error(error)
        }
      })
  }// execite

  async sendLoggerError(error) {
    console.log(error);
    const embed = new MessageEmbed()
      .setColor(colors.default)
      .setTitle(error.name)
      .setAuthor(this.user.username, this.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(error.message)
      .addField('Arquivo', `${error.fileName} ${error.lineNumber}`);
    const channel = await this.channels.fetch('1001368892385533953');
    return channel.send({ embeds: [embed] });
  }
};
