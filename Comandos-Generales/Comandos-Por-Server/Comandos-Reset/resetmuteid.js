const db = require('quick.db');

module.exports = {
  comando: "resetmuteid", 
  comandos: ["muteidreset", "reset-muteid", "muteid-reset", "resetsilencioid", "silencioidreset", "reset-silencioid", "silencioid-reset"],

    execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tienes permisos para borrar la ID del rol mute.`);
      
      if(!message.member.guild.me.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tengo suficientes permisos para borrar la ID del rol mute.`);

        const muteid = db.fetch(`muteid_${message.guild.id}`);
        
        if(muteid === null) return message.reply(`❌ | El Bot no tiene ninguna ID guardada.`);
        else if(muteid !== null) { 
            message.reply(`✔️ | ID borrada correctamente.`)
            db.delete(`muteid_${message.guild.id}`)

  }

 }
 
}