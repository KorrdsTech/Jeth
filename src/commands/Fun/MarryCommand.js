const { Command  } = require('../../utils')

module.exports = class Marry extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'marry'
    this.aliases = ['Marry', 'casar']
    this.category = 'Fun'
  }

  async run(message, args) {
    if (!args[0]) return message.reply('Mencione algum usuario')
    const user =
    this.client.users.cache.get(args[0]) || message.mentions.users.first();

    const doc = await this.client.database.user.getOrCreate({
      _id: message.author.id,
    });
    const doc1 = await this.client.database.user.getOrCreate({
      _id: user.id,
    });

    if (user.id === message.author.id)
      return message.reply(
        `${message.author}, você não pode casar com si mesmo.`
      );

    if (doc.isMarried)
      return message.reply(`${message.author}, você já está casado.`);

    if (!user)
      return message.reply(
        `${message.author}, você deve mencionar com quem deseja casar.`
      );

    const target = await this.client.database.user.getOrCreate({ _id: user.id });

    if (target.isMarried)
      return message.reply(
        `${message.author
        }, o(a) membro(a) já está casado com o(a) **\`${await this.client.users
          .fetch(target.marry.user)
          .then((x) => x.tag)}\`**.`
      );

    const filter = (reaction, member) => {
      return (
        member.id === user.id &&
        ['✅', '❌'].includes(reaction.emoji.name)
      );
    };
    message.reply(`${user}, você deseja se casar com o(a) ${message.author}?`)
      .then(async (msg) => {
        for (const emoji of ['✅', '❌']) await msg.react(emoji);

        msg.awaitReactions({ filter: filter, max: 1 }).then(async (collected) => {
          if (collected.first().emoji.name === '✅') {
            if (doc.isMarried)
              return message.reply(`😣 ${message.author} se casou com outra pessoa nesse meio tempo, climãaaao ...}.`);
            else
              message.reply(
                `${message.author}, o(a) ${user} aceitou seu pedido de casamento, parabéns.`
              );

            await this.client.database.user.model.findOneAndUpdate(message.author.id
            ).then(async () => {
              doc.userMarried = user.id
              doc.isMarried = true
              doc.timeMarried = Date.now()
              await doc.save()
            })
            await this.client.database.user.model.findOneAndUpdate(user.id
            ).then(async () => {
              doc1.userMarried = message.author.id
              doc1.isMarried = true
              doc1.timeMarried = Date.now()
              await doc1.save()
            })

            return msg.delete();
          }

          if (collected.first().emoji.name === '❌') {
            msg.delete();

            return message.reply(
              `${message.author}, o(a) ${user} recusou seu pedido de casamento.`
            );
          }
        });
      });
  }
};