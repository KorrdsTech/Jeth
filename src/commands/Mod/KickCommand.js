const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class kick extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'kick'
    this.aliases = ['kick', 'kickar', 'expulsar']
    this.category = 'Mod'
  }

  async run(message, args) {

    const usuario = message.author;
      // code erro de perm
    const embedA = new MessageEmbed()

      .setTimestamp()
      .setColor(colors.mod)
      .setTitle('**Err:**', `${usuario}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`KICK_MEMBERS`', true)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      // code dm do kickado
    const razao13 = args.slice(1).join(' ');
    const warnembed18 = new MessageEmbed()

      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle(`${message.author}`)
      .setDescription(`🚫 Você foi expulso do servidor ${message.guild.name}`)
      .setColor('#ff0000')
      .addField('👮 **Staffer:**', `${message.author}`)
      .addField('✏️ Motivo:', `${razao13}`)
      .setFooter('Se você acha que a punição foi aplicada incorretamente, recorra ao staffer! 🥶')
      .setImage('https://media1.tenor.com/images/4c906e41166d0d154317eda78cae957a/tenor.gif?itemid=12646581')
      .setTimestamp(new Date());

    if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send({ embeds: [embedA] })
    const membro18 = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ''))
    if (!membro18) return message.reply('eu procurei, procurei, e não achei este usuário')
    if (razao13.length < 1) return message.reply('`Adicione um motivo válido!`')

      // const embedC = new MessageEmbed()
      // .setTimestamp()
      // .setColor(colors.mod)
      // .setTitle('**Err:**', true)
      // .setDescription('Missing Permissions') // inline false
      // .addField('*Verifique se meus cargos estão acima do usuário:*', '`ROLES_COMPARSION`', true)
      // .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))

      // let target18 = membro18.roles.highest;
      // let clientRole = message.guild.me.roles.highest;
      // if (clientRole.comparePositionTo(target18) <= 0) {
      //     message.reply({ embeds: [embedA] });
      //     return 0;
      // }

    const warnembed13 = new MessageEmbed()

      .setThumbnail(usuario.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTitle('Ação | Kick')
      .setColor('#ff112b')
      .setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Kickado:** ${membro18.username} \n**ID:** ${membro18.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${razao13}`)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp(new Date());

    message.channel.send(warnembed13);
    membro18.send(warnembed18);
    await message.guild.member(membro18).kick(razao13)
  }
};