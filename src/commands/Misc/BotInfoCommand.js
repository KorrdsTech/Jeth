const { Command, colors } = require('../../utils');
const { MessageEmbed } = require('discord.js');
const moment = require('moment')
require('moment-duration-format')

module.exports = class info extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'botinfo'
    this.aliases = ['info', 'informação', 'botinfo', 'informações']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {

    const users = this.client.users.cache.size;
    const servers = this.client.guilds.cache.size;
    const commands = this.client.commands.size;
    const uptime = moment
      .duration(process.uptime() * 1000)
      .format('d[d] h[h] m[m] e s[s]');
    const memory =
      (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB';
    const ping = Math.ceil(this.client.ws.ping) + 'ms';
    const version = process.version;

    //===============> Start Request DB <===============//

    const startDB = process.hrtime();

    //===============> Finish Request DB <===============//

    const stopDB = process.hrtime(startDB);
    const pingDB = Math.round((stopDB[0] * 1e9 + stopDB[1]) / 1e6) + 'ms';

    moment.locale('pt-br')
    const embed = new MessageEmbed()
      .setDescription('<:info:695503582342152273> **Informações:**')
      .setThumbnail(this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTimestamp()
      .setColor(colors['default'])
      .setImage('https://media.giphy.com/media/3NnnS6Q8hVPZC/giphy.gif')
      .setDescription('**💖 Uma pequena bot multi propósito sendo desenvolvida dentro deste vasto mundo conhecido como Discord 👧**')
      .addFields([
        {
          name: 'Meus Programadores',
          value: `<@442774319819522059>\n<@395788326835322882>`,
        },
        {
          name: `Informações Principais`,
          value: `Usuários do Bot: **${users.toLocaleString()}**\nServidores do Bot: **${servers.toLocaleString()}**\nTotal de Comandos: **${commands}**\nTempo Online: **\`${uptime}\`**`,
        },
        {
          name: `Mais Informações`,
          value: `Ping do Bot: **${ping}**\n<:database:924790397039939605>Ping da DataBase: **${pingDB}**\n<:memoryram:924781008245641246>Total de Memória sendo Usado: **${memory}**\nVersão do Node: **${version}**\nShard ID: ${this.client.shard.ids}`,
        },
        {
          name: `Meus Links`,
          value: `[Meu Convite](https://discord.com/oauth2/authorize?client_id=718210363014905866&scope=bot+identify+guilds+email+applications.commands&permissions=8)\n[Servidor de Suporte](https://discord.gg/WPUYahyPzx)`,
        }
      ])
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) });
    message.reply({ embeds: [embed] })
  }
};