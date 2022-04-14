const { Command } = require('../../utils')

module.exports = class cadastrar extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'cadastrar'
    this.aliases = ['cadastrar']
    this.category = 'VIP'
    this.adminOnly = true
  }

  async run(message, args) {
    const membro = message.guild.members.cache.get(args[0]) ? message.guild.members.cache.get(args[0]) : message.mentions.members.first() ? message.mentions.members.first() : message.author
    if (!membro) message.reply('Não encontrei o usuário!')

    const server = await this.client.database.guild.getOrCreate(message.guild.id)
    if (!server.partner) return message.reply(`<a:Jeth_hype:665309103748284426> Este servidor não tem parceria com o bot então,você não pode usar o comando.`)
    const doc = await this.client.database.user.getOrCreate(membro.id)
    if (doc) {
      if (doc.vip) {
        doc.gifban = '',
        doc.vip = false
      } else {
        doc.vip = true
      }

      doc.save().then(() => {
        message.reply(`<a:Jeth_hype:665309103748284426> O **VIP** do membro ${membro} foi ${doc.vip ? 'ativado' : 'desativado'}.`)
      })
    }
  }
}

//const { Command, TranslateFunctions } = require('../../utils')
// const { MessageEmbed } = require('discord.js')

// module.exports = class setcargo extends Command {
//     constructor(name, client) {
//         super(name, client)

//         this.aliases = ['setar-cargo', 'cargoadd']
//         this.category = 'sla'
//     }

//     async run(message, args) {
//         message.delete()
//         let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])
//         let cargo_nome = message.mentions.roles.first() || message.mentions.roles.array([1])
//         const embedA = new MessageEmbed()
//             .setTimestamp()
//             .setColor(colors['mod'])
//             .setTitle('**Err:**', `${usuario}`, true)
//             .setDescription('Missing Permissions') // inline false
//             .addField('*Verifique se você possui a permissão:*', '`MANAGE_ROLES`', true)
//             .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

//         if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply({ embeds: [embedA] })
//         if (!usuario) return message.reply("Você não mencionou o usuário!");
//         if (!cargo_nome) return message.reply("Você não colocou um cargo valido!");
//         if (usuario.id === message.guild.ownerID) {
//             message.reply("Você não tem permissão para setar role neste usuário");
//             return 0;
//         }
//         if (usuario.id === this.client.user.id) {
//             message.reply("Não posso me setar cargo.");
//             return 0;
//         }
//         let executorRole = message.member.roles.highest;
//         let targetRole = usuario.roles.highest;
//         if (executorRole.comparePositionTo(targetRole) <= 0 && message.author.id !== message.guild.ownerID) {
//             message.reply("Você não tem permissão para setar role neste usuário");
//             return 0;
//         }
//         let clientRole = message.guild.me.roles.highest;
//         if (clientRole.comparePositionTo(targetRole) <= 0) {
//             message.reply("Você não tem permissão para setar role neste usuário");
//             return 0;
//         }