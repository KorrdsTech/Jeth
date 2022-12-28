const { Command, colors } = require('../../utils');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = class welcomeModule extends Command {
  constructor(name, client) {
    super(name, client);

    this.name = 'welcomemodule';
    this.aliases = ['welcome', 'bem-vindo', 'bemvindo'];
    this.category = 'Mod';
  }

  async run(message, args) {
    const guildDocument = await this.client.database.guild.getOrCreate(
      message.guild.id
    );
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('categoria_utilidades')
        .setStyle('SECONDARY')
        .setLabel('◀')
        .setEmoji(``) // por um emoji do seu gosto
        .setDisabled(false),
      new MessageButton()
        .setCustomId('categoria_moderação')
        .setStyle('SECONDARY')
        .setLabel('▶')
        .setEmoji(``) // por um emoji do seu gosto
        .setDisabled(false),
      new MessageButton()
        .setCustomId('fechar')
        .setStyle('DANGER')
        .setLabel('Fechar Painel')
        .setEmoji(``) // por um emoji do seu gosto
        .setDisabled(false)
    );

    const Painel = new MessageEmbed()
      .setAuthor(
        this.client.user.tag,
        this.client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setDescription(
        `Dúvidas de como usar o welcome?\nAqui vai algumas dicas...`
      )
      .setColor(colors['default'])
      .addFields(
        {
          name: `Modo de utilizar`,
          value: `\`${guildDocument.prefix}welcome canal #canal\` - Define o canal onde o welcome será definido.\n\`${guildDocument.prefix}welcome mensagem <mensagem>\` - Define a mensagem que será exibida no welcome.\n\`${guildDocument.prefix}welcome timer-on\` - Irá fazer com que as mensagens de boas vindas sejam apagadas após 15 segundos de serem enviadas.\n\`${guildDocument.prefix}welcome timer-off\` - Irá desabilitar o sistema acima.\n\`${guildDocument.prefix}welcome desativar\` - Caso haja algum welcome ligado/definido, ele será removido e o sistema desligado.\n\`${guildDocument.prefix}welcome autorole @role\` - Para setar uma role ao usuario entrar automatico.\n\`${guildDocument.prefix}welcome delrole\` - Para remover uma role definida no comando acima.\n**Lembre-se se ver os \`Placeholders\` abaixo para não errar nada!**. `,
        },
        {
          name: `Placeholders`,
          value: `O sistema de welcome(bem-vindo) aceita embed!\nNão sabe fazer uma? é facil clique aqui: **[[CLIQUE]](https://leovoel.github.io/embed-visualizer/)**\n**[Utilize ${guildDocument.prefix}embed para mais informações]**\n**Lembre-se se ver os \`Parâmetros\` abaixo para não errar nada!**`,
        },
        {
          name: `Parâmetros`,
          value: `**{USER}** - Para marcar o membro na entrada.\n**{CONTA-CRIADA}** - Para saber a data de criação da conta do membro\n**{AVATAR}** - Para definir o avatar do membro.\n**{USER-ID}** - Para definir o **ID** do membro.\n**{USER-NAME}** - Para definir o nome do membro.`,
        }
      );

    let canalBemVindo = `<:errroror:1040860335147581511> Desativado`;
    if (guildDocument.channelWelcome.length) {
      canalBemVindo = `<:concludinho:1040860364251877427> Ativo | Canal: <#${guildDocument.channelWelcome}>`;
    }
    let MsgAt = `<:ModMute:980288914914947113> Desativado`;
    if (guildDocument.autorole?.length) {
      MsgAt = `<:concludinho:1040860364251877427> Ativo: <@&${guildDocument.autorole}>`;
    }
    let MsgCount = `<:errroror:1040860335147581511> Desativado`;
    if (guildDocument.welcomeMessage.length) {
      MsgCount = `<:concludinho:1040860364251877427> Ativo | Mensagem: ${guildDocument.welcomeMessage.length > 800
        ? `${guildDocument.welcomeMessage.slice(0, 801)}[...]`
        : guildDocument.welcomeMessage
      }`;
    }

    const msgWelcome = guildDocument.welcomeModule
      ? `<:concludinho:1040860364251877427> Ativo`
      : `<:errroror:1040860335147581511> Desativado`;

    const embedA = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['default'])
      .setTitle('**Err:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField(
        '*Verifique se você possui a permissão:*',
        '`MANAGE_GUILD`',
        true
      )
      .setFooter({
        text: '🧁・Discord da Jeth',
        iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }),
      });
    if (!message.member.permissions.has('MANAGE_GUILD'))
      return message.reply({ embeds: [embedA] });

    if (args[0] === 'canal') {
      const channel =
        message.guild.channels.cache.find(
          (c) => c.name === args.slice(1).join(' ')
        ) ||
        message.guild.channels.cache.get(args[1]) ||
        message.mentions.channels.first();
      if (!channel || channel.type === 'category')
        return message.reply('Coloque um canal válido!');

      guildDocument.channelWelcome = channel.id;
      guildDocument.save().then(async () => {
        await message.reply(`Canal definido: ${channel}`);
      });
    } else if (args[0] === 'mensagem') {
      const mensagem = args.slice(1).join(' ');

      if (!mensagem)
        return message.reply(
          `Coloque qual será a mensagem do welcome, lembre-se nósso sistema aceita embed...`
        );

      guildDocument.welcomeMessage = mensagem;
      guildDocument.save().then(async () => {
        guildDocument.welcomeModule = true;
        guildDocument.save().then(async () => {
          const defaultChannel = await message.guild.channels.cache.get(
            guildDocument.channelWelcome
          );
          if (!defaultChannel)
            return message.reply(
              `Este servidor não possui um canal definido no welcome...\nUse: \`${message.prefix}welcome canal #canal\` para definir um e use o comando novamente!`
            );
          await message.reply(`Mensagem definida\nWelcome Ativado...`);
        });
      });
    } else if (args[0] === 'autorole') {
      const role = message.mentions.roles.first();
      if (!role)
        return message.reply(`${message.author},por favor mencione o cargo.`);
      guildDocument.autorole = role.id;
      guildDocument.save().then(() => {
        const embed = new MessageEmbed()
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true, size: 1024 })
          )
          .setDescription(
            `Você definiu o cargo ${role} como auto-role com sucesso.`
          )
          .setColor(colors['default'])
          .setFooter({
            text: '🧁・Discord da Jeth',
            iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }),
          })
          .setTimestamp();
        message.reply({ embeds: [embed] });
      });
    } else if (args[0] === 'delrole') {
      const role = message.mentions.roles.first();
      guildDocument.autorole = '';
      guildDocument.save().then(() => {
        const embed = new MessageEmbed()
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true, size: 1024 })
          )
          .setDescription(
            `Você removeu o cargo ${role} como auto-role com sucesso.`
          )
          .setColor(colors['default'])
          .setFooter({
            text: '🧁・Discord da Jeth',
            iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }),
          })
          .setTimestamp();
        message.reply({ embeds: [embed] });
      });
    } else if (args[0] === 'timer-on') {
      guildDocument.welcomeTimer = true;
      guildDocument.save().then(async () => {
        await message.reply(
          `Você ativou o timer com sucesso! agora todas as mensagens de boas vindas serão deletadas 5 segundos após terem sido enviadas!`
        );
      });
    } else if (args[0] === 'timer-off') {
      guildDocument.welcomeTimer = false;
      guildDocument.save().then(async () => {
        await message.reply(
          `Você desativou o timer com sucesso! WelcomeModule voltará a funcionar como sempre foi, sem restrições de tempo!`
        );
      });
    } else if (args[0] === 'desativar') {
      if (!guildDocument.welcomeModule)
        return message.reply(`Este servidor não possui um welcome ativado!`);
      const lastChannel = message.guild.channels.cache.get(
        guildDocument.channelWelcome
      );
      guildDocument.welcomeModule = false;
      guildDocument.channelWelcome = '';
      guildDocument.welcomeMessage = '';

      guildDocument.save().then(async () => {
        await message.reply(
          `O welcome foi removido do canal ${lastChannel} e desativado`
        );
      });
    } else if (!args[0]) {
      const m = await message.reply({
        embeds: [Painel],
        components: [row],
        fetchReply: true,
      });

      const iFilter = (i) => i.user.id === message.author.id;

      const collector = m.createMessageComponentCollector({
        filter: iFilter,
        time: 10 * 60000,
      });

      collector.on('collect', async (i) => {
        i.deferUpdate();
        switch (i.customId) {
          case `categoria_utilidades`:
            m.edit({
              embeds: [
                new MessageEmbed()
                  .setAuthor(
                    this.client.user.tag,
                    this.client.user.displayAvatarURL({
                      dynamic: true,
                      size: 1024,
                    })
                  )
                  .setDescription(
                    `Dúvidas de como usar o welcome?\nAqui vai algumas dicas...`
                  )
                  .setColor(colors['default'])
                  .addFields(
                    {
                      name: `Modo de utilizar`,
                      value: `\`${guildDocument.prefix}welcome canal #canal\` - Define o canal onde o welcome será definido.\n\`${guildDocument.prefix}welcome mensagem <mensagem>\` - Define a mensagem que será exibida no welcome.\n\`${guildDocument.prefix}welcome timer-on\` - Irá fazer com que as mensagens de boas vindas sejam apagadas após 15 segundos de serem enviadas.\n\`${guildDocument.prefix}welcome timer-off\` - Irá desabilitar o sistema acima.\n\`${guildDocument.prefix}welcome desativar\` - Caso haja algum welcome ligado/definido, ele será removido e o sistema desligado.\n\`${guildDocument.prefix}welcome autorole @role\` - Para setar uma role ao usuario entrar automatico.\n\`${guildDocument.prefix}welcome delrole\` - Para remover uma role definida no comando acima.\n**Lembre-se se ver os \`Placeholders\` abaixo para não errar nada!**. `,
                    },
                    {
                      name: `Placeholders`,
                      value: `O sistema de welcome(bem-vindo) aceita embed!\nNão sabe fazer uma? é facil clique aqui: **[[CLIQUE]](https://leovoel.github.io/embed-visualizer/)**\n**[Utilize ${guildDocument.prefix}embed para mais informações]**\n**Lembre-se se ver os \`Parâmetros\` abaixo para não errar nada!**`,
                    },
                    {
                      name: `Parâmetros`,
                      value: `**{USER}** - Para marcar o membro na entrada.\n**{CONTA-CRIADA}** - Para saber a data de criação da conta do membro\n**{AVATAR}** - Para definir o avatar do membro.\n**{USER-ID}** - Para definir o **ID** do membro.\n**{USER-NAME}** - Para definir o nome do membro.`,
                    }
                  ),
              ],
            });
            break;
          case `categoria_moderação`:
            m.edit({
              embeds: [
                new MessageEmbed()
                  .setAuthor(
                    this.client.user.tag,
                    this.client.user.displayAvatarURL({
                      dynamic: true,
                      size: 1024,
                    })
                  )
                  .setDescription(
                    `Dúvidas de como esta o welcome?\nAqui vai o seu painel...`
                  )
                  .addFields(
                    {
                      name: `Welcome | Canal`,
                      value: `${canalBemVindo}`,
                    },
                    {
                      name: `Welcome | Auto-Role:`,
                      value: `${MsgAt}`,
                    },
                    {
                      name: `Welcome | Mensagem de Bem-vindo:`,
                      value: `${MsgCount}`,
                    },
                    {
                      name: `Welcome está:`,
                      value: `${msgWelcome}`,
                    }
                  )

                  .setColor(colors['lightgreen']),
              ],
            });

            break;
          case `fechar`:
            setTimeout(() => m.delete(), 100);
        }
      });
    }
  }
};