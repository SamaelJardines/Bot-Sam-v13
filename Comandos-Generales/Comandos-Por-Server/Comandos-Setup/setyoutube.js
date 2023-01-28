const db = require('quick.db');

module.exports = {
  comando: "set-youtube", 
  comandos: ["youtube-set", "youtubeset", "setyoutube"], 

    execute (client, message, args, Util) {

      if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tienes permisos para establecer el canal de youtube.`);

      if(!message.member.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tengo suficientes permisos para establecer el canal de youtube.`);

        const youtube = args[0]

        if(!youtube) return message.reply(`❌ | Tienes que proporcionar la ID de un canal.`)

        if(isNaN(parseInt(args[0]))) return message.reply(`❌ | Debes proporcionar una ID de canal para establecer las notificaiones de youtube en el.`)

        const youtubecanal = db.fetch(`youtubecanal_${message.guild.id}`)

        if(youtubecanal !== null) return message.reply(`❌ | El mensaje de youtube ya esta establecido en un canal. Canal actual <#${youtubecanal}>. Remueve al bot del canal para establecer en otro.`)
        else if(youtubecanal === null) {
            message.reply(`✔️ | Notificaciones de youtube establecido en <#${youtube}>`)
            db.set(`youtubecanal_${message.guild.id}`, youtube)
            
  }

 }
 
}