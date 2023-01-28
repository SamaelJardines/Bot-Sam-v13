const db = require('quick.db');

module.exports = {
  comando: "reset-prefix", 
  comandos: ["prefix-reset", "resetprefix", "prefixreset"], 

    execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tienes permisos para reiniciar el prefix.`);
      
      if(!message.member.guild.me.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tengo suficientes permisos para reiniciar el prefix.`);
        
        const { def_prefix } = require('../../../config.json');

        const prefix = db.fetch(`prefix_${message.guild.id}`);
        
        if(prefix === def_prefix) return message.reply(`❌ | El prefix nunca se ha cambiado, sigue el default.`);
        else if(prefix !== null) {
            message.reply(`✔️ | Prefix reiniciado a "${def_prefix}"`)
            db.delete(`prefix_${message.guild.id}`, def_prefix)
            
  }

 }
 
}