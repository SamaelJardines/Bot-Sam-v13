const db = require('quick.db');

module.exports = {
  comando: "resetmessagesdelete", 
  comandos: ["messagesdeletereset", "reset-messagesdelete", "messagesdelete-reset", "reset-mensajesborrados", "mensajesborrados-reset", "resetmensajesborrados", "mensajesborradosreset"], 

    execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tienes permisos para remover al bot del canal mensajes borrados.`);
      
      if(!message.member.guild.me.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tengo suficientes permisos para remover al bot del canal mensajes borrados.`);

        const mensajesborradoscanal = db.fetch(`mensajesborradoscanal_${message.guild.id}`);
        
        if(mensajesborradoscanal === null) return message.reply(`❌ | El Bot no esta establecido en ningun canal.`);
        else if(mensajesborradoscanal !== null) { 
            message.reply(`✔️ | Bot removido del canal.`)
            db.delete(`mensajesborradoscanal_${message.guild.id}`)
            
  }

 }
 
}