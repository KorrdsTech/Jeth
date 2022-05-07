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
    const errorReason = new MessageEmbed()
      .setColor(colors['mod'])
      .setDescription(`Você precisa inserir um motivo para estar dando um ponto de reputação para este usuário!`)
    const errorSmall = new MessageEmbed()
      .setColor(colors['mod'])
      .setDescription(`Motivo de reputação muito curto!`)
    const emptyMessage = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Rep:**', `${message.author.username}`, true)
      .setDescription('Criado para adicionar pontos de reputação a conta de um usuário, se um user recebe bastante pontos de reputação significa que ele ajuda bastante em nosso desenvolvimento do projeto, seja com suporte ou outros.') // inline false
      .addField('*Uso do comando:*', '`rep <@user> <motivo>`', true)
      .addField('*Exemplo:*', '`rep @Solaris#0006`', true)
    const reason = args.slice(1).join(' ')
    if (!args[0]) return message.reply({ embeds: [emptyMessage] })
    if (!reason) return message.reply({ embeds: [errorReason] })
    if (!reason[3]) return message.reply({ embeds: [errorSmall] })
    const member = await this.client.users.fetch(args[0]?.replace(/[<@!>]/g, ''))
    if (!member) return message.reply('eu procurei, procurei, e não achei este usuário')
    // verificação de se o usuário tem o mesmo id do autor da mensagem.
    if (member.id === message.author.id) return message.reply(`Você não pode dar rep para si mesmo.`)
    // ...

    // complementos da variável member.
    const author = await this.client.database.user.getOrCreate(message.author.id)
    const user = await this.client.database.user.getOrCreate(member.id)
    const time = ((parseInt(author.repTime) - Date.now()) > 3600000) ? moment.utc(parseInt(author.repTime - Date.now())).format('hh:mm:ss') : moment.utc(parseInt(author.repTime - Date.now())).format('mm:ss')
    const confirmação = new MessageEmbed()
      .setColor(colors['default'])
      .setDescription(`<a:a_dancin:934175860930527313> Você deu um ponto de reputação para o ${member}\nAgora esse usuario tem ${user.rep} pontos de reputação\n**Motivo:** ${reason}`)
    const error = new MessageEmbed()
      .setColor(colors['mod'])
      .setDescription(`Você precisa esperar: ${time}`)
    if (parseInt(author.repTime) < Date.now()) {
      if (process.env.OWNERS?.includes(message.author.id)) {
        author.repTime = 0 + Date.now()
        author.save()
        user.rep += 1
        user.save()
        message.reply({ embeds: [confirmação] })
      } else {
        author.repTime = 3600000 + Date.now()
        author.save()
        user.rep += 1
        user.save()
        message.reply({ embeds: [confirmação] })
      }
    } else {
      message.reply({ embeds: [error] })
    }
  }
}