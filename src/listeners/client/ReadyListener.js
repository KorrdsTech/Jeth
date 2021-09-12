module.exports = {
  name: 'ready',
  exec: (client) => {
    console.log(`Logado.`)
    const status = [
      { name: `🥂 ${require('../../../package.json').version} está disponível!`, type: 'PLAYING' },
      { name: `🏆 Anda perdido? Me mencione!`, type: 'PLAYING' },
      { name: `🔑 Entre em contato para reportar qualquer bug encontrado.`, type: 'PLAYING' },
      { name: `⚜️ Lançamento do novo sistema VIP!`, type: 'LISTENING' },
      { name: `♨️ Os melhores programadores da geração!`, type: 'WATCHING' },
      { name: `📣 Uma changelog vasta de atualizações!`, type: 'LISTENING' },
      { name: `🎍 Desfrute de uma moderação a nível superior!`, type: 'PLAYING' },
      { name: `👩‍🚀 Mais comandos legais para você!`, type: 'PLAYING' }
    ];

    setInterval(() => {
      const activity = status[Math.floor(Math.random() * status.length)]
      client.user.setPresence({ activities: [activity] })
    }, 10000)
  }
}