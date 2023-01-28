const db = require('quick.db');

module.exports = {
  comando: "set-suggest", 
  comandos: ["suggest-set", "suggestset", "setsuggest", "set-sugerencias", "sugerencias-set", "setsugerencias", "sugerenciasset"], 

    execute (client, message, args, Util) {

      if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tienes permisos para establecer el canal de sugerencias.`);

      if(!message.member.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tengo suficientes permisos para establecer el canal de sugerencias.`);

        const suggest = args[0]

        if(!suggest) return message.reply(`❌ | Tienes que proporcionar la ID de un canal.`)

        if(isNaN(parseInt(args[0]))) return message.reply(`❌ | Debes proporcionar una ID de canal para establecer el bot de sugerencias en el.`)

        const sugerenciascanal = db.fetch(`sugerenciascanal_${message.guild.id}`)

        if(sugerenciascanal !== null) return message.reply(`❌ | El mensaje de sugerencias ya esta establecido en un canal. Canal actual <#${sugerenciascanal}>. Remueve al bot del canal para establecer en otro.`)
        else if(sugerenciascanal === null) {
            message.reply(`✔️ | Mensaje de sugerencias establecido en <#${suggest}>`)
            db.set(`sugerenciascanal_${message.guild.id}`, suggest)
            
  }

 }
 
}