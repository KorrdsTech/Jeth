const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')

module.exports = class Rep extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'rep'
    this.aliases = ['rep']
    this.category = 'Social'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const emptyMessage = new MessageEmbed()
      .setColor(colors.mod)
      .setTitle('<:plus:955577453441597550> **Ban:**', `${message.author.username}`, true)
      .setDescription('Criado para adicionar pontos de reputação a conta de um usuário, se um user recebe bastante pontos de reputação significa que ele ajuda bastante em nosso desenvolvimento do projeto, seja com suporte ou outros.') // inline false
      .addField('*Uso do comando:*', '`rep <@user>`', true)
      .addField('*Exemplo:*', '`rep @Solaris#0006`', true)

    const member = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ''))
    if (!member) return message.reply('eu procurei, procurei, e não achei este usuário')
    if (!args[0]) return message.reply({ embeds: [emptyMessage] })
    // verificação de se o usuário tem o mesmo id do autor da mensagem.
    if (member.id === message.author.id) return message.reply(`Você não pode dar rep para si mesmo.`)
    // ...

    // complementos da variável member.
    const author = await this.client.database.user.getOrCreate(message.author.id)
    const user = await this.client.database.user.getOrCreate(member.id)
    const time = ((parseInt(author.repTime) - Date.now()) > 3600000) ? moment.utc(parseInt(author.repTime - Date.now())).format('hh:mm:ss') : moment.utc(parseInt(author.repTime - Date.now())).format('mm:ss')
    if (parseInt(author.repTime) < Date.now()) {

      user.rep += 1

      if (message.author.id === '753778869013577739') {
        author.repTime = 0 + Date.now()
        author.save()
        user.save()
      } else
        author.repTime = 3600000 + Date.now()
      author.save()
      user.save()

      message.reply(`Você deu um ponto de reputação para o ${member}, agora esse usuario tem ${user.rep} pontos de reputação.`)

    } else {
      message.reply(`Você precisa esperar: ${time} minutos.`)
    }
  }
}