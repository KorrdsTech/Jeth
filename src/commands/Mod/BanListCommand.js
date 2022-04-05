const { Command } = require('../../utils')

module.exports = class Banlist extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'banlist'
    this.aliases = ['banlist', 'watchdogslist']
    this.category = 'Mod'
  }

  async run(message) {

    if (!message.member.permissions.cache.has('BAN_MEMBERS')) return message.reply('❌ Não tens permissão para ver a lista de membros banidos!'); //Verifica se quem enviou o comando tem permissão para ver os membros banidos
    if (!message.guild.me.permissions.cache.has('BAN_MEMBERS')) return message.reply('❌ Não tenho permissão para ver a lista de membros banidos!'); //Verifica se o bot tem permissão para ver os membros banidos

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