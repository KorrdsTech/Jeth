const { ShardingManager } = require('discord.js');
require('dotenv').config();

const manager = new ShardingManager('./src/JethClient.js', {
  token: process.env.TOKEN,
  totalShards: 'auto',
});

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} iniciada!`));
manager.spawn();
