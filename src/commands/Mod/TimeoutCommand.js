const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const parse = require('parse-duration')

module.exports = class Timeout extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'timeout'
    this.aliases = ['timeout', 'tempofora']
    this.category = 'Mod'
  }

  async run(message, args) {
    // Embed erro de permissões:
    const embedA = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('**Timeout:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MODERATE_MEMBERSS`', true)

    const permErr = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('**Timeout:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se eu possuo a permissão:*', '`MODERATE_MEMBERSS`', true)

    const emptyMessage = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Timeout:**', `${message.author.username}`, true)
      .setDescription('Criado para subistituir o antigo comando mute, um timeout irá remover o usuário temporariamente dos canais do seu servidor o impedindo de enviar mensagens e se comunicar por voz, esta funcionalidade foi implementada pelo Discord em um release anterior.') // inline false
      .addField('*Uso do comando:*', '`timeout <@user> <tempo> <motivo>`', true)
      .addField('*Exemplo:*', '`timeout @Solaris#0006 1d Mute manager has spoken!`', true)

    const rolesHighest = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:reinterjection:955577574304657508> **Timeout:**', `${message.author.username}`, true)
      .setDescription('Você não pode executar um timeout neste usuário pois o cargo dele é maior ou equivalente ao seu e ou o meu.') // inline false

    const defina = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Configuração Incompleta (BAN):**', `${message.author.username}`, true)
      .setDescription('Configure da forma ensinada abaixo.') // inline false
      .addField('*Uso do comando:*', '`Punishment logs <canal>`', true)
      .addField('*Exemplo:*', '`Punishment logs #geral`', true)

    const channel = await this.client.database.guild.getOrCreate(message.guild.id)
    const log = this.client.channels.cache.get(channel.punishChannel)
    if (!log) message.reply({ embeds: [defina] })
    // verifica se o conteúdo da mensagem é nulo
    if (!args[1]) return message.reply({ embeds: [emptyMessage] });
    // verifica se user autor da mensagem tem permissão de moderar os membros.
    if (!message.member.permissions.has('MODERATE_MEMBERSS')) return message.reply({ embeds: [embedA] });
    // verifica se user bot da mensagem tem permissão de moderar os membros.
    if (!message.guild.me.permissions.has('MODERATE_MEMBERSS')) return message.reply({ embeds: [permErr] });
    // define o que é user, neste caso user é o primeiro usuário que o autor colocar o ID ou mencionar no chat
    const user = await message.guild.members.fetch(args[0]?.replace(/[<@!>]/g, ''))
    // checa se o usuário tem o mesmo cargo ou superior ao executor da mensagem.
    const executorRole = message.member.roles.highest;
    const targetRole = user.roles.highest;
    if (executorRole.comparePositionTo(targetRole) <= 0 && message.guild.me !== message.author.id !== message.guild.ownerID) {
      return message.reply({ embeds: [rolesHighest] });
    }
    // define qual vai ser o motivo do timeout.
    const reason = args.slice(2).join(' ')
    // define o temporizados do timeout.
    const timer = args[1];
    // aqui define uma condição "se", então se o timer não for definido ele retorna o erro.
    if (!timer) return message.reply('Você não definiu o tempo')
    // aqui define uma condição "se", então se o "user" não for encontrado ele retorna uma mensagem mencionando o autor da mensagem que o usuário não foi encontrado.
    if (!user) return message.reply('eu procurei, procurei, e não achei este usuário')
    // aqui define a condição "se", então caso não seja inserido nenhum motivo junto ao comando irá retornar a mensagem pedindo para adiconar um motivo válido.
    if (reason.length < 1) return message.reply('`Adicione um motivo válido!`')

    // Embed confirmação:
    const embed = new MessageEmbed()

      .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
      .setTitle('Ação | Timeout')
      .setColor('#ff112b')
      .setDescription(`\n<:martelodobem:1041234493744369715> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:martelodobem:1041234493744369715> **Usuário:** ${user.user.username} \n**ID:** ${user.id}` + `\n<:peeencil:1040822681379024946> **Motivo:** ${reason}` + `\n<:KaelMutado:673592196972412949> **Tempo:** ${timer}`)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date());

    // executa o corte de comunicação ou timeout.
    user.timeout(parse(timer)).then(
      log.send({ embeds: [embed] }))
  }
}