const db = require('quick.db');

module.exports = {
  comando: "resetsuggest", 
  comandos: ["suggestreset", "reset-suggest", "suggest-reset", "reset-sugerencias", "sugerencias-reset", "resetsugerencias", "sugerenciasreset"], 

    execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tienes permisos para remover al bot del canal de sugerencias.`);
      
      if(!message.member.guild.me.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tengo suficientes permisos para remover al bot del canal de sugerencias.`);

        const sugerenciascanal = db.fetch(`sugerenciascanal_${message.guild.id}`);
        
        if(sugerenciascanal === null) return message.reply(`❌ | El Bot no esta establecido en ningun canal.`);
        else if(sugerenciascanal !== null) { 
            message.reply(`✔️ | Bot removido del canal.`)
            db.delete(`sugerenciascanal_${message.guild.id}`)
            
  }

 }
 
}