const { Command } = require('../../utils');
const modelVip = require('../../utils/database/collections/Vip');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = class VipConfigCommand extends Command {
  constructor(name, client) {
    super(name, client);
    this.name = 'vipconfig';
    this.aliases = ['vc', 'vipconfig', 'premiumconfig'];
    this.category = 'VIP';
    this.permissions = ['MANAGE_GUILD'];
  }

  async run(message, args) {
    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id);

    const mentionedUser = getUserFromMention(message, args[1]);

    const row = createButtonRow();

    const dashboard = createDashboardEmbed(message ,message.guild.name, this.client.user, guildDocument);

    message.reply({ embeds: [dashboard], components: [row] });

    const collector = message.channel.createMessageComponentCollector({
      componentType: 'BUTTON',
      time: 60000,
    });

    collector.on('collect', async (interaction) => {
      if (interaction.user.id !== message.author.id) {
        return interaction.reply(`<:dot:1040807881248882688> » ${interaction.user}, você não pode acessar o dashboard, pois não foi você que abriu.`);
      }

      switch (interaction.customId) {
        case 'c':
          await handleCadastrar(interaction, message, args[0], this.client);
          break;

        case 'rc':
          await handleRemoverCadastro(interaction, message, args[0], this.client);
          break;

        case 'mv':
          await handleMembrosVips(interaction, message, this.client);
          break;
      }
    });
  }
};

function getUserFromMention(message, mention) {
  if (!mention) return;
  if (mention.startsWith('<@') && mention.endsWith('>')) {
    mention = mention.slice(2, -1);
    if (mention.startsWith('!')) {
      mention = mention.slice(1);
    }
    return message.guild.members.cache.get(mention);
  }
}

function createButtonRow() {
  return new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId('c')
      .setEmoji('<:newmemberbadge:967660459878666331>')
      .setLabel('Cadastrar')
      .setStyle('SUCCESS')
      .setDisabled(false),

    new MessageButton()
      .setCustomId('rc')
      .setEmoji('<:ModMute:980288914914947113>')
      .setLabel('RewCadastro')
      .setStyle('DANGER')
      .setDisabled(false),

    new MessageButton()
      .setCustomId('mv')
      .setEmoji('📋')
      .setLabel('Membros Vips')
      .setStyle('PRIMARY')
      .setDisabled(false)
  );
}

function createDashboardEmbed(message, guildName, clientUser, guildDocument) {
  return new MessageEmbed()
    .setAuthor({ name: guildName, iconURL: clientUser.avatarURL({ dynamic: true, size: 1024 })})
    .setDescription('<:dot:1040807881248882688> » Sistema para setar usuário como vip no servidor.')
    .addFields([{ name: 'Comandos do Sistema', value: '> **Cadastrar** » Cadastra o usuário como vip no servidor.\n> **RewCadastro** » Remove o cadastro vip do usuário.\n> **Membros Vips** » Possibilita ver membros que têm vip no seu servidor. [BETA]' }])
    .setFooter({ text: `${message.author.username}, você possui 1 minuto para interagir.`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
    .setThumbnail('https://media.discordapp.net/attachments/957238449558155304/962048623284215828/config.png?width=410&height=410')
    .setColor(guildDocument.color_embed)
    .setTimestamp();
}

async function handleCadastrar(interaction, message, arg, client) {
  await interaction.reply(`<:dot:1040807881248882688> » Mencione o usuário que você deseja fazer o cadastro vip.`, { ephemeral: true });
  const collectedMessages = await message.channel.awaitMessages({
    filter: (m) => m.author.id === message.author.id,
    time: 90000,
    errors: ['time'],
    max: 1,
  });

  const mentionedUser = getUserFromMention(message, collectedMessages.first().content);
  if (!mentionedUser) {
    return message.reply(`<:dot:1040807881248882688> » Mencione um usuário válido.`);
  }
  if (mentionedUser.id === client.user.id) {
    return message.reply(`<:dot:1040807881248882688> » Eu não posso ter vip.`);
  }

  let documentVip = await modelVip.findOne({
    guildID: message.guild.id,
    userID: mentionedUser.id,
  }).catch((err) => console.log(err));

  if (!documentVip) {
    documentVip = new modelVip({
      guildID: message.guild.id,
      userID: mentionedUser.id,
      vip: true,
    });

    await documentVip.save();
    const msg = await message.reply(`<:dot:1040807881248882688> » Estou setando o usuário como vip no banco de dados.`);
    setTimeout(() => {
      msg.edit({ content: `<:dot:1040807881248882688> » O usuário foi setado como vip com sucesso.` });
    }, 5000);
  } else {
    if (documentVip.vip) {
      return message.reply(`<:dot:1040807881248882688> » Esse usuário já é vip neste servidor.`);
    }
  }
}

async function handleRemoverCadastro(interaction, message, arg, client) {
  await interaction.reply(`<:dot:1040807881248882688> » Mencione o usuário que você deseja remover o cadastro vip.`, { ephemeral: true });
  const collectedMessages = await message.channel.awaitMessages({
    filter: (m) => m.author.id === message.author.id,
    time: 90000,
    errors: ['time'],
    max: 1,
  });

  const mentionedUser = getUserFromMention(message, collectedMessages.first().content);
  if (!mentionedUser) {
    return message.reply(`<:dot:1040807881248882688> » Mencione um usuário válido.`);
  }
  if (mentionedUser.id === client.user.id) {
    return message.reply(`<:dot:1040807881248882688>} » Eu não possuo vip.`);
  }

  const documentVip = await modelVip.findOne({
    guildID: message.guild.id,
    userID: mentionedUser.id,
  }).catch((err) => console.log(err));

  if (!documentVip) {
    return message.reply(`<:dot:1040807881248882688> » Esse usuário não possui vip neste servidor.`);
  }

  await documentVip.delete();
  const msg = await message.reply(`<:dot:1040807881248882688> » Estou removendo o usuário como vip no banco de dados.`);
  setTimeout(() => {
    msg.edit({ content: `<:dot:1040807881248882688> » O usuário foi removido como vip do servidor com sucesso.` });
  }, 5000);
}

async function handleMembrosVips(interaction, message, client) {
  const documentVip2 = modelVip.findOne({
    guildID: interaction.guild.id,
  }).catch((err) => console.log(err));

  if (!documentVip2) {
    return interaction.reply(`Seu servidor não possui nenhum membro cadastrado`, { ephemeral: true });
  }

  const userDoc = await client.database.user.model.find({ vip: true });
  const msg = [];

  const guild = client.guilds.cache.get(message.guild.id);
  for (let i = 0; i < userDoc.length; i++) {
    if (!guild.members.cache.get(userDoc[i]._id)) continue;
    const user = await client.users.fetch(userDoc[i]._id);
    msg.push(`${user.tag} - ${user.id}`);
  }

  return interaction.reply(msg.join('\n'));
}
