const db = require('quick.db');

module.exports = {
  comando: "set-leave", 
  comandos: ["leave-set", "leaveset", "setleave", "set-despedidas", "despedidas-set", "setdespedidas", "despedidasset"], 

    execute (client, message, args, Util) {

      if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tienes permisos para establecer el canal de despedidas.`);

      if(!message.member.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tengo suficientes permisos para establecer el canal de despedidas.`);

        const leave = args[0]

        if(!leave) return message.reply(`❌ | Tienes que proporcionar la ID de un canal.`)

        if(isNaN(parseInt(args[0]))) return message.reply(`❌ | Debes proporcionar una ID de canal para establecer el mensaje de despedidas en el.`)

        const despedidascanal = db.fetch(`despedidascanal_${message.guild.id}`)

        if(despedidascanal !== null) return message.reply(`❌ | El mensaje de despedidas ya esta establecido en un canal. Canal actual <#${despedidascanal}>. Remueve al bot del canal para establecer en otro.`)
        else if(despedidascanal === null) {
            message.reply(`✔️ | Mensaje de despedidas establecido en <#${leave}>`)
            db.set(`despedidascanal_${message.guild.id}`, leave)
            
   }

 }
 
}