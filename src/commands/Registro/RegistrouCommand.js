const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')

module.exports = class Registrou extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'registrou'
    this.aliases = ['registrou']
    this.category = 'Registro'
    this.subcommandsOnly = false
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    const usuario = message.mentions.users.first() || message.author;
    const guildTable = await this.client.database.guild.getOrCreate(message.guild.id)
    if (guildTable.registradores.length > 0) {
      let registradorID = '';
      let timestamp = 0;
      const registradores = guildTable.registradores;
      for (let u = 0; u < registradores.length; ++u) {
        const memberArr = registradores[u].membrosRegistrados;
        for (let i = 0; i < memberArr.length; ++i) {
          if (memberArr[i]._id === usuario.id) {
            registradorID = registradores[u]._id;
            timestamp = memberArr[i].timestamp;
            u = registradores.length;
            break;
          }
        }
      }
      if (registradorID.length) {
        const moment = require('moment');
        moment.locale('pt-BR');
        const embed = new MessageEmbed()
          .setAuthor(usuario.username, usuario.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setTitle('**Informações:**')
          .addField('**Usuário:**', `${usuario}`, true)
          .addField('**Registrado por:**', `<@${registradorID}>`, true)
          .addField('Data do registro:', `\`\`\`\n${moment(timestamp).format('LL')}\`\`\``, false)
          .addField('**__Conta criada:__**', moment(usuario.createdTimestamp).format('LL'), true)
          .addField('Dias no Discord:', `${moment().diff(usuario.createdTimestamp, 'days')} dias`, true)
          .addField('Entrou no Server:', moment(message.guild.member(usuario).joinedTimestamp).format('LL'), true)
          .addField('Dias no Servidor:', `${moment().diff(message.guild.member(usuario).joinedTimestamp, 'days')} dias`, true)
          .setColor(colors.default)
          .setThumbnail('https://cdn.discordapp.com/emojis/722682133432500251.png?v=1')
          .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
          .setTimestamp();
        return message.channel.send(embed).catch(() => { });
      }
    }
    message.reply('Usuário não registrado, fale com um registrador.').catch(() => { });
  }
}