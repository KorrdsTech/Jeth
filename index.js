const { ShardingManager } = require('discord.js')
require('dotenv').config()
const shard = new ShardingManager('./src/JethLauncher.js', { totalShards: parseInt(process.env.TOTAL_SHARDS) ?? 1, respawn: true })

shard.spawn()