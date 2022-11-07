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
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date())

    const sucesso = new MessageEmbed()
      .setColor(colors['lightgreen'])
      .setDescription('**SUCESSO**')
      .addFields({ name: '✅', value: 'Você reportou um novo bug com sucesso!', inline: true })
      .setFooter({ text: 'Lembre-se abusar dos benefícios dete sistema será considerado abuso de API.', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date())

    const sucessoParcial = new MessageEmbed()
      .setColor(colors['lightblue'])
      .setDescription('**SUCESSO**')
      .addFields({ name: '✅', value: 'Você reportou um novo bug com sucesso!', inline: true })
      .addFields({ name: '💁', value: '**Você não se encontra dentro do servidor oficial para receber benefícios extras!**', inline: true })
      .setFooter({ text: 'Lembre-se abusar dos benefícios dete sistema será considerado abuso de API.', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date())

    const guild = this.client.guilds.cache.get('1001368891160805506')

    if (author.bugsReported === 10) {
      if (guild.members.cache.get(message.author.id)) {
        author.roles.add('1001368891227914268')
        await logs.send({ embeds: [embed] })
        return message.channel.send({ embeds: [sucesso] })
      } else if (author.bugsReported !== 10)
        author.bugsReported += 1
      await logs.send({ embeds: [embed] })
      await message.channel.send({ embeds: [sucesso] })
      return author.save()
    } else if (!guild.members.cache.get(message.author.id)) {
      await message.channel.send(({ embeds: [sucessoParcial] }))
      return logs.send({ embeds: [embed] })
    }
  }
};