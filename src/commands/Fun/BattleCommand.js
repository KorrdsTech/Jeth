const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class battle extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'battle'
    this.aliases = ['1v1', 'fight']
    this.category = 'Fun'
  }

  async run(message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.reply('`Você não mencionou o usuario que você quer batalhar!`').catch(console.error);
    if (message.author.id == user.id)
      return message.reply('`Você não pode batalhar contra si mesmo!`').catch(console.error);
    const v = '<@' + message.author.id + '>'
    const v2 = ' <@' + user.id + '>'
    const gifs = ['https://2.bp.blogspot.com/-JvzopHO87T8/V4VKL4PX_GI/AAAAAAAAEWA/-Rx2XKmOT28lElnlMUaOpn22FAuKdJA4wCLcB/s640/tumblr_o49dvpBamW1vont75o1_500.gif', 'https://pa1.narvii.com/6668/62e28e9e256f3003fc4078f5aeaac99aefec1d8e_hq.gif', 'https://media1.tenor.com/images/4bb385101ff94e863ddef445ce2cc732/tenor.gif?itemid=18523359', 'https://media1.tenor.com/images/304bff8e43185ab3dfcd6424bd2be8fd/tenor.gif?itemid=18523137', 'https://pa1.narvii.com/6562/3a7a5cdcf9b84afb206a65a3d99d3d3c11447088_hq.gif', 'https://i.pinimg.com/originals/3c/40/7c/3c407c8f18f779df549c30fa0e56f835.gif', 'https://i.pinimg.com/originals/20/8e/f9/208ef916f5998629b0face475c12e241.gif', 'https://thumbs.gfycat.com/FickleForcefulBlobfish-max-1mb.gif', 'https://media3.giphy.com/media/h3Jxu7a7pd72w/giphy.gif', 'https://data.whicdn.com/images/301514445/original.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907413667061059645/00efa2908eeb42db664df14a49757125.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907413702700044318/0cf6a982c54829d008e6dc379fa65bfc.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907413731095502899/2b90e47bf094e2e914ad629edc8e47f20c0d3c4ar1-540-304_hq.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907413780399542362/4vFE.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907413826473971722/8efe58229c1d83b1cac921a21a1721ae.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907413876486852638/9b991a930754d8ceb0a71ed974a05b486ab6b0a9_hq.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907413944702992404/9db4efad58e590f48e7abfff55536b62.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907414019781058640/25e1fb1d5b9675519331511d46c6caf6.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907414081407971348/27fa4e2b3dc4d9d15761e33bcbed25a1.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907414175402299442/5091a558fcd006aff561e3419d06dc46.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907414221921349632/7642a5a83e711f6a4606443911a9a008.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907414275948183562/anime-naruto.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907414387076263996/b3fcaf3facc268a73fe8f7f1e0d2fa8c.gif', 'https://cdn.discordapp.com/attachments/882454594280636458/907414568924512296/e450f428a6a0bafabe70237e963d1165.gif']

    const falasGanhador = ['**ganhou** a batalha!',
      '**venceu** a batalha!']

    const falasPerdedor = ['**morreu** em combate!',
      '**perdeu** a batalha!',
      '**sobreviveu a luta** perdeu a batalha!']

    const situacaoBatalha = [false, false] // Desafiante 1 e Desafiante 2

    function randomFalas(){
      switch (situacaoBatalha.indexOf(true)) {
        case 0: // O primeiro ou segundo desafiante Perdeu
          return falasPerdedor[Math.floor(Math.random() * falasPerdedor.length)]
        case 1: // O primeiro ou segundo desafiante Ganhou
          return falasGanhador[Math.floor(Math.random() * falasGanhador.length)]
        default: // Batalha acontecendo
          situacaoBatalha[Math.floor(Math.random() * situacaoBatalha.length)] = true
          if (situacaoBatalha.indexOf(true) == 0)
            return falasGanhador[Math.floor(Math.random() * falasGanhador.length)]
          return falasPerdedor[Math.floor(Math.random() * falasPerdedor.length)]
      }
    }
    const embedB = new MessageEmbed()
      .setTitle('🏹 | Batalha')
      .setDescription(' O ' + v + ' e' + v2 + ' **estão disputando uma batalha!**')
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setColor(colors.default)
            //.addField("Sobre a batalha:", "O " + v + "\n" + falas[Math.floor(Math.random() * falas.length)] + "\n" + "O " + v2 + "\n" + falas[Math.floor(Math.random() * falas.length)])
      .addField('Sobre a batalha:', 'O ' + v + '\n' + randomFalas() + '\n' + 'O ' + v2 + '\n' + randomFalas())
      .setTimestamp()
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))

    message.channel.send({ embeds: [embedA] })
  }
}