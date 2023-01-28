module.exports = {
  comando: "ready", 
  once: true,

execute (client) {
    console.log('Ready.')
    
    setInterval(() => {
        const statuses = [
            `Configurando`,
        ]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: "STREAMING", url: "https://www.twitch.tv/xsammd"}) // Can Be WATCHING, STREAMING, LISTENING

        })
        
  }

}