const { Command } = require('../../utils')

module.exports = class divorce extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'divorce'
    this.aliases = ['divorciar', 'terminar']
    this.category = 'Fun'
  }

  async run(message, args) {
    const doc = await this.client.database.user.getOrCreate({
      _id: message.author.id,
    });
    const doc1 = await this.client.database.user.getOrCreate({
      _id: message.author.id,
    });
    const user =
        this.client.users.cache.get(args[0]) || message.mentions.users.first();

    if (!doc.isMarried)
      return message.reply(`${message.author}, você não está casado.`);

    const filter = (reaction, member) => {
      return (
        member.id === message.author.id &&
            ['✅', '❌'].includes(reaction.emoji.name)
      );
    };
    message
      .reply(
        `${message.author
        }, você deseja se divorciar do(a) **\`${await this.client.users
          .fetch(doc.userMarried)
          .then((x) => x.tag)}\`**?`
      )
      .then(async (msg) => {
        for (const emoji of ['✅', '❌']) await msg.react(emoji);

        msg
          .awaitReactions({ filter: filter, max: 1 })
          .then(async (collected) => {
            if (collected.first().emoji.name === '✅') {
              message.reply(
                `${message.author}, você se divorciou com sucesso.`
              );

              await this.client.database.user.model.findOneAndUpdate(message.author.id
              ).then(async () => {
                doc.userMarried = 'null'
                doc.isMarried = false
                doc.timeMarried = '0'
                await doc.save()
              })
              await this.client.database.user.model.findOneAndUpdate(user.id
              ).then(async () => {
                doc1.userMarried = 'null'
                doc1.isMarried = true
                doc1.timeMarried = '0'
                await doc1.save()
              })

              return msg.delete();
            }

            if (collected.first().emoji.name === '❌') {
              msg.delete();

              return message.reply(`${message.author}, divorcio cancelado.`);
            }
          });
      });
  }
};