const { MessageEmbed } = require('discord.js');
const { getChannelVideos } = require("yt-channel-info");
const db = require("quick.db");

const ID = "UCfyF_Lonn0o4-joSgg44lAw"
const canal = "941878640369623071"

module.exports = {
  comando: "ready", 
  once: true,

    async execute (client) {

    let latestVideo = await db.get("latestVideo")
    let channel = await client.channels.fetch(canal, true, true)

    setInterval(async function() {
      
      let response = await getChannelVideos(ID, 0)
      latestVideo = await db.get("latestVideo")
      if(response.items[0].videoId == latestVideo) return console.log("No se encontro nuevo video.")
      db.set("latestVideo", response.items[0].videoId)
      let data = response.items[0]
      
      return channel.send({content: `Hey @everyone, **${response.items[0].author}** subio nuevo video con duración de ${response.items[0].durationText}\nhttps://www.youtube.com/watch?v=${response.items[0].videoId}`})
    }, 120000)
        
  }

}