const Client = require('./JethClient')
const { options } = require('../config')
const client = new Client(options)
client.start(process.env.TOKEN)