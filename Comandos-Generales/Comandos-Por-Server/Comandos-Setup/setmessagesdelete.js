const db = require('quick.db');

module.exports = {
  comando: "set-messagesdelete", 
  comandos: ["messagesdelete-set", "messagesdeleteset", "setmessagesdelete", "set-mensajesborrados", "mensajesborrados-set", "setmensajesborrados", "mensajesborradosset"], 

    execute (client, message, args, Util) {

      if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tienes permisos para establecer el canal de mensajes borrados.`);

      if(!message.member.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tengo suficientes permisos para establecer el canal de mensajes borrados.`);

        const messagesdelete = args[0]

        if(!messagesdelete) return message.reply(`❌ | Tienes que proporcionar la ID de un canal.`)

        if(isNaN(parseInt(args[0]))) return message.reply(`❌ | Debes proporcionar una ID de canal para establecer el registro de mensajes borrados en el.`)

        const mensajesborradosescanal = db.fetch(`mensajesborradoscanal_${message.guild.id}`)

        if(mensajesborradosescanal !== null) return message.reply(`❌ | El registro de mensajes borrados ya esta establecido en un canal. Canal actual <#${mensajesborradosescanal}>. Remueve al bot del canal para establecer en otro.`)
        else if(mensajesborradosescanal === null) {
            message.reply(`✔️ | Registro de mensajes borrados establecido en <#${messagesdelete}>`)
            db.set(`mensajesborradoscanal_${message.guild.id}`, messagesdelete)
            
  }

 }
 
}