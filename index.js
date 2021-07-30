require('dotenv').config()

const JethCanary = require('./JethCanary')
const client = new JethCanary({ fetchAllMembers: false })
const TopGG = require("dblapi.js")
const top = new TopGG(process.env.TOPGG, client)
top.on("error", (err) => console.log(err))
top.on("posted", () => console.log("Contador de servidores públicado!"))
client.login(process.env.TOKEN)
.then(() => {
    console.log('Online!')
    console.log(process.memoryUsage().rss /512 / 512)
})
.catch(err => {
    console.log(`Falha ao iniciar o bot :::: ${err}`)
})