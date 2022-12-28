const abbrev = require('./plugins/abbrev.js');
const renderEmoji = require('./plugins/renderEmoji.js');
const convertAbbrev = require('./plugins/convertAbbrev');

class Util {
  async toAbbrev(num) {
    return abbrev(num);
  }

  async renderEmoji(ctx, msg, x, y) {
    return renderEmoji(ctx, msg, x, y);
  }

  async notAbbrev(num) {
    return convertAbbrev(num);
  }
}

module.exports = Util;