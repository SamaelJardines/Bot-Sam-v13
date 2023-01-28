const db = require('quick.db');

module.exports = {
  comando: "resetleave", 
  comandos: ["leavereset", "reset-leave", "leave-reset", "reset-despedidas", "despedidas-reset", "resetdespedidas", "despedidasreset"], 

    execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tienes permisos para remover al bot del canal de despedidas.`);
      
      if(!message.member.guild.me.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tengo suficientes permisos para remover al bot del canal de despedidas.`);

        const despedidascanal = db.fetch(`despedidascanal_${message.guild.id}`);
        
        if(despedidascanal === null) return message.reply(`❌ | El Bot no esta establecido en ningun canal.`);
        else if(despedidascanal !== null) { 
            message.reply(`✔️ | Bot removido del canal.`)
            db.delete(`despedidascanal_${message.guild.id}`)

  }

 }
 
}