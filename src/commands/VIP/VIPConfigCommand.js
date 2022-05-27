const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const modelVip = require('../../utils/database/collections/Vip');

module.exports = class VipConfig extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'VipConfig'
    this.aliases = ['vc', 'vipconfig', 'premiumconfig']
    this.category = 'VIP'
    this.permissions = ['ADMINISTRATOR']

  }

  async run(message, args) {

    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)

    const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

    if (!guildDocument.vipGuild) {

      return message.reply(`<:a_lori_moletom:963820678157594703> » Seu servidor não está setado como vip para usufruir das opções.`)

    } else { if (args[0] === 'cadastrar') {

      if (!usuario) return message.reply(`<:a_lori_moletom:963820678157594703> » Mencione um usuário valido.`)

      let documentVip = await modelVip.findOne({
        guildID: message.guild.id,
        userID: usuario.id,
      }).catch(err => console.log(err))

      if (!documentVip) {
        documentVip = new modelVip({
          guildID: message.guild.id,
          userID: usuario.id,
          vip: true,
        })

        await documentVip.save().then(async () => {
          const msg = await message.reply(`<:a_lori_moletom:963820678157594703> » Estou setando o usuário como vip no banco de dados.`)
          setTimeout(() => {
            msg.edit({ content: `<:a_lori_moletom:963820678157594703> » O usuário foi setado como vip com sucesso.` })
          }, 5000)})     }

      else {

        if (documentVip.vip) {
          return message.reply(`<:a_lori_moletom:963820678157594703> » Esse usuário já é vip neste servidor.`)
        }
      }
    }

    else {

      if (args[0] === 'rewcadastro') {

        if (!usuario) return message.reply(`<:a_lori_moletom:963820678157594703> » Mencione um usuário valido.`)

        const documentVip = await modelVip.findOne({
          guildID: message.guild.id,
          userID: usuario.id,
        }).catch(err => console.log(err))

        if (documentVip == null) {
          return message.reply(`<:a_lori_moletom:963820678157594703> » Esse usuário não possui vip neste servidor.`)
        }

        await documentVip.delete().then(async () => {
          const msg = await message.reply(`<:a_lori_moletom:963820678157594703> » Estou removendo o usuário como vip no banco de dados.`)
          setTimeout(() => {
            msg.edit({ content: `<:a_lori_moletom:963820678157594703> » O usuário foi removido como vip do servidor com sucesso.` })
          }, 5000)})     }

      else {

        const dashboard = new MessageEmbed()
          .setAuthor({ name: `${message.guild.name} | Dashboard VipConfig`, iconURL: this.client.user.avatarURL({ dynamic: true, size: 1024 }) })
          .setDescription(`<:a_lori_moletom:963820678157594703> » Sistema para setar usuário como vip no servidor.`)
          .addFields([
            { name: `Comandos do Sistema`, value: `> **${guildDocument.prefix}vipconfig cadastrar <@user>** - Cadastra o usuário como vip no servidor.\n> **${guildDocument.prefix}vipconfig rewcadastro <@user>** - Remove o cadastro vip do usuário.` }
          ])
          .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
          .setThumbnail('https://media.discordapp.net/attachments/957238449558155304/962048623284215828/config.png?width=410&height=410')
          .setColor(colors['default'])
          .setTimestamp();

        message.reply({ embeds: [dashboard] })

      }

    }
    }
  }
}