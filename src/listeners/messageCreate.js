const { MessageEmbed } = require('discord.js')
const { colors, AntiSpamUtils } = require('../utils')
const parse = require('parse-duration')

module.exports = async function onMessage(message) {
  const guildDocument = await this.database.guild.getOrCreate(message.guild.id)

  if (message.channel.type === 'DM') return
  if (message.author.bot) {
    if (message.author.discriminator !== '0000') return
    if (message.author.username !== 'Haku') return
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
    AntiSpamUtils.verify(message)
  }
  const thumbsup = '👍';
  const thumbsdown = '👎';
  if (message.channel.id === '718178715657568359') {

    message.react(thumbsup);
    await message.react(thumbsdown);
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

  if (guildDocument.antInvite && !message.member.permissions.has('ADMINISTRATOR')) {
    if ((/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io))/g).test(message.content)) {
      message.delete()
      message.member.timeout(parse('1d'), '[AUTOMOD] Divulgação de convites não são toleradas aqui.').then(() => {
        message.reply('<:a_blurplecertifiedmoderator:856174396225355776> Você não pode divulgar outros servidores aqui! Caso se repita você será banido!')
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
    const embed = new MessageEmbed()
    embed.setTimestamp()
    embed.setColor(colors['mod'])
    embed.setAuthor('Você não tem permissão', message.author.displayAvatarURL({ dynamic: true }))
    embed.setDescription(`**Você precisa verificar se possui essas permissiões:** ${command.permissions.map(perms => `\`${perms}\``).join(', ')}`)

    return message.reply({ embeds: [embed] })
  }

  Object.defineProperties(message, {
    'prefix': { value: prefix },
    'command': { value: command }
  })

  if (command) {
    if (guildDocument.delete) {
      guildDocument.delete = true
      command.process(message, args)
    } else {
      guildDocument.delete = false
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
