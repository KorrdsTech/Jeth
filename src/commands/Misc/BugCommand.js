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
      .addFields('Ticket criado por:', `${message.author.tag}`, true)
      .addFields('**ID:**', `${message.author.id}`, true)
      .addFields('**Descrição:**', `${report}`, true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date())

    const sucesso = new MessageEmbed()
      .setColor(colors['lightgreen'])
      .setDescription('**SUCESSO**')
      .addFields('✅', 'Você reportou um novo bug com sucesso!', true)
      .setFooter({ text: 'Lembre-se abusar dos benefícios dete sistema será considerado abuso de API.', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date())

    const sucessoParcial = new MessageEmbed()
      .setColor(colors['lightblue'])
      .setDescription('**SUCESSO**')
      .addFields('✅', 'Você reportou um novo bug com sucesso!', true)
      .addFields('💁', '**Você não se encontra dentro do servidor oficial para receber benefícios extras!**', true)
      .setFooter({ text: 'Lembre-se abusar dos benefícios dete sistema será considerado abuso de API.', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date())

    const guild = this.client.guilds.cache.get('1001368891160805506')

    await logs.send({ embeds: [embed] })
    if (author.bugsReported === 10) {
      if (guild.member(this.client.database.user.getOrCreate(message.author.id))) {
        // there is a GuildMember with that ID
        message.author.id.roles.add('1001368891227914268')
        return message.channel.send({ embeds: [sucesso] })
      } else if (author.bugsReported !== 10)
        author.bugsReported += 1
      author.save().then(() => {
        message.channel.send(({ embeds: [sucesso] }))
      })
    } else if (!guild.member(this.client.database.user.getOrCreate(message.author.id))) {
      message.reply(({ embeds: [sucessoParcial] }))
    }
  }
};