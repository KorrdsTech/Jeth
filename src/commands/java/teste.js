const { Command } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')

module.exports = class testecmd extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'teste'
    this.aliases = ['test', 'tt', 'aaaa']
    this.category = 'Magic'
    this.adminOnly = false
  }

  async run(message) {

    const embed = new MessageEmbed()
      .setColor('#00b9ff')
      .setDescription('**Cargos de Notificação**\n\n <:Jeth:1038534803416432722> **Notificar Novidades:** Seja notificado das novidades da Jeth fique por dentro de novas funcionalidades, sorteios, atualizações importantes e muito mais!\n\n <:JethInfo:1038554986025598976> **Notificar Status:** Saiba como está o estado da Jeth, se ela apresentou problemas e irá ficar offline ou outros bugs encontrados.\n\n <:JethHappy:1038562008532004886> **Notificar Novidades WIP:** Fique por dentro do que está sendo criado e desenvolvido dentro da Jeth\n\n <a:a_dancin:1002698613262127144> **Estreias:** Seja notificado quando alguma live do Solaris for ao ar e venha se divertir conosco. \n\n <:JethCupacke:1038536622410575932> **Seguidor(a) da Jeth:** Você será notificado sempre das atualizações de interesses do servidor da Jeth, sempre que algo relevante for postado, você saberá.')
      .setThumbnail('https://cdn.discordapp.com/emojis/1038562008532004886.webp?size=96&quality=lossless')

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('novidades')
          .setEmoji('<:Jeth:1038534803416432722>')
          .setLabel('Notificar Novidades:')
          .setStyle('SECONDARY'),
      ).addComponents(
        new MessageButton()
          .setCustomId('novidades1')
          .setEmoji('<:JethInfo:1038554986025598976>')
          .setLabel('Notificar Status:')
          .setStyle('SECONDARY'),
      ).addComponents(
        new MessageButton()
          .setCustomId('novidades2')
          .setEmoji('<:JethHappy:1038562008532004886>')
          .setLabel('Notificar Novidades WIP:')
          .setStyle('SECONDARY'),
      ).addComponents(
        new MessageButton()
          .setCustomId('novidades3')
          .setEmoji('<a:a_dancin:1002698613262127144>')
          .setLabel('Estreias:')
          .setStyle('SECONDARY'),
      ).addComponents(
        new MessageButton()
          .setCustomId('novidades4')
          .setEmoji('<:JethCupacke:1038536622410575932>')
          .setLabel('Seguidor(a) da Jeth:')
          .setStyle('SECONDARY'),
      );

    await message.channel.send({ embeds: [embed] });
  }
}