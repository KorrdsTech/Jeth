const { Command } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class softban extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'softban'
    this.aliases = ['softban', 'bansoft']
    this.category = 'Mod'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const cor = '#c635ff'
    const usuario = this.client.users.cache.get(args[0]) || message.mentions.users.cache.first()
    if (!message.guild.member(message.author.id).permissions.hass('BAN_MEMBERS')) return message.reply(':x: **|** Você não tem permissão para executar este comando!')
    if (message.mentions.users.size < 1) return message.reply('Mencione algum membro')
    if (!message.guild.member(usuario).bannable) return message.reply(`:x: **|** Eu não posso punir essa pessoa, talvez o cargo dela seja maior que o meu`)
    let razao = args.slice(1).join(' ')
    if (!razao) razao = 'Sem motivo declarado'
        // const embedC = new MessageEmbed()
        // .setTimestamp()
        // .setColor(colors.mod)
        // .setTitle('**Err:**', true)
        // .setDescription('Missing Permissions') // inline false
        // .addField('*Verifique se meus cargos estão acima do usuário:*', '`ROLES_COMPARSION`', true)
        // .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))

        // let targetMember = usuario.roles.highest;
        // let clientRole = message.guild.me.roles.highest;
        // if (clientRole.comparePositionTo(targetMember) <= 0) {
        //     message.reply({ embeds: [embedA] });
        //     return 0;
        // }
    message.guild.member(usuario).ban({ days: 7 })
    message.guild.unban(usuario)
    const embed = new MessageEmbed()
      .setDescription(`${usuario.username} foi **Suavemente Banido** do servidor por ${message.author}\nMotivo: ${razao} `)
      .setColor(cor)
    message.channel.send({ embeds: [embed] })
  }
}