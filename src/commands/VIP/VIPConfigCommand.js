const { Command } = require('../../utils')
const modelVip = require('../../utils/database/collections/Vip');
const { MessageActionRow, MessageButton, EmbedBuilder } = require('discord.js')

module.exports = class vipconfig extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'vipconfig'
    this.aliases = ['vc', 'vipconfig', 'premiumconfig']
    this.category = 'VIP'
    this.permissions = ['ADMINISTRATOR']

  }

  async run(message, args) {

    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)

    const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('c')
        .setEmoji(`<:newmemberbadge:967660459878666331>`)
        .setLabel('Cadastrar')
        .setStyle('SUCCESS')
        .setDisabled(false),

      new MessageButton()
        .setCustomId('rc')
        .setEmoji(`<:ModMute:980288914914947113>`)
        .setLabel('RewCadastro')
        .setStyle('DANGER')
        .setDisabled(false),

      new MessageButton()
        .setCustomId('mv')
        .setEmoji(`📋`)
        .setLabel('Membros Vips')
        .setStyle('PRIMARY')
        .setDisabled(true)
    );

    const dashboard = new EmbedBuilder()
      .setAuthor({ name: `${message.guild.name} | Dashboard VipConfig`, iconURL: this.client.user.avatarURL({ dynamic: true, size: 1024 }) })
      .setDescription(`<:a_lori_moletom:1003479428350873630> » Sistema para setar usuário como vip no servidor.`)
      .addFields([
        { name: `Comandos do Sistema`, value: `> **Cadastrar** » Cadastra o usuário como vip no servidor.\n> **RewCadastro** » Remove o cadastro vip do usuário.\n> **Membros Vips** » Possibilita ver membros que tem vip no seu servidor. [BETA]` }
      ])
      .setFooter({ text: `${message.author.username}, você possui 1 minuto para interagir.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setThumbnail('https://media.discordapp.net/attachments/957238449558155304/962048623284215828/config.png?width=410&height=410')
      .setColor(guildDocument.color_embed) // TROCO ISSO DPS
      .setTimestamp();

    message.reply({ embeds: [dashboard], components: [row] })

    const collector = message.channel.createMessageComponentCollector({
      componentType: 'BUTTON',
      time: 60000,
    });

    collector.on('collect', i => {

      if (i.user.id != message.author.id)
        return i.reply(`<:a_lori_moletom:1003479428350873630> » ${i.user} você não pode acessar o dashboard, pois não foi você que abriu.`);

      switch (i.customId) {

        case 'c': {

          message.reply(`<:a_lori_moletom:1003479428350873630> » Mencione o usuário que você deseja fazer o cadastro vip.`).then(() => {
            message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 90000, errors: ['time'], max: 1 }).on('collect', async message => {

              const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

              if (!usuario) {
                return message.reply(`<:a_lori_moletom:1003479428350873630> » Mencione um usuário valido.`)
              }
              if (usuario.id === this.client.user.id) {
                return message.reply(`<:a_lori_moletom:1003479428350873630> » Eu não posso ter vip.`)
              }

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
                  const msg = await message.reply(`<:a_lori_moletom:1003479428350873630> » Estou setando o usuário como vip no banco de dados.`)
                  setTimeout(() => {
                    msg.edit({ content: `<:a_lori_moletom:1003479428350873630> » O usuário foi setado como vip com sucesso.` })
                  }, 5000)
                })
              }

              else {

                if (documentVip.vip) {
                  return message.reply(`<:a_lori_moletom:1003479428350873630> » Esse usuário já é vip neste servidor.`)
                }
              }

            })
          })
        }

          break;
        case 'rc': {

          message.reply(`<:a_lori_moletom:1003479428350873630> » Mencione o usuário que você deseja remover o cadastro vip.`).then(() => {
            message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 90000, errors: ['time'], max: 1 }).on('collect', async message => {

              const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

              if (!usuario) {
                return message.reply(`<:a_lori_moletom:1003479428350873630> » Mencione um usuário valido.`)
              }
              if (usuario.id === this.client.user.id) {
                return message.reply(`<:a_lori_moletom:1003479428350873630>} » Eu não possuo vip.`)
              }

              const documentVip = await modelVip.findOne({
                guildID: message.guild.id,
                userID: usuario.id,
              }).catch(err => console.log(err))

              if (documentVip == null) {
                return message.reply(`<:a_lori_moletom:1003479428350873630> » Esse usuário não possui vip neste servidor.`)
              }

              await documentVip.delete().then(async () => {
                const msg = await message.reply(`<:a_lori_moletom:1003479428350873630> » Estou removendo o usuário como vip no banco de dados.`)
                setTimeout(() => {
                  msg.edit({ content: `<:a_lori_moletom:1003479428350873630> » O usuário foi removido como vip do servidor com sucesso.` })
                }, 5000)
              })

            })
          })

        }
          break;

        case 'mv': {

          const documentVip2 = modelVip.findOne({
            guildID: i.guild.id,
          }).catch(err => console.log(err))

          if (documentVip2 == null) {
            return message.reply(`<:a_lori_moletom:1003479428350873630> » Esse servidor não possui nenhum membro vip.`)
          }

          return message.reply(`deu errado neh`)
        }

      }
    }) // End

  }
}
