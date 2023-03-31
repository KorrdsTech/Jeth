const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class bug extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'bug'
    this.aliases = ['bug', 'reportar', 'bugreport', 'report', 'reportbug']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const author = await this.client.database.user.getOrCreate(message.author.id)
    const report = args.join(' ');
    const logs = this.client.channels.cache.get('1001368891827683391')
    if (!args[3]) return message.reply('<a:astaff:671435205302681603> `Err! Explique aqui detalhadamente o bug encontrado, ele será reportado diretamente para o coder do bot.`')

    const embed = new MessageEmbed()
      .setColor(colors['mod'])
      .setDescription('**BUG-REPORT**')
      .addFields({ name: 'Ticket criado por:', value: `${message.author.tag}`, inline: true })
      .addFields({ name: '**ID:**', value: `${message.author.id}`, inline: true })
      .addFields({ name: '**Descrição:**', value: `${report}`, inline: true })
       
      .setTimestamp(new Date())

    const sucesso = new MessageEmbed()
      .setColor(colors['lightgreen'])
      .setThumbnail(`https://cdn.discordapp.com/emojis/795355653522325534.webp?size=96&quality=lossless`)
      .setDescription('**SUCESSO**\n✅ Você reportou um novo bug com sucesso!')
      .setFooter({ text: 'Lembre-se abusar dos benefícios dete sistema será considerado abuso de API.', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date())

    const sucessoParcial = new MessageEmbed()
      .setColor(colors['lightblue'])
      .setThumbnail(`https://cdn.discordapp.com/emojis/938280523426578534.webp?size=96&quality=lossless`)
      .setDescription('**SUCESSO**\n✅ Você reportou um novo bug com sucesso!\n💁 **Você não se encontra dentro do servidor oficial para receber benefícios extras!**')
      .setFooter({ text: 'Lembre-se abusar dos benefícios dete sistema será considerado abuso de API.', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date())

    const cargoEmbed = new MessageEmbed()
      .setColor(colors['vip'])
      .setThumbnail(`${message.author.displayAvatarURL()}`)
      .setDescription('**PREMIAÇÃO RECEBIDA**\n🌟 Parabéns! Você acaba de reportar um total de **10 bugs**\n😽 Estamos te dando este mimo como agradecimento por ajudar nosso desenvolvimento')
      .setFooter({ text: 'Aproveite! Muito Obrigado -Equipe Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date())

    const guild = this.client.guilds.cache.get('1001368891160805506')
    const cargozinho = guild.roles.cache.get('1001368891227914268')

    if (author.bugsReported !== 10) {
      if (guild.members.cache.get(message.author.id)) {
        author.bugsReported += 1
        author.save().then(() => {
          logs.send({ embeds: [embed] })
          message.channel.send({ embeds: [sucesso] })
        })
      } else if (!guild.members.cache.get(message.author.id)) {
        logs.send({ embeds: [embed] })
        await message.channel.send({ embeds: [sucessoParcial] })
      }
    } else if (author.bugsReported === 10) {
      logs.send({ embeds: [embed] })
      message.channel.send({ embeds: [sucesso] })
    }
    if (author.bugsReported === 9) {
      message.channel.send({ embeds: [cargoEmbed] })
      message.member.roles.add(cargozinho)
      message.channel.send({ embeds: [sucesso] })
      logs.send({ embeds: [embed] })
      author.bugsReported += 1
      author.save()
    }
  }
};