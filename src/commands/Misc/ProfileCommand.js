const { Command } = require('../../utils')
const { MessageAttachment } = require('discord.js')
const { loadImage, registerFont, createCanvas } = require('canvas');
registerFont('src/assets/fonts/Montserrat-Black.ttf', { family: 'Montserrat' });
registerFont('src/assets/fonts/Segoe Print.ttf', { family: 'Segoe Print' });
registerFont('src/assets/fonts/Segoe UI.ttf', { family: 'Segoe UI' });
registerFont('src/assets/fonts/Segoe UI Black.ttf', {
  family: 'Segoe UI Black',
});
const util = require('../../utils/Util')

const Utils = new util();
module.exports = class Profile extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'profile'
    this.aliases = ['profile', 'userprofile', 'perfil']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const documento = await this.client.database.guild.getOrCreate(message.guild.id)
    const prefix = documento.prefix
    const USER =
            this.client.users.cache.get(args[0]) ||
            message.mentions.users.first() ||
            message.author;

    const user = await this.client.database.user.getOrCreate({ _id: USER.id });
    const canvas = createCanvas(900, 600);
    const ctx = canvas.getContext('2d');

        //========================// Import Avatar //========================//

    const avatar = await loadImage(
      USER.displayAvatarURL({ format: 'jpeg', size: 2048 })
    );
    ctx.drawImage(avatar, 20, 90, 195, 180);

        //========================// Import Background //========================//

    const bg = user.backgroundsActive;

    const backgrounds = {
      one: {
        id: 1,
        background: './src/assets/img/png/Profile_Card_Green.png',
      },
      two: {
        id: 2,
        background: './src/assets/img/png/Profile_Card_Purple.png',
      },
      three: {
        id: 3,
        background: './src/assets/img/png/Profile_Card_Different.png',
      },
    };

    let back_img = '';
    if (bg === 0) back_img = './src/assets/img/png/Profile_Card.png';
    else {
      back_img = Object.entries(backgrounds).find(([, x]) => x.id === bg)[1]
        .background;
    }

    const back = await loadImage(back_img);
    ctx.drawImage(back, 0, 0, 900, 600);

        //========================// Texts //========================//

        // Username

    ctx.textAlign = 'left';
    ctx.font = '50px "Segoe UI Black"';
    ctx.fillStyle = 'rgb(253, 255, 252)';
    ctx, this.shorten(USER.username, 20), 230, 190;
    await Utils.renderEmoji(ctx, this.shorten(USER.username, 20), 230, 190);
        // Badges

    let list = [];

    const member = message.guild.members.cache.get(USER.id)
    if (member && member.premiumSinceTimestamp) list.push('BOOSTER')
    if (user.isMarried) list.push('CASADO');
    if (USER.id === process.env.OWNERS) list.push('DONO');
    if (message.guild.owner?.id === USER.id) list.push('SERVER_OWNER');
    if (user.vip === true) list.push('VIP');
    const mapper = {

      HOUSE_BRAVERY: '<:Bravery:938280523153965097>',
      HOUSE_BRILLIANCE: '<:Brilliance:938280523426578533>',
      HOUSE_BALANCE: '<:Balance:938280523409817600>',
      EARLY_VERIFIED_BOT_DEVELOPER: '<:ThisUserIsJethDev:939896774267654264>',
      BOOSTER: '<:BadgeServerBoostLevel3:1030872148153225266>',
      SERVER_OWNER: '<:owner:931333021557227540>'
    }

    USER.flags.toArray().map(flag => { list.push(mapper[flag] ?? 'Sem flag') } )
    list = list

      .join(',')

      .replace('EARLY_VERIFIED_BOT_DEVELOPER', '<:ThisUserIsJethDev:939896774267654264>')
      .replace('HOUSE_BRAVERY', '<:Bravery:938280523153965097>')
      .replace('HOUSE_BRILLIANCE', '<:Brilliance:938280523426578533>')
      .replace('HOUSE_BALANCE', '<:Balance:938280523409817600>')
      .replace('BOOSTER', '<:BadgeServerBoostLevel3:1030872148153225266>')
      .replace('CASADO', '💍')
      .replace('DONO', '<:ThisUserIsCEO:938280523585957978>')
      .replace('SERVER_OWNER', '<:owner:931333021557227540>')
      .replace('VIP', '<:ThisUserIsVIP:938280523468509245>');

    ctx.font = `30px "Segoe Print"`;

    await Utils.renderEmoji(ctx, list.split(',').join(' '), 230, 240);

        // Titles

    ctx.textAlign = 'left';
    ctx.font = '30px "Segoe UI Black"';
    ctx.fillStyle = 'rgb(253, 255, 252)';
    ctx.fillText('Coins', 600, 90);
    ctx.fillText('XP', 600, 155);
    ctx.textAlign = 'center';
    ctx.font = '20px "Segoe UI Black"';
    if (user.isMarried) {
      ctx.font = '30px "Segoe UI Black"';
      ctx.fillStyle = 'rgb(253, 255, 252)';
      ctx.fillText('Casado(a) com:', 710, 220);
      ctx.font = '20px "Segoe UI Black"';
      ctx.fillText(
        await this.client.users.fetch(user.userMarried).then((x) => x.tag),
        710,
        250
      );
    }
        // Coins/XP
    ctx.textAlign = 'left';
    ctx.font = '30px "Segoe UI"';
    ctx.fillStyle = 'rgb(253, 255, 252)';
    ctx.fillText(`${user.coins}`, 600, 120);
    ctx.fillText(
      `#${user.level} | ${user.xp}/${(
        user.nextLevel
      )}`,
      600,
      185
    );

        // Sobre

    ctx.font = '20px "Montserrat"';
    ctx.fillText(
      user.about == 'null'
        ? `Use ${prefix}sobremim <msg> para alterar essa mensagem`
        : user.about.match(/.{1,50}/g).join('\n'),
      160,
      350
    );

        //========================// Create Image //========================//

    const attach = new MessageAttachment(
      canvas.toBuffer(),`Profile_${USER.tag}_.png`
    );

    message.reply({ files: [attach] });
  }

  shorten(text, len) {
    if (typeof text !== 'string') return '';
    if (text.length <= len) return text;
    return text.substr(0, len).trim() + '...';
  }
};