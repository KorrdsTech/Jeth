const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class kick extends Command {
   constructor(name, client) {
      super(name, client)

      this.aliases = ['kickar', 'expulsar']
      this.category = 'Moderation'
   }

   async run(message, args) {

      let usuario = message.author;
      // code erro de perm
      const embedA = new Discord.MessageEmbed()

         .setTimestamp()
         .setColor(colors.mod)
         .setTitle('**Err:**', `${usuario}`, true)
         .setDescription('Missing Permissions') // inline false
         .addField('*Verifique se você possui a permissão:*', '`KICK_MEMBERS`', true)
         .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
      // code dm do kickado
      var razao13 = args.slice(1).join(" ");
      const warnembed18 = new Discord.MessageEmbed()

         .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
         .setTitle(`${message.author}`)
         .setDescription(`🚫 Você foi expulso do servidor ${message.guild.name}`)
         .setColor("#ff0000")
         .addField('👮 **Staffer:**', `${message.author}`)
         .addField('✏️ Motivo:', `${razao13}`)
         .setFooter('Se você acha que a punição foi aplicada incorretamente, recorra ao staffer! 🥶')
         .setImage('https://media1.tenor.com/images/4c906e41166d0d154317eda78cae957a/tenor.gif?itemid=12646581')
         .setTimestamp(new Date());

      if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(embedA)
      let membro18 = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ""))
      if (!membro18) return message.reply("eu procurei, procurei, e não achei este usuário")
      if (!message.member.hasPermission("KICK_MEMBERS")) {
         return message.reply(embedA)
      }
      if (razao13.length < 1) return message.reply("`Adicione um motivo válido!`")

      // const embedC = new Discord.MessageEmbed()
      // .setTimestamp()
      // .setColor(colors.mod)
      // .setTitle('**Err:**', true)
      // .setDescription('Missing Permissions') // inline false
      // .addField('*Verifique se meus cargos estão acima do usuário:*', '`ROLES_COMPARSION`', true)
      // .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
  
      // let target18 = membro18.roles.highest;
      // let clientRole = message.guild.me.roles.highest;
      // if (clientRole.comparePositionTo(target18) <= 0) {
      //     message.reply(embedC);
      //     return 0;
      // }

      const warnembed13 = new Discord.MessageEmbed()

         .setThumbnail(usuario.displayAvatarURL({ dynamic: true, size: 1024 }))
         .setTitle('Ação | Kick')
         .setColor("#ff112b")
         .setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Kickado:** ${membro18.username} \n**ID:** ${membro18.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${razao13}`)
         .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
         .setTimestamp(new Date());

      message.channel.send(warnembed13);
      membro18.send(warnembed18);
      await message.guild.member(membro18).kick(razao13)
   }
};