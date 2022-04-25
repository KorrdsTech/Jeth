const { Command } = require('../../utils')
const moment = require('moment')
moment.locale('pt-br')

module.exports = class VipRegister extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'VipRegister'
    this.aliases = ['registrarvip', 'registervip', 'vipregistrar', 'vr', 'vipregister']
    this.category = 'VIP'
    this.adminOnly = true // Apenas IDs do .env

  }

  async run(message, args) {

    if (!args[0]) {

      return message.reply(`<:a_lori_moletom:963820678157594703> » Indique um ID de servidor válido.`).then(n => {

        setTimeout(() => n.delete(), 10000)
      })
    }

    const vipDocument = await this.client.database.guild.getOrCreate(args[0])

    if (vipDocument.vipGuild) {
      vipDocument.vipGuild = false
      vipDocument.save().then(async () => {
        const msg = await message.reply(`<:a_lori_moletom:963820678157594703> » Estou tirando o servidor como **vip** no banco de dados.`)

        setTimeout(() => {
          msg.edit({ content: `<:a_lori_moletom:963820678157594703> » O servidor saiu do sistema de vip com sucesso.` })
        }, 5000)
      }); // Se quiser tirar esse troço, pode tirar

    } else {
      vipDocument.vipGuild = true
      vipDocument.save().then(async () => {
        const msg = await message.reply(`<:a_lori_moletom:963820678157594703> » Estou setando o servidor como **vip** no banco de dados.`)

        setTimeout(() => {
          msg.edit({ content: `<:a_lori_moletom:963820678157594703> » O servidor entrou no sistema de vip com sucesso.` })
        }, 5000)
      }); // Se quiser tirar esse troço, pode tirar

    }

        //cria uma embed se quiser aqui, fica bonitin

        // Fim :)
  }
}