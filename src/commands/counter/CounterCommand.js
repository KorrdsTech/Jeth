const { Command, TranslateFunctions, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class CounterCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'contador'
    this.aliases = ['count', 'counter']
    this.category = 'counter'
    this.permissions = ['MANAGE_GUILD']
  }

  async run(message, args) {
    const guildDocument = await this.client.database.Guilds.findById(message.guild.id)
    if (args[0] === 'canal') {
      const channel = message.guild.channels.cache.find(c => c.name === args.slice(1).join(' ')) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
      if (!channel || channel.type === 'category') return message.channel.send('Coloque um canal válido!')

      guildDocument.countChannel = channel.id
      guildDocument.save().then(async () => {
        await message.channel.send(`Canal definido: ${channel}`)
      })
    } else if (args[0] === 'mensagem') {
      const mensagem = args.slice(1).join(' ')

      if (!mensagem) {
        return message.channel.send(`Coloque qual será a mensagem do contador, lembre-se '{cor - tipo}' será o tipo/cor do contador...`)
      }

      // agora é preciso separar estes includes, código por código, pois todos juntos não é aceito e da erro, burlando todo o sistema.
      if (mensagem.includes('{pinky}') && !guildDocument.partner) {
        return message.channel.send('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{green}') && !guildDocument.partner) {
        return message.channel.send('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{gold}') && !guildDocument.partner) {
        return message.channel.send('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{amarelo}') && !guildDocument.partner) {
        return message.channel.send('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{redblue}') && !guildDocument.partner) {
        return message.channel.send('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{natal}') && !guildDocument.partner) {
        return message.channel.send('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{bouncepink}') && !guildDocument.partner) {
        return message.channel.send('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{roxo}') && !guildDocument.partner) {
        return message.channel.send('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{rainbow}') && !guildDocument.partner) {
        return message.channel.send('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{bouncepurple}') && !guildDocument.partner) {
        return message.channel.send('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }

      guildDocument.countMessage = mensagem
      guildDocument.count = true
      guildDocument.save()
      const defaultChannel = await message.guild.channels.cache.get(guildDocument.countChannel)
      if (!defaultChannel) return message.channel.send(`Este servidor não possui um canal definido no contador...\nUse: \`${message.prefix}contador canal #canal\` para definir um e use o comando novamente!`)
      setTimeout(async () => {
        //ja volto ai
        await message.channel.send(`Mensagem definida como \`${guildDocument.countMessage}\`\nContador ativado...`)
        await defaultChannel.setTopic(guildDocument.countMessage.replace('{azul}', TranslateFunctions.azul(message.guild.memberCount))
          .replace('{pinky}', TranslateFunctions.pinky(message.guild.memberCount))
          .replace('{gold}', TranslateFunctions.gold(message.guild.memberCount))
          .replace('{green}', TranslateFunctions.green(message.guild.memberCount))
          .replace('{rosa}', TranslateFunctions.rosa(message.guild.memberCount))
          .replace('{red}', TranslateFunctions.red(message.guild.memberCount))
          .replace('{ruby}', TranslateFunctions.ruby(message.guild.memberCount))
          .replace('{amarelo}', TranslateFunctions.amarelo(message.guild.memberCount))
          .replace('{violeta}', TranslateFunctions.violeta(message.guild.memberCount))
          .replace('{natal}', TranslateFunctions.natal(message.guild.memberCount))
          .replace('{redblue}', TranslateFunctions.redblue(message.guild.memberCount))
          .replace('{redblack}', TranslateFunctions.redblack(message.guild.memberCount))
          .replace('{aqua}', TranslateFunctions.aqua(message.guild.memberCount))
          .replace('{ice}', TranslateFunctions.ice(message.guild.memberCount))
          .replace('{roxo}', TranslateFunctions.roxo(message.guild.memberCount))
          .replace('{rainbow}', TranslateFunctions.rainbow(message.guild.memberCount))
          .replace('{blk}', TranslateFunctions.blk(message.guild.memberCount))
          .replace('{bouncepurple}', TranslateFunctions.bouncepurple(message.guild.memberCount))
          .replace('{bouncepink}', TranslateFunctions.bouncepink(message.guild.memberCount)))
      }, 5000)
    } else if (args[0] === 'remover') {
      if (!guildDocument.count) return message.channel.send(`Este servidor não possui um contador ativado!`)
      const lastChannel = message.guild.channels.cache.get(guildDocument.countChannel)
      guildDocument.count = false
      guildDocument.countChannel = ''
      guildDocument.countMessage = ''

      guildDocument.save().then(async () => {
        await lastChannel.setTopic('')
        await message.channel.send(`O contador foi removido do canal ${lastChannel} e desativado`)
      })
    } else {
      const embed = new MessageEmbed()
        .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(`**Seja bem vindo(a) ao painel de configuração !**`)
        .setColor(colors['default'])
        .setThumbnail('https://cdn.discordapp.com/emojis/742240408658247791.png')
        .addField('**COMANDOS:**', [
          `\`${guildDocument.prefix}contador canal #canal\` - Define o canal onde o contador será definido.`,
          `\`${guildDocument.prefix}contador mensagem <mensagem>\` - Define a mensagem que será exibida no contador.`,
          `\`${guildDocument.prefix}contador remover\` - Caso haja algum contador ligado/definido, ele será removido e o sistema desligado.`,
          `\n**Clique na reação abaixo para ver os \`Placeholders\` digite-os corretamente!**\n`], false)

      const embed2 = new MessageEmbed()
        .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setThumbnail('https://cdn.discordapp.com/emojis/742240408658247791.png')
        .setDescription(`**Seja bem vindo(a) ao painel de configuração !**\n**Estilos de contador:**`)
        .addField('**CONTADORES**', '**GERAIS** <:supporter:667149933480247297>', false)
        .addField('**{azul}**', '<a:set1:664306595391602698>', true)
        .addField('**{aqua}**', '<a:fil2:735932752171630663>', true)
        .addField('**{violeta}**', '<a:t3:683857609023160322>', true)
        .addField('**{rosa}**', '<a:j_4:675774964997029918>', true)
        .addField('**{ruby}**', '<a:k5:683064092793110558>', true)
        .addField('**{red}**', '<a:6r:922390293771333672>', true)
        .addField('**{redblack}**', '<a:lo7:735367392703807560>', true)
        .addField('**{ice}**', '<a:8ice:737078967244423189>', true)
        .addField('**{blk}**', '<a:BLK9:770793783583309866>', true)
        .addField('**CONTADORES**', '**PARTNER** <:a_blurplepartner:856174395869626399>', false)
        .addField('**{rainbow}**', '<a:rb_1:742627650803335209>', true)
        .addField('**{roxo}**', '<a:JT2:739977300921024522>', true)
        .addField('**{amarelo}**', '<a:j3:683858525641900103>', true)
        .addField('**{pinky}**', '<a:purple4:669217839030468608>', true)
        .addField('**{bouncepink}**', '<a:el5:735367916320587925>', true)
        .addField('**{redblue}**', '<a:dr6:684473203191578664>', true)
        .addField('**{green}**', '<a:g7:683859048638185487>', true)
        .addField('**{gold}**', '<a:gold8:669218300655435776>', true)
        .addField('**{natal}**', '<a:v9:684833174983147520>', true)
        .addField('**{bouncepurple}**', '<a:0_:875581760262504468>', true)
        .setColor(colors['default'])
      let canalContador = `<a:warnRoxo:664240941175144489> Desativado`;
      if (guildDocument.countChannel.length) {
        canalContador = `<:JethVerificado:666762183249494027> Ativo | Canal: <#${guildDocument.countChannel}>`;
      }
      embed2.addField('<:ligado:665056984021729320> | Canal do Contador:', canalContador);
      let MsgCount = `<:rejected:739831089543118890> Desativado`;
      if (guildDocument.countMessage.length) {
        MsgCount = `<:concludo:739830713792331817> Ativo | Mensagem: ${guildDocument.countMessage.length > 800 ? `${guildDocument.countMessage.slice(0, 801)}[...]` : guildDocument.countMessage}`;
      }
      embed2.addField('<:ligado:665056984021729320> | Mensagem do Contador:', MsgCount);
      const msgWelcome = guildDocument.count ?
        `<:concludo:739830713792331817> Ativo` :
        `<:rejected:739831089543118890> Desativado`
      embed2.addField('Contador está:', msgWelcome)

      let embedCount = 1

      message.channel.send({ embed }).then(async m => {
        await m.react('666762183249494027')// ir para frente
        const filter = (e, u) => (u.id == message.author.id) && (e.emoji.id == '666762183249494027' /* para frente */ || e.emoji.id == '665721366514892839')
        const col = m.createReactionCollector({ filter, time: 180000, errors: ['time'] })
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

            m.edit(embed)
            embedCount = 1
          }
        })
      })
    }
  }
}
