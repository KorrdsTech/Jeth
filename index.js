const { ShardingManager } = require('discord.js')
const { totalShards } = require('./config')
const shard = new ShardingManager('./src/JethLauncher.js', { totalShards })
shard.spawn()