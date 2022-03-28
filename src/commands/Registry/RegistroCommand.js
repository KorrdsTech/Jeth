const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')

module.exports = class Registry extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'Registry'
    this.aliases = ['Registry']
    this.category = 'Registry'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)
    if (args[0] === 'masculino') {
      const role = message.mentions.roles.first();
      if (!role) return message.reply(`${message.author},por favor mencione o cargo.`)
      guildDocument.masculino = role.id;
      guildDocument.save().then(() => {
        const embed = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setDescription(`Você definiu o cargo ${role} como masculino Com sucesso.`)
          .setColor(colors['default'])
          .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
          .setTimestamp();
        message.reply({ embeds: [embed] })
      })
    } else if (args[0] === 'feminino') {
      const role = message.mentions.roles.first();
      if (!role) return message.reply(`${message.author},por favor mencione o cargo.`)
      guildDocument.feminino = role.id;
      guildDocument.save().then(() => {
        const embed = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setDescription(`Você definiu o cargo ${role} como feminino Com sucesso.`)
          .setColor(colors['default'])
          .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
          .setTimestamp();
        message.reply({ embeds: [embed] })
      })
    } else if (args[0] === 'nbinario') {
      const role = message.mentions.roles.first();
      if (!role) return message.reply(`${message.author},por favor mencione o cargo.`)
      guildDocument.nbinario = role.id;
      guildDocument.save().then(() => {
        const embed = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setDescription(`Você definiu o cargo ${role} como nbinario Com sucesso.`)
          .setColor(colors['default'])
          .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
          .setTimestamp();
        message.reply({ embeds: [embed] })
      })
    } else if (args[0] === 'registrado') {
      const role = message.mentions.roles.first();
      if (!role) return message.reply(`${message.author},por favor mencione o cargo.`)
      guildDocument.registrado = role.id;
      guildDocument.save().then(() => {
        const embed = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setDescription(`Você definiu o cargo ${role} como registrado Com sucesso.`)
          .setColor(colors['default'])
          .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
          .setTimestamp();
        message.reply({ embeds: [embed] })
      })
    } else if (args[0] === 'novato') {
      const role = message.mentions.roles.first();
      if (!role) return message.reply(`${message.author},por favor mencione o cargo.`)
      guildDocument.novato = role.id;
      guildDocument.save().then(() => {
        const embed = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setDescription(`Você definiu o cargo ${role} como novato Com sucesso.`)
          .setColor(colors['default'])
          .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
          .setTimestamp();
        message.reply({ embeds: [embed] })
      })
    } else if (args[0] === 'canal') {
      const channel = message.guild.channels.cache.find(c => c.name === args.slice(1).join(' ')) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
      if (!channel || channel.type === 'category') return message.reply('Coloque um canal válido!')

      guildDocument.channelRegister = channel.id
      guildDocument.save().then(async () => {
        await message.reply(`Canal definido: ${channel}`)
      })
    } else if (args[0] === 'reset') {
      guildDocument.registradores = [];
      guildDocument.save()
        .then(() => {
          message.reply('Histórico de Registrys apagado').catch(() => { });
        })
        .catch(err => {
          console.log(err);
          message.reply('Erro').catch(() => { });
        })
        .catch(console.error);
    } else {
      const embed = new MessageEmbed()
        .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setThumbnail('https://cdn.discordapp.com/emojis/722682133432500251.png?v=1')
        .setDescription(`Dúvidas de como usar o Registry?\nAqui vai algumas dicas...`)
        .setColor(colors['default'])
        .addField('Modos de usar', [
          `\`${guildDocument.prefix}Registry masculino @role\` - Define a role para masculino.`,
          `\`${guildDocument.prefix}Registry nbinario @role\` - Define a role para nbinario.`,
          `\`${guildDocument.prefix}Registry feminino @role\` - Define a role para feminino.`,
          `\`${guildDocument.prefix}Registry registrado @role\` - Define a role para registrado.`,
          `\`${guildDocument.prefix}Registry novato @role\` - Define a role para novato.`,
          `\`${guildDocument.prefix}Registry canal #chat\` - Define a mensagem que será exibida no Registry.`,
          `\`${guildDocument.prefix}Registry reset\` - Para resetar os Registrys dos usuarios no servidor.`,
          `\`${guildDocument.prefix}registrar @membro\` - Para registrar algum membro.`,
          `\`${guildDocument.prefix}registrador\` - Para ver quantas pessoas estão ou não registradas no servidor.`,
          `\`${guildDocument.prefix}Registryu @membro\` - Para ver quem Registryu o membro.`,
          `\`${guildDocument.prefix}Registrys\` - Para ver o top de Registry.`,
          `\`${guildDocument.prefix}Registry desativar\` - Caso haja algum Registry's definido, ele será removido e o sistema desligado.`,
        ].join('\n'), false)

      const embed2 = new MessageEmbed()
        .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setColor(colors['default'])
        .setDescription(`Dúvidas de como esta o Registry do servidor?\nAqui vai o seu painel...`)
        .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
        .setTimestamp();
      if (message.guild.roles.cache.get(guildDocument.masculino)) {
        embed2.addField(` Masculino`, `<:concludo:739830713792331817> Ativo | Cargo masculino: <@&${guildDocument.masculino}>`, true);
      } else {
        embed2.addField(` Masculino`, `<:rejected:739831089543118890> Desativado`, true);
      }
      if (message.guild.roles.cache.get(guildDocument.feminino)) {
        embed2.addField(` Feminino`, `<:concludo:739830713792331817> Ativo | Cargo feminino: <@&${guildDocument.feminino}>`, true);
      } else {
        embed2.addField(` Feminino`, `<:rejected:739831089543118890> Desativado `, true);
      }
      if (message.guild.roles.cache.get(guildDocument.nbinario)) {
        embed2.addField(` Não-Binario`, `<:concludo:739830713792331817> Ativo | Cargo nbinario: <@&${guildDocument.nbinario}>`, true);
      } else {
        embed2.addField(` Não-Binario`, `<:rejected:739831089543118890> Desativado`, false);
      }
      if (message.guild.roles.cache.get(guildDocument.novato)) {
        embed2.addField(` Novato`, `<:concludo:739830713792331817> Ativo | Cargo novato: <@&${guildDocument.novato}>`, true);
      } else {
        embed2.addField(` Novato`, `<:rejected:739831089543118890> Desativado`, true);
      }
      if (message.guild.roles.cache.get(guildDocument.registrado)) {
        embed2.addField(' Registrado', `<:concludo:739830713792331817> Ativo | Cargo registrado: <@&${guildDocument.registrado}>`, true);
      } else {
        embed2.addField(' Registrado', `<:rejected:739831089543118890> Desativado`, true);
      }
      let embedCount = 1

      message.reply({ embeds: [embed] }).then(async m => {
        await m.react('666762183249494027')// ir para frente
        const filter = (e, u) => (u.id == message.author.id) & (e.emoji.id == '666762183249494027' || e.emoji.id == '665721366514892839')
        const col = m.createReactionCollector({ filter, time: 180_000, errors: ['time'] })
        col.on('collect', async (e) => {
          if (embedCount != 2 && e.emoji.id == '666762183249494027') { // ir para frente
            await m.react('665721366514892839')
            e.users.cache.map(u => e.remove(u.id))
            m.edit(embed2)
            embedCount = 2
            await m.react('665721366514892839')// volta para trás
          } else if (e.emoji.id == '665721366514892839' && embedCount == 2) {

            await m.react('666762183249494027')
            e.users.cache.map(u => e.remove(u.id))

            m.edit({ embeds: [embed] })
            embedCount = 1
          }
        })
      })
    }
  }
}