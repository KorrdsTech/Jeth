const JethClient = require('./JethClient')
const client = new JethClient({ intents: 13935 })
const TopGG = require('dblapi.js')
const top = new TopGG(process.env.TOPGG, client)
top.on('error', (err) => console.log(err.name))
top.on('posted', () => console.log('Contador de servidores públicado!'))
client.login(process.env.TOKEN)
  .then(() => {
    console.log('Online!')
    console.log(process.memoryUsage().rss / 512 / 512)
  })
  .catch(err => {
    console.log(`Falha ao iniciar o bot :::: ${err}`)
  })