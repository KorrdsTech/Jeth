const { Command, colors } = require('../../utils')
const Discord = require('discord.js');

module.exports = class soco extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'punch'
    this.aliases = ['socar', 'soco']
    this.category = 'Fun'
  }

  async run(message, args) {
    const socoUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!socoUser) return message.channel.send('`Mencione o usuário que deseje dar um soco!`');

    const gifs = ['https://thumbs.gfycat.com/ImperfectFrightenedFoal-size_restricted.gif', 'https://c.tenor.com/o0FEX0ZcSAEAAAAd/hibiki-punch-anime-punch.gif', 'https://animesher.com/orig/1/142/1426/14266/animesher.com_fighter-akuma-no-riddle-anime-girl-1426649.gif', 'https://i1.wp.com/i.pinimg.com/originals/87/e6/b1/87e6b15d15e0555f1d2fbc23835f2ec7.gif?ssl=1', 'https://i0.wp.com/3.bp.blogspot.com/-f2C5CBKw05A/W95nlOPZ4HI/AAAAAAABXVo/eU16NRt_qQIh64c3AvSScDYuRL2H6lAegCKgBGAs/s1600/Omake%2BGif%2BAnime%2B-%2BFairy%2BTail%2BFinal%2BSeason%2B-%2BEpisode%2B282%2B-%2BLucy%2BPunch.gif']

    const socoEmbed = new Discord.MessageEmbed()
      .setColor(colors.default)
      .setDescription(`🥊 ${message.author} **nocauteou o usuário** ${message.mentions.users.first().username}`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp();
    message.channel.send(socoEmbed)
    try {
      message.delete({ timeout: 100 }).catch(() => { })
    } catch (error) {
      console.log(error);
      message.channel.send(error);
    }
  }
}