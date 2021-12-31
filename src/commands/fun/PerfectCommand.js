const { Command } = require('../../utils')
const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports = class PerfectCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'perfeito'
    this.aliases = ['perfect']
    this.category = 'fun'
  }

  async run(message, args) {

    const width = 467;
    const height = 400;
    const posX = 30;

    const canvas = createCanvas(width, height); // cria a img que no caso é 1000x3000
    const ctx = canvas.getContext('2d'); // cria um ctx com o texto

    const usuario = message.mentions.users.first() || message.author

    const fundo1 = await loadImage('https://cdn.discordapp.com/attachments/688436947516915764/701160106296868955/perfeito.png');
    ctx.drawImage(fundo1, 0, 0, canvas.width, canvas.height);

    //carrega 1 img, que no caso eo avatar do membro
    const avatar = await loadImage(usuario.avatarURL({ format: 'png', dynamic: true, size: 1024 })) //carrega o avatarURL
    ctx.drawImage(avatar, height - 177, posX + 20, height - 178, height - 179)//posiciona o avatar

    //carrega 2 img
    const image2 = await loadImage('https://cdn.discordapp.com/attachments/688436947516915764/701160545440497735/redondo.png?width=475&height=475')
    ctx.drawImage(image2, height - 177, posX + 20, height - 178, height - 179)//posiciona o redondo

    const attachment = new MessageAttachment(canvas.toBuffer(), 'pf.png'); // img.png eo nome
    await message.channel.send(attachment); // envia o atach
  }
}