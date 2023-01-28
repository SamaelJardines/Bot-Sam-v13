const db = require('quick.db');

module.exports = {
  comando: "resetwelcomeimage", 
  comandos: ["welcomeimagereset", "reset-welcomeimage", "welcomeimage-reset", "reset-imagenbienvenida", "imagenbienvenida-reset", "resetimagenbienvenida", "imagenbienvenidareset"], 

    execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tienes permisos para remover la imagen de bienvenida.`);
      
      if(!message.member.guild.me.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tengo suficientes permisos para remover la imagen de bienvenida.`);

        const { def_background } = require('../../../config.json');

        const bienvenidasimagen = db.fetch(`imagenbienvenida_${message.guild.id}`);
        
        if(bienvenidasimagen === def_background) return message.reply(`❌ | El Bot no tiene ninguna imagen de bienvenida guardada.`);
        else if(bienvenidasimagen !== null) { 
            message.reply(`✔️ | Imagen de bienvenida borrada.`)
            db.delete(`imagenbienvenida_${message.guild.id}`)
            
  }

 }
 
}