const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class Warn extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = ['aviso', 'advertencia', 'punir']
    this.category = 'Moderation'
    this.subcommandsOnly = false
  }

  async run(message, args, client) {

    var razao = args.slice(1).join(" ")
    let razao1 = "Possuir muitos avisos dentro de um servidor"
    let member = message.mentions.users.first()

    const embedA = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor(colors.mod)
      .setTitle('**Err:**', `${member}`, true)
      .setDescription('Missing Permissions')
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_ROLES`', true)
      .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send({ embeds: [embedA] })
    if (!member) return message.reply("Mencione o member que deseja dar warn!")
    if (!razao.length) {
      razao = "Sem motivos."
    }
    // const embedC = new Discord.MessageEmbed()
    // .setTimestamp()
    // .setColor(colors.mod)
    // .setTitle('**Err:**', true)
    // .setDescription('Missing Permissions') // inline false
    // .addField('*Verifique se meus cargos estão acima do usuário:*', '`ROLES_COMPARSION`', true)
    // .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))

    // let targetMember = member.roles.highest;
    // let clientRole = message.guild.me.roles.highest;
    // if (clientRole.comparePositionTo(targetMember) <= 0) {
    //     message.reply(embedC);
    //     return 0;
    // }

    const warnembed = new Discord.MessageEmbed()

      .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
      .setTitle('Ação | Aviso')
      .setColor("#ff004c")
      .setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Advertido:** ${member.username} \n**ID:** ${member.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${razao}`)
      .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp();

    let adv1 = message.guild.roles.cache.find(role => role.name === 'Advertência 1');
    if (!adv1) {
      try {
        adv1 = await message.guild.roles.create({
          data: {
            name: "Advertência 1",
            color: "#ff8355",
            permissions: []
          }
        })
      } catch (e) {
        console.log(e.stack);
      }
    }

    //end of create role 1

    let adv2 = message.guild.roles.cache.find(role => role.name === 'Advertência 2');
    if (!adv2) {
      try {
        adv2 = await message.guild.roles.create({
          data: {
            name: "Advertência 2",
            color: "#ff3100",
            permissions: []
          }
        })
      } catch (e) {
        console.log(e.stack);
      }
    }

    //end of create role 2

    let adv3 = message.guild.roles.cache.find(role => role.name === 'Advertência 3');
    if (!adv3) {
      try {
        adv3 = await message.guild.roles.create({
          data: {
            name: "Advertência 3",
            color: "#ff0003",
            permissions: []
          }
        })
      } catch (e) {
        console.log(e.stack);
      }
    }

    const embed1 = new Discord.MessageEmbed()
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle(`${message.author}`)
      .setDescription(`:do_not_litter: **Você foi removido do servidor ${message.guild.name} <:pepoEZ:651528973729398882>**`)
      .setColor("#ff0000")
      .addField('<:FeelsCoffeeMan:651528973385465867> Motivo:', `${razao1}`)
      .setFooter('Auto Moderação - :police_officer:')
      .setTimestamp(new Date());


    const warnembed18 = new Discord.MessageEmbed()
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle(`${message.author}`)
      .setDescription(`:do_not_litter: **Você recebeu uma advertência no servidor ${message.guild.name} :no_entry_sign:**`)
      .setColor("#ff0000")
      .addField('<:pepe:651487933148299291> Advertência dada por:', `${message.author}`)
      .addField('📝 Motivo:', `${razao}`)
      .setFooter('Se você acha que a punição foi aplicada incorretamente, recorra ao staffer! 🥶')
      .setTimestamp(new Date());

    message.channel.send(warnembed)
    member.send(warnembed18)
    message.guild.member(member).roles.add(adv1)

    if (member.roles.has(adv1.id)) {
      member.roles.add(adv2)
    } else
      if (member.roles.has(adv2.id)) {
        member.roles.add(adv3)
      } else
        if (member.roles.has(adv3.id)) {
          member.kick(razao1)
          member.send(embed1)
        }
  }
}