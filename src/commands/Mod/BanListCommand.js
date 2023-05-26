const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class Banlist extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'banlist'
    this.aliases = ['banlist', 'watchdogslist']
    this.category = 'Mod'
  }

  async run(message) {
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id) //Db
    if (guildDocument.wantModSysEnable === true) {
      const embedA = new MessageEmbed()

        .setTimestamp()
        .setColor(colors['mod'])
        .setTitle('**Err:**', true)
        .setDescription('Missing Permissions') // inline false
        .addFields({ name: '*Verifique se você possui o cargo:*', value: `<@&${guildDocument.moderadores}>`, inline: true })
         

      const embedB = new MessageEmbed()

        .setTimestamp()
        .setColor(colors['mod'])
        .setTitle('**Err:**', true)
        .setDescription('Configuração Incompleta')
        .addFields({ name: '*Verifique se você definiu todos os valores necessários corretamente.*', value: '`Cargo de moderador não definido`' })
         

      const role = message.guild.roles.cache.get(guildDocument.moderadores)

      const embedBan = new MessageEmbed()

        .setTimestamp()
        .setColor(colors['mod'])
        .setTitle('**Err:**', true)
        .setDescription('Missing Permissions') // inline false
        .addField('*Verifique se você possui a permissão:*', '`BAN_MEMBERS`', true)
         

      if (!message.guild.members.me.permissions.has('BAN_MEMBERS')) return message.reply({ embeds: [embedBan] })
      if (!guildDocument.moderadores) {
        message.channel.send({ embeds: [embedB] })
        return
      }
      if (!message.member.roles.cache.has(role.id)) {
        message.channel.send({ embeds: [embedA] })
        return
      }

      const bans = await message.guild.bans.fetch(); //Obtém a lista de membros banidos do servidor

      if (!bans.first()) //Se a lista estiver vazia retorna
        return message.reply('❌ Este servidor não tem membros banidos!');

      let msg = '';

      //Mapeia a lista de membros banidos e adiciona a sua tag à variável msg (USER#0001)
      bans.map(user => {
        msg += `\`${user.user.tag}\`, `;
      });

      //Por fim envia a mensagem com todas as tags dos membros banidos, com split no caso de o servidor ter muitos membros banidos e a lista for grande
      message.reply('📑 Lista de membros banidos:\n' + msg, { split: true });
    } else if (guildDocument.wantModSysEnable === false) {
      const embedBan = new MessageEmbed()

        .setTimestamp()
        .setColor(colors['mod'])
        .setTitle('**Err:**', true)
        .setDescription('Missing Permissions') // inline false
        .addField('*Verifique se você possui a permissão:*', '`BAN_MEMBERS`', true)
         

      if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply({ embeds: [embedBan] })
      if (!message.guild.members.me.permissions.has('BAN_MEMBERS')) return message.reply({ embeds: [embedBan] })

      const bans = await message.guild.bans.fetch(); //Obtém a lista de membros banidos do servidor

      if (!bans.first()) //Se a lista estiver vazia retorna
        return message.reply('❌ Este servidor não tem membros banidos!');

      let msg = '';

      //Mapeia a lista de membros banidos e adiciona a sua tag à variável msg (USER#0001)
      bans.map(user => {
        msg += `\`${user.user.tag}\`, `;
      });

      //Por fim envia a mensagem com todas as tags dos membros banidos, com split no caso de o servidor ter muitos membros banidos e a lista for grande
      message.reply('📑 Lista de membros banidos:\n' + msg, { split: true });
    }
  }
}