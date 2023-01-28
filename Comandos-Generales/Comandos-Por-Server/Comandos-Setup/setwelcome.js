const db = require('quick.db');

module.exports = {
  comando: "set-welcome", 
  comandos: ["welcome-set", "welcomeset", "setwelcome", "set-bienvenida", "bienvenida-set", "setbienvenida", "bienvenidaset"], 

    execute (client, message, args, Util) {

      if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tienes permisos para establecer el canal de bienvenida.`);

      if(!message.member.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tengo suficientes permisos para establecer el canal de bienvenida.`);

        const welcome = args[0]

        if(!welcome) return message.reply(`❌ | Tienes que proporcionar la ID de un canal.`)

        if(isNaN(parseInt(args[0]))) return message.reply(`❌ | Debes proporcionar una ID de canal para establecer el mensaje de bienvenidas en el.`)

        const bienvenidascanal = db.fetch(`bienvenidascanal_${message.guild.id}`)

        if(bienvenidascanal !== null) return message.reply(`❌ | El mensaje de bienvenida ya esta establecido en un canal. Canal actual <#${bienvenidascanal}>. Remueve al bot del canal para establecer en otro.`)
        else if(bienvenidascanal === null) {
            message.reply(`✔️ | Mensaje de bienvenida establecido en <#${welcome}>`)
            db.set(`bienvenidascanal_${message.guild.id}`, welcome)
            
  }

 }
 
}