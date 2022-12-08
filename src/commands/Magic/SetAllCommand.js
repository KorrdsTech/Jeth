const { Command } = require('../../utils')

module.exports = class setall extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'setall'
    this.aliases = ['setall', 'setcargoall', 'cargoall']
    this.category = 'Magic'
  }

  async run(message) {

    if (!message.member.permissions.has('MANAGE_GUILD', false, true, true)) {
      return message.reply('Voce nao tem permissao para isso <:noswift:529635602292015134>').catch(() => { });
    }
    if (!message.guild.me.permissions.has('MANAGE_GUILD', false, true)) {
      return message.reply('nao tenho permissao para isso <:noswift:529635602292015134>').catch(() => { });
    }
    if (message.mentions.roles.size < 1) return message.reply('Marque um cargo').catch(() => { });

    const role = message.mentions.roles.first();

    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return message.reply('Eu preciso estar acima do cargo mencionado <:noswift:529635602292015134>').catch(() => { });
    }

    await message.reply(`Começando | 0/${message.guild.memberCount}`)
      .then(m => {
        message.guild.members.cache.fetch()
          .then(async guilda => {
            const membros = guilda.members.array();
            await f(membros, 0, role, m);
          })
          .catch(() => { });
      })
      .catch(() => { });
  }
}

const f = async (membros, i = 0, role, message) => {
  if (i % 20 === 0) {
    await message.edit(`${i}/${message.guild.memberCount} **Adicionando o cargo ${role} para todos os usuários do servidor**`).catch(() => { });
  }
  if (membros[i]) {
    await membros[i].roles.add(role, 'AutoRole').catch(() => { });
  }
  ++i;
  if (i < message.guild.memberCount) {
    setTimeout(() => f(membros, i, role, message), 500);
  } else {
    await message.edit('Feito').catch(() => { });
  }
};