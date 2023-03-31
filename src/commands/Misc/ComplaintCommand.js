const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class complaint extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'complaint'
    this.aliases = ['complaint', 'report', 'denounce', 'watchdogsreport']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const violator = args[0]
    const reason = args.slice(1).join(' ')
    if (!reason[4]) return message.reply('<:2715shield:832746524416278578> Sua denúncia requer mais provas e um motivo especificado!')

    // gera o ID da denuncia aleatoriamente
    function makeid(length) {
      const result = [];
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
          charactersLength)));
      }
      return result.join('');
    }

    const reportembed = new MessageEmbed()
      .setThumbnail(this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(`To attach proofs of your report please copy your private code sent to your DM and send the attachments to our Trust & Safety team with your code.\n\nWhistleblower: *\`${message.author.tag}\`*\nViolator: *${violator}*\nReason: *${reason}*`, message.author.avatarURL({ dynamic: true, size: 1024 }))
      .addField(`Complaint ID:`, `*${makeid(24)}*`)
      .setColor(colors['mod'])
       
      .setTimestamp(new Date());

    await message.author.send({ embeds: [reportembed] })
    await this.client.channels.cache.get('1001368892200988700')
      .send({ content: `Reported by: ${message.author.tag} (${message.author.id})`, embeds: [reportembed] })
    await message.reply('<:__:1090466363132354670> Thank you for your complaint!')
  }
}