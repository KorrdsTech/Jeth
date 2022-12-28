const { Command } = require('../../utils');

module.exports = class about extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'about'
    this.aliases = ['sobremim', 'aboutme']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const about = args.join(' ');
    const doc = await this.client.database.user.getOrCreate({ _id: message.author.id });

    if (!about)
      return message.reply(
        `${message.author}, você não inseriu o que deseja colocar no seu sobre.`
      );
    if (about.length > 300)
      return message.reply(
        `${message.author}, o seu sobre deve ter menos de 300 caracteres.`
      );
    if (doc.about == about)
      return message.reply(
        `${message.author}, o sobre que você inseriu é o mesmo setado atualmente.`
      );

    await this.client.database.user.model.findOneAndUpdate(message.author.id).then(async () => {
      doc.about = about
      doc.save()
      message.reply(
        `${message.author}, seu sobre foi alterado com sucesso.`
      );
    }
    );
  }
};