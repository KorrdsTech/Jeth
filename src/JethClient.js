const { Client, Collection, MessageEmbed } = require('discord.js');
const { colors } = require('./utils');
const fs = require('fs').promises;
const path = require('path');
const Database = require('./utils/database/Database');

module.exports = class JethClient extends Client {
  constructor(options) {
    super(options);

    this.commands = new Collection();
    this.initCommands('./src/commands');
    this.database = new Database();
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

  async initCommands(dir) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = await fs.lstat(filePath);
      if (stats.isDirectory()) {
        await this.initCommands(filePath);
      } else if (stats.isFile() && file.endsWith('.js')) {
        try {
          const Command = require(filePath);
          const command = new Command(this);
          const commandName = command.name || file.replace(/\.js/g, '').toLowerCase();
          this.commands.set(commandName, command);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  async initListeners(dir) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = await fs.lstat(filePath);
      if (stats.isDirectory()) {
        await this.initListeners(filePath);
      } else if (stats.isFile() && file.endsWith('.js')) {
        try {
          const Listener = require(filePath);
          this.on(file.replace(/\.js/g, ''), Listener);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

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
