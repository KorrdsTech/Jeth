const { EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js')
const { colors, AntiSpamUtils, AntiInviteUtils, PermissionsBitField } = require('../utils')
const parse = require('parse-duration')

module.exports = async function onMessage(message) {
  if (message.channel.type === 'DM') return
  const guildDocument = await this.database.guild.getOrCreate(message.guild.id)

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
    const embeduserp = new EmbedBuilder()
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

  if (PermissionsBitField?.Flags.use_application_commands && !message.guild.me.permissions.has(PermissionsBitField.Flags.use_application_commands)) {
    const embedbotp = new EmbedBuilder()
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

  const embeddevonly = new EmbedBuilder()
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
    if (message.author.id !== process.env.OWNERS) {
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

  const mentionRegex = RegExp(`^<@!?${this.user.id}>$`);
  if (message.content.match(mentionRegex)) {
    let totalCommands = 0
    this.commands.each((c) => totalCommands++)

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Me Convide!')
        .setStyle('LINK')
        .setEmoji('<a:a_heartlove:954636909668347914>')
        .setURL('https://discord.com/oauth2/authorize?client_id=718210363014905866&scope=bot&permissions=8'),

      new MessageButton()
        .setLabel('Suporte')
        .setStyle('LINK')
        .setEmoji('<:b_blurpleemployee:856174396423274516>')
        .setURL('https://discord.gg/jeth')
    );

    message.reply({ content: `<a:b_hypesquadi:887899688634839042> **Olá, **${message.author}! Prazer em ter você utilizando nossos comandos, tem algo em que eu possa ajudar? Caso queira saber os meus comandos, por favor use ${guildDocument.prefix}ajuda que lhe enviarei tudo sobre meus comandos! <a:a_dancin:934175860930527313> Atualmente possuo **${totalCommands}** comandos!`, components: [row] })

  }

}
