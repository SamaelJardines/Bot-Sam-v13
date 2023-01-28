const db = require('quick.db');

module.exports = {
  comando: "resetrulesid", 
  comandos: ["rulesidreset", "reset-rulesid", "rulesid-reset", "resetreglasid", "reglasidreset", "reset-reglasid", "reglasid-reset"], 

    execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tienes permisos para borrar la ID del canal de reglas.`);
      
      if(!message.member.guild.me.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tengo suficientes permisos para borrar la ID del canal de reglas.`);

        const reglasid = db.fetch(`reglasid_${message.guild.id}`);
        
        if(reglasid === null) return message.reply(`❌ | El Bot no tiene ninguna ID guardada.`);
        else if(reglasid !== null) { 
            message.reply(`✔️ | ID borrada correctamente.`)
            db.delete(`reglasid_${message.guild.id}`)

  }

 }
 
}