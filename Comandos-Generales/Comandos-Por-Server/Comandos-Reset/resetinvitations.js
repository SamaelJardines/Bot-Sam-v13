const db = require('quick.db');

module.exports = {
  comando: "resetinvitations", 
  comandos: ["invitationsreset", "reset-invitations", "invitations-reset", "reset-invitaciones", "invitaciones-reset", "resetinvitaciones", "invitacionesreset"], 

    execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tienes permisos para remover al bot del canal invitaciones.`);
      
      if(!message.member.guild.me.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tengo suficientes permisos para remover al bot del canal invitaciones.`);

        const invitacionescanal = db.fetch(`invitacionescanal_${message.guild.id}`);
        
        if(invitacionescanal === null) return message.reply(`❌ | El Bot no esta establecido en ningun canal.`);
        else if(invitacionescanal !== null) { 
            message.reply(`✔️ | Bot removido del canal.`)
            db.delete(`invitacionescanal_${message.guild.id}`)
            
  }

 }
 
}