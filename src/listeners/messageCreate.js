const { MessageEmbed } = require('discord.js')
const { colors, AntiSpamUtils, AntiInviteUtils } = require('../utils')
const parse = require('parse-duration')

module.exports = async function onMessage(message) {
  if (message.channel.type === 'DM') return
  const guildDocument = await this.database.guild.getOrCreate(message.guild.id)
  if (message.author.bot) {
    if (message.author.discriminator !== '0000') return
    if (message.author.username !== 'Discord-Chan') return
    if (message.channel.id !== '879568042433085490') return

    const member = message.mentions.users.first()
    const Users = await this.database.user.getOrCreate(member?.id)

    if (!Users) return

    const vipRole = message.guild.roles.cache.find((role) => role.id === '839754099573522452');

    if (!message.guild.members.cache.get(member.id)?.roles?.cache?.has(vipRole.id)) {
      Users.rep += 1
      Users.save()
      return
    } else if (message.guild.members.cache.get(member.id)?.roles?.cache?.has(vipRole.id)) {
      Users.rep += 2
      Users.save()
      return
    }
  }

  const Users = await this.database.user.getOrCreate(message.author.id)
  if (guildDocument.antSpam) {
    AntiSpamUtils.verify(this, message)
  }

  if (guildDocument?.sugesModule) {
    const suggestionChannel = message.guild.channels.cache.get(guildDocument?.sugesChannel)
    if (!suggestionChannel) return
    if (message.channel.id === suggestionChannel.id) {
      const sim = '673592197202837524';
      const duvida = '❓';
      const nao = '673592197341249559';

      message.react(sim);
      await message.react(duvida);
      await message.react(nao);
    }
  }

  if ((guildDocument.antInvite && !message.member.permissions.has('ADMINISTRATOR'))) {
    if (AntiInviteUtils.scanMessage(message.content)) {
      message.delete()
      message.member.timeout(parse('1d'), '[AUTOMOD] Divulgação de convites não são toleradas aqui.').then(() => {
        message.channel.send(`${message.author} <:a_blurplecertifiedmoderator:856174396225355776> Você não pode divulgar outros servidores aqui! Caso se repita você será banido!`)
      })
    }
  }

  const prefix = guildDocument.prefix
  if (!message.content.startsWith(prefix)) return
  if (Users.blacklist) {
    message.reply('> Você está na blacklist e não pode executar nenhum comando do bot.').then(msg => msg.delete({ timeout: 5000 }))
    return
  }

  const args = message.content.slice(prefix.length).trim().split(' ')
  const name = args.shift().toLowerCase()
  const command = this.commands.find(command => command.name === name || command.aliases.includes(name))
  if (command?.permissions && !message.member.permissions.has(command.permissions)) {
    const embeduserp = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle(`<:ModMute:980288914914947113> Err Missing Permissions!`, message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: `${message.author.tag} (\`${message.author.id}\`) Verifique-se você possui as seguintes permissões:`,
          value: `${command.permissions.map(perms => `\`${perms}\``).join(', ')}`
        })
      .setThumbnail('https://cdn-icons-png.flaticon.com/512/2061/2061766.png')
      .setFooter({ text: `${message.author.tag}.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

    return message.reply({ embeds: [embeduserp] })
  }

  if (command?.bot_permissions && !message.guild.me.permissions.has(command.bot_permissions)) {
    const embedbotp = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle(`<:ModMute:980288914914947113> Err Missing Permissions!`, message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: `${message.author.tag} (\`${message.author.id}\`) Verifique-se eu possuo as seguintes permissões:`,
          value: `${command.bot_permissions.map(perms => `\`${perms}\``).join(', ')}`
        })
      .setThumbnail('https://cdn-icons-png.flaticon.com/512/2061/2061766.png')
      .setFooter({ text: `${message.author.tag}.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

    return message.reply({ embeds: [embedbotp] })
  }

  const embeddevonly = new MessageEmbed()
    .setTimestamp()
    .setColor(colors['mod'])
    .setTitle(`<:ModMute:980288914914947113> Err Missing Permissions!`, message.author.displayAvatarURL({ dynamic: true }))
    .addFields(
      {
        name: `${message.author.tag} (\`${message.author.id}\`) Verifique-se você está setado no banco de dados como developer.`,
        value: `<:reinterjection:955577574304657508> **Seja quem for**, um alerta foi emitido a equipe da Jeth, caso seja um abuso de bug, o usuário será **blacklisted** do bot.`
      })
    .setThumbnail('https://cdn-icons-png.flaticon.com/512/2061/2061766.png')
    .setFooter({ text: `${message.author.tag}.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

  if (command) {
    if (message.author.id !== process.env.DEVELOPERS) {
      if (command.adminOnly)

        return message.reply({ embeds: [embeddevonly] })
    }
  }

  Object.defineProperties(message, {
    'prefix': { value: prefix },
    'command': { value: command }
  })

  if (command) {
    if (guildDocument.delete) {
      command.process(message, args)
      message.delete()
    } else {
      command.process(message, args)
    }
  }

  if (message.content.indexOf(prefix) !== 0) {
    if (message.mentions.members.size > 0) {
      const mention = message.content.split(/ +/g)[0];
      if (mention === `<@${this.user.id}>` || mention === `<@!${this.user.id}>`) {
        message.reply(`<a:dshype:683501891493167163> **Olá! **${message.author}, prazer em ter você utilizando nossos comandos, tem algo em que eu possa ajudar? Caso queira saber os meus comandos, por favor use ${guildDocument.prefix}ajuda que lhe enviarei tudo sobre meus comandos! <a:dshype:683501891493167163>`)
      }
    }
  }
}
