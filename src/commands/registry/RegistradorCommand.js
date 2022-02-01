const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')

module.exports = class RegistradorCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'registrador'
    this.aliases = []
    this.category = 'registry'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const guildDocument = await this.client.database.Guilds.findById(message.guild.id)
      .then(guildTable => {
        const obj = {
          m: 0,
          f: 0,
          n: 0,
          memberCount: message.guild.memberCount
        };
        if (guildTable) {
          guildTable.registradores.forEach(registrador => {
            registrador.membrosRegistrados.forEach(membro => {
              if (membro.genero === 'M') ++obj.m;
              if (membro.genero === 'F') ++obj.f;
              if (membro.genero === 'N') ++obj.n;
            });
          });
        } else {
          this.client.database.Guilds({
            _id: message.guild.id
          }).save()
        }
        const { MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed()
          .setTitle('Registros do servidor:')
          .setDescription(
            `Masculino: ${obj.m}\nFeminino: ${obj.f}\nNão binário: ${obj.n}\n\n` +
            `Total de usuários registrados: ${obj.m + obj.f + obj.n}\n` +
            `Total de usuários sem registros: ${obj.memberCount - (obj.m + obj.f + obj.n)}`
          )
          .setColor(colors['default'])
          .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
          .setTimestamp();
        message.channel.send({ embeds: [embed] }).catch(() => { });
      })
      .catch(console.error);
  }
}