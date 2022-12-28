
const { createCanvas } = require('canvas');
const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');

module.exports = async (ctx, message, x, y) => {
  const canvas = createCanvas(200, 200);
  const context = canvas.getContext('2d');

  context.fillStyle = '#000000';
  context.font = '30px Arial';
  await fillTextWithTwemoji(ctx, message, x, y);
}

