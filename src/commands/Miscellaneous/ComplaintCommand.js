const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')

module.exports = class complaint extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'complaint'
    this.aliases = ['complaint', 'report', 'denounce', 'watchdogsreport']
    this.category = 'Miscellaneous'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const reason = args.join(' ')
    if (!reason[4]) message.reply('<:2715shield:832746524416278578> Sua denúncia requer mais provas e um motivo especificado!')

        // gera o ID da denuncia aleatoriamente
    function makeid(length) {
      const result           = [];
      const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *
         charactersLength)));
      }
      return result.join('');
    }

    const reportembed = new Discord.MessageEmbed()
      .setThumbnail(this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(`To attach proofs of your report please copy your private code sent to your DM and send the attachments to our Trust & Safety team with your code. \n\nWhistleblower: *${message.author.tag}*\nViolator/Reason: *${reason}*`, message.author.avatarURL({ dynamic: true, size: 1024 }))
      .addField(`Complaint ID:`, `*${makeid(24)}*`)
      .setColor(colors.mod)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp(new Date());

    message.author.send(reportembed)
    await this.client.channels.cache.get('838234183566360636').send(reportembed)
    await this.client.channels.cache.get('838234183566360636').send(`Reported by: ${message.author.tag}`)
    await message.reply('<:a_blurplecertifiedmoderator:856174396225355776> Thank you for your complaint!')

  }
}