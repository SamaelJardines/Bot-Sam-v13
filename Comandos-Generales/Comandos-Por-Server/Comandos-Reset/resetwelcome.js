const db = require('quick.db');

module.exports = {
  comando: "resetwelcome", 
  comandos: ["welcomereset", "reset-welcome", "welcome-reset", "reset-bienvenidas", "bienvenidas-reset", "resetbienvenidas", "bienvenidasreset"], 

    execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tienes permisos para remover al bot del canal de bienvenidas.`);
      
      if(!message.member.guild.me.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tengo suficientes permisos para remover al bot del canal de bienvenidas.`);

        const bienvenidascanal = db.fetch(`bienvenidascanal_${message.guild.id}`);
        
        if(bienvenidascanal === null) return message.reply(`❌ | El Bot no esta establecido en ningun canal.`);
        else if(bienvenidascanal !== null) { 
            message.reply(`✔️ | Bot removido del canal.`)
            db.delete(`bienvenidascanal_${message.guild.id}`)
            
  }

 }
 
}