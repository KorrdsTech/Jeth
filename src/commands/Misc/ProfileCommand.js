const { Command } = require('../../utils')
const { MessageAttachment } = require('discord.js')
const { loadImage, registerFont, createCanvas } = require('canvas');
registerFont('src/assets/fonts/Minecraft.ttf', {
  family: 'Minecraft',
});
registerFont('src/assets/fonts/Sugar Snow.ttf', {
  family: 'Sugar Snow',
});
registerFont('src/assets/fonts/my-standard.ttf', {
  family: 'my-standard',
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
    const jeth = this.client.guilds.cache.get('1001368891160805506')
    const pUser = message.guild.members.cache.get(args[0]?.replace(/[<@!>]/g, '') || message.author.id)
    const documento = await this.client.database.guild.getOrCreate(message.guild.id)
    const doc = await this.client.database.user.getOrCreate(pUser)
    const prefix = documento.prefix
    const USER =
            this.client.users.cache.get(args[0]) ||
            message.mentions.users.first() ||
            message.author;

    const user = await this.client.database.user.getOrCreate({ _id: USER.id });
    const canvas = createCanvas(900, 600);
    const ctx = canvas.getContext('2d');
    const member1 = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    if (!member1) return message.reply('Algum erro terrível aconteceu, entre em contato com o suporte via /bug')
    const user1 = await this.client.database.user.getOrCreate(member1.id)

        //========================// Import Avatar //========================//

    const avatar = await loadImage(
      USER.displayAvatarURL({ format: 'jpeg', size: 2048 })
    );
    ctx.drawImage(avatar, 20, 100, 220, 320);

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
    ctx.font = '30px "Minecraft"';
    ctx.fillStyle = 'rgb(253, 255, 252)';
    ctx, this.shorten(USER.username, 30), 290, 270;
    await Utils.renderEmoji(ctx, this.shorten(USER.username, 30), 315, 240);
        // Badges

    let list = [];

    const member = message.guild.members.cache.get(USER.id)
    if (process.env.OWNERS?.includes(message.author.id)) list.push('CREATOR');
    if (message.guild.owner?.id === USER.id) list.push('SERVER_OWNER');
    if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1038349301274923018')) list.push('STAFF');
    if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1041559731619233804')) list.push('TRUST_SAFETY');
    if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1001368891240480778')) list.push('JETH_PARTNER');
    if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1050932461049221210')) list.push('DEV');
    if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1001368891227914268')) list.push('BUG_HUNTER');
    if (member && member.premiumSinceTimestamp) list.push('BOOSTER');
    if (user.vip === true) list.push('VIP');
    if (user.isMarried) list.push('CASADO');
    if (jeth.members.cache.get(pUser.user.id)?.roles?.cache?.has('1038339614072655882')) list.push('PATREON');

    const mapper = {

      TRUST_SAFETY: '<:IconCrown:1030872512847945798>',
      SERVER_OWNER: '<:IconCrown:1030872512847945798>',
      CREATOR: '<:ThisUserIsCEO:938280523585957978>',
      HOUSE_BRAVERY: '<:HeroHypeRenwil:1052599369750290484>',
      HOUSE_BRILLIANCE: '<:HeroHypeUrdim:1030872161902137459>',
      HOUSE_BALANCE: '<:HeroHypeArame:1030872158940975284>',
      DEV: '<a:activedeveloperbadgeanimated:1052605173299683411>',
      BOOSTER: '<:BadgeNitroBoosting_1Month:1030872129731829790>',
      BUG_HUNTER: '<:BadgeDiscordBugHunterGold:1030872109070680084>',
      PATREON: '<a:gift4patreon:1057797332881641503>',
      JETH_PARTNER: '<:ThisUserIsJethPartner:938282680028651600>',
      STAFF: '<:BadgeDiscordStaff:1030872112841367614>',

    }

    USER.flags.toArray().map(flag => { list.push(mapper[flag] ?? '') } )
    list = list

      .join(',')

      .replace('CREATOR', '<:ThisUserIsCEO:938280523585957978>')
      .replace('SERVER_OWNER', '<:IconCrown:1030872512847945798>')
      .replace('HOUSE_BRAVERY', '<:HeroHypeRenwil:1052599369750290484>')
      .replace('HOUSE_BRILLIANCE', '<:HeroHypeUrdim:1030872161902137459>')
      .replace('HOUSE_BALANCE', '<:HeroHypeArame:1030872158940975284>')
      .replace('DEV', '<a:activedeveloperbadgeanimated:1052605173299683411>')
      .replace('VIP', '<:Star:1047262776625725460>')
      .replace('BOOSTER', '<:BadgeNitroBoosting_1Month:1030872129731829790>')
      .replace('CASADO', '💍')
      .replace('BUG_HUNTER', '<:BadgeDiscordBugHunterGold:1030872109070680084>')
      .replace('JETH_PARTNER', '<:ThisUserIsJethPartner:938282680028651600>')
      .replace('TRUST_SAFETY', '<:Certified_Moderator:1047259863148941373>')
      .replace('PATREON', '<a:gift4patreon:1057797332881641503>')
      .replace('STAFF', '<:BadgeDiscordStaff:1030872112841367614>')

    ctx.font = `30px "Minecraft"`;

    await Utils.renderEmoji(ctx, list.split(',').join(' '), 35, 55)

        // Titles

    ctx.textAlign = 'left';
    ctx.font = '30px "Minecraft"';
    ctx.fillStyle = 'rgb(253, 255, 252)';
    ctx.fillText('Coins:', 315, 342);
    ctx.fillText('XP:', 315, 395);
    ctx.textAlign = 'center';
    ctx.font = '20px "Minecraft"';
    if (user.isMarried) {
      ctx.font = '20px "Minecraft"';
      ctx.fillStyle = 'rgb(253, 255, 252)';
      ctx.fillText('Casado(a) com:', 350, 480);
      ctx.font = '15px "Minecraft"';
      ctx.fillText(
        await this.client.users.fetch(user.userMarried).then((x) => x.tag),
        350,
        500
      );
    }

        // Reps
    ctx.textAlign = 'right';
    ctx.font = '40px "Minecraft"';
    ctx.fillStyle = 'rgb(253, 255, 252)';
    ctx.fillText(`${user1.rep}`, 220, 515);

        // Coins/XP
    ctx.textAlign = 'left';
    ctx.font = '30px "my-standard"';
    ctx.fillStyle = 'rgb(253, 255, 252)';
    ctx.fillText(`${user.coins}`, 415, 342);
    ctx.fillText(
      `#${user.level} | ${user.xp}/${(
        user.nextLevel
      )}`,
      280,
      442
    );

        // Sobre

    ctx.font = '20px "my-standard"';
    ctx.fillText(
      user.about == 'null'
        ? `Use ${prefix}sobremim para alterar essa mensagem`
        : user.about.match(/.{1,25}/g).join('\n'),
      480,
      365
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