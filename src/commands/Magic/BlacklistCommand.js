const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class blacklist extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'blacklist'
    this.aliases = ['blacklist', 'blist']
    this.category = 'Magic'
    this.adminOnly = false
  }

  async run(message, args) {
    const staff = await this.client.database.user.getOrCreate(message.author.id)
    if (!staff.staff) {
      return message.reply('Você não pode utilizar este comando, somente os membros confiados da equipe <@&718178715426619489>')
    }
    if (!args[0]) {
      return message.reply('Você tem que falar o id do usuario para que eu póssa adicionar na blacklist...').then(sent => sent.delete({ timeout: 5000 }))
    }
    const usuario = await this.client.users.fetch(args[0]?.replace(/[<@!>]/g, ''))
    if (!usuario) {
      message.reply('Mencione um membro valido.')
    }
    const userData = await this.client.database.user.getOrCreate(usuario.id)
    let reason = args.slice(1).join(' ')
    if (!reason) {
      reason = 'Qual o motivo da blacklist?'
    }

    // recycling
    // const warnembed18 = new MessageEmbed()

    //   .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
    //   .setTitle(`${message.author.username}`)
    //   .setDescription(`:do_not_litter: **Você foi blacklisted ${message.guild.name} :no_entry_sign:** \nO que isto significa ? você não poderá mais fazer parte dos servidores que apoiam a network da Jeth, por quebrar um dos termos de serviço do discord, este tipo de punição não oferece appeal e se você se encontra nesta situação provavelmente terá sua conta encerrada.`)
    //   .setColor('BLACK')
    //   .addField('<:pepe:651487933148299291> **Staffer:**', `${message.author}`)
    //   .addField('📝 Motivo:', `${reason}`)
    //   .setFooter({ text: 'https://discordapp.com/guidelines・Discord da Jeth 🛠' })
    //   .setTimestamp(new Date());

    const warnembed14 = new MessageEmbed()

      .setThumbnail(usuario.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setAuthor({ name: `${message.author.username} Aplicou uma network blacklist`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })
      .setColor('BLACK')
      .setDescription(`**Blacklisted!** \n \n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Infrator:** ${usuario.username} \n**ID:** ${usuario.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
      .setFooter({ text: '☕️・https://discordapp.com/guidelines', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp(new Date());

    const defina = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Configuração Incompleta (BAN):**', `${message.author.username}`, true)
      .setDescription('Configure da forma ensinada abaixo.') // inline false
      .addField('*Uso do comando:*', '`PunishmentLogs set <canal>`', true)
      .addField('*Exemplo:*', '`PunishmentLogs set #geral`', true)

    const channel = await this.client.database.guild.getOrCreate(message.guild.id)
    const log = this.client.channels.cache.get(channel.punishChannel)
    if (!log) message.reply({ embeds: [defina] })
    if (userData.blacklist) {
      userData.blacklist = false
      userData.save().then(async () => {
        for (const gd of this.client.guilds.cache) {
          const guildData = this.client.database.guild.getOrCreate(gd.id)
          if (guildData?.blacklistModule) {
            gd.bans.remove(usuario.id).then(() => log.send(`${message.author},\`${usuario.tag}\`,não está mais na blacklist.`))
          }
        }
        message.channel.send(`${message.author}, o usuário \`${usuario.tag}\` foi removido da blacklist.`)
      })
    } else {
      userData.blacklist = true
      userData.save().then(async () => {
        for (const gd of this.client.guilds.cache) {
          const guildData = this.client.database.guild.getOrCreate(gd.id)
          if (guildData?.blacklistModule) {
            gd.bans.create(usuario.id, { reason: `Blacklisted: ${reason}` }).then(
              log.send({ embeds: [warnembed14] }));
          }
        }
        message.channel.send(`${message.author}, o usuário \`${usuario.tag}\` foi adicionado na blacklist.`)
      })
    }
  }
}
