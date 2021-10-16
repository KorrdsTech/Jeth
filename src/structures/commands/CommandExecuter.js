const CommandContext = require('./CommandContext')
module.exports = async function exec(client, message) {
  if (message.author.bot) {
    if (message.author.discriminator !== '0000') return
    if (message.author.username !== 'GymJS') return
    if (message.channel.id !== '831041528369250354') return
    const member = message.mentions.users.first()
    const userData = await client.database.users.getOrCreate(member?.id)
    const vipRole = message.guild.roles.cache.find((role) => role.id === '839754099573522452');
    if (!message.guild.members.cache.get(member.id)?.roles?.cache?.has(vipRole.id)) {
      userData.rep += 1
      userData.save()
      return
    } else if (message.guild.members.cache.get(member.id)?.roles?.cache?.has(vipRole.id)) {
      Users.rep += 2
      Users.save()
      return
    }
  }

  if (message.channel.type === 'DM') return
  const guildData = await client.database.guilds.getOrCreate(message.guild.id)
  const userData = await client.database.users.getOrCreate(message.author.id)
  if (message.channel.id === '718178715657568359') {
    const thumbsup = '👍'
    const thumbsdown = '👎'
    message.react(thumbsup)
    await message.react(thumbsdown)
  }

  if (guildData.sugesModule) {
    const suggestionChannel = message.guild.channels.get(guildData.sugesChannel)
    if (!suggestionChannel) return
    if (message.channel.id !== suggestionChannel.id) return
    const yes = '673592197202837524'
    const question = '❓'
    const no = '673592197341249559'
    message.react(yes)
    await message.react(question)
    await message.react(no)
  }

  const args = message.content.slice(guildData.prefix.length).trim().split(' ')
  const commandName = args.shift().toLowerCase()
  const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName))
  if (!command) return
  const ctx = new CommandContext(client, message, args, client.database)
  command.exec(ctx)
}