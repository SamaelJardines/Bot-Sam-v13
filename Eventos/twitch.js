const { MessageEmbed } = require('discord.js');
const fetch = require("node-superfetch");
const db = require("quick.db");

const user = "elchok19"
const canal = "941878640369623071"

module.exports = {
  comando: "ready", 
  once: true,

    async execute (client) {
    
    setInterval(async function() {

      const uptime = await fetch.get(`https://decapi.me/twitch/uptime/${user}`)
      const avatar = await fetch.get(`https://decapi.me/twitch/avatar/${user}`)
      const viewers = await fetch.get(`https://decapi.me/twitch/viewercount/${user}`)
      const title = await fetch.get(`https://decapi.me/twitch/title/${user}`)
      const game = await fetch.get(`https://decapi.me/twitch/game/${user}`)

         let latestDirecto = await db.get("latestDirecto")
         let channel = await client.channels.fetch(canal, true, true)

         if(latestDirecto == title.body) return console.log("No se encontro nuevo directo.")

         if(uptime.body !== `${user} esta desconectado`) {

           const embed = new MessageEmbed()
           .setAuthor({ "name": `${user}`, "iconURL": `${avatar.body}` })
           .setTitle(`${title.body}`)
           .setThumbnail(`${avatar.body}`)
           .setURL(`https://www.twitch.tv/${user}`)
           .addField("**Juego**", `${game.body}`, true)
           .addField("**Espectadores**", `${viewers.body}`, true)
           .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-620x378.jpg`)
           .setColor("#6441A4")

           await channel.send({ content: `Hey @everyone, **${user}** esta en directo. Ve a verlo\nhttps://www.twitch.tv/${user}`, embeds: [embed] })

           db.set("latestDirecto", `${title.body}`)
      }
        
    }, 120000)

  }

}