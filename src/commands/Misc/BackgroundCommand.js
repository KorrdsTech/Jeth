const { Command, colors } = require('../../utils');
const { MessageEmbed } = require('discord.js');

module.exports = class background extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'background'
    this.aliases = ['backgrounds', 'background', 'fundos']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run( message, args) {
    const doc = await this.client.database.user.getOrCreate(message.author.id)

    if (!args[0])
      return message.reply(
        `${message.author}, sub-comandos do comando de background: **set, buy, list**.`
      );

    const backgrounds = {
      zero: {
        id: 0,
        img: 'https://i.imgur.com/op0HuKE.png',
      },
      one: {
        id: 1,
        price: 2000,
        img: 'https://i.imgur.com/U1BNkHJ.png',
      },
      two: {
        id: 2,
        price: 2000,
        img: 'https://i.imgur.com/YpU0h3A.png',
      },
      three: {
        id: 3,
        price: 20000,
        img: 'https://i.imgur.com/Lh3ZqP6.png',
      },
    };

    if (args[0] === 'set') {
      if (!args[1])
        return message.reply(
          `${message.author}, você não inseriu o ID do background.`
        );

      const id = parseInt(args[1]);
      const list = doc.backgroundsHas;

      if (id === 0) {
        message.reply(`${message.author}, background padrão ativado.`);

        await this.client.database.users.findOneAndUpdate(
          { idU: message.author.id },
          { $set: { 'backgroundsActive': id } }
        );
      } else {
        if (!list.find((x) => x === id))
          return message.reply(
            `${message.author}, você não tem este background.`
          );

        await this.client.database.users.findOneAndUpdate(
          { idU: message.author.id },
          { $set: { 'backgroundsActive': id } }
        );

        message.reply(
          `${message.author}, background alterado com sucesso.`
        );
      }
      return;
    }

    if (args[0] === 'buy') {
      if (!args[1])
        return message.reply(
          `${message.author}, você não inseriu o ID do background.`
        );
      const id = parseInt(args[1]);
      const list = doc.backgroundsHas;

      if (list.find((x) => x === id))
        return message.reply(
          `${message.author}, você já tem este background.`
        );

      let find = Object.entries(backgrounds).filter(([, x]) => x.id === id)[0];

      if (!find.length || id === 0)
        return message.reply(
          `${message.author}, não temos background com este ID.`
        );

      find = find[1];

      if (find.price > doc.bank)
        return message.reply(
          `${message.author}, você não tem dinheiro o suficiente para comprar este background. Preço: **${find.price}**.`
        );

      message.reply(
        `${message.author}, background comprado e ativado com sucesso. Preço que você pagou: **${find.price}**.`
      );

      await this.client.database.users.findOneAndUpdate(
        { idU: message.author.id },
        { $push: { 'backgroundsHas': id } }
      );
      await this.client.database.users.findOneAndUpdate(
        { idU: message.author.id },
        { $set: { 'backgroundsActive': id, bank: doc.bank - find.price } }
      );

      return;
    }

    if (args[0] == 'list') {
      const list = doc.backgroundsHas;

      const EMBED = new MessageEmbed()
        .setColor(colors['lightblue'])
        .setTitle(`Backgrounds`)
        .setDescription(
          `Background Ativo no Momento: **ID ${doc.backgroundsActive}**` +
                    '\n\n' +
                    Object.entries(backgrounds)
                      .filter(([, x]) => x.id != 0)
                      .map(
                        ([, x]) =>
                          `> **[ID ${x.id}](${x.img
                          })**\n> Preço: **R$${x.price.toLocaleString()}**\n> Status: **${list.find((f) => f === x.id)
                            ? 'Já tem este Background'
                            : 'Não Tem'
                          }**`
                      )
                      .join('\n\n')
        )
      message.reply({ embeds: [EMBED] })
      return;
    }
  }
};