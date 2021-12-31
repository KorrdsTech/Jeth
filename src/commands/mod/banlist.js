const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class Ban extends Command {
  constructor(client) {
    super(client)

    this.aliases = ['watchdogslist']
    this.category = 'mod'
  }

  async run(message, args) {

    if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply('❌ Não tens permissão para ver a lista de membros banidos!'); //Verifica se quem enviou o comando tem permissão para ver os membros banidos
    if (!message.guild.me.permissions.has('BAN_MEMBERS')) return message.channel.send('❌ Não tenho permissão para ver a lista de membros banidos!'); //Verifica se o bot tem permissão para ver os membros banidos

    const bans = await message.guild.fetchBans(); //Obtém a lista de membros banidos do servidor

    if (!bans.first()) //Se a lista estiver vazia retorna
      return message.channel.send('❌ Este servidor não tem membros banidos!');

    let msg = '';

    //Mapeia a lista de membros banidos e adiciona a sua tag à variável msg (USER#0001)
    bans.map(user => {
      msg += `\`${user.user.tag}\`, `;
    });

    //Por fim envia a mensagem com todas as tags dos membros banidos, com split no caso de o servidor ter muitos membros banidos e a lista for grande
    message.channel.send('📑 Lista de membros banidos:\n' + msg, { split: true });
  }
}