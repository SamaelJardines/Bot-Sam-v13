const db = require('quick.db');

module.exports = {
  comando: "set-invitations", 
  comandos: ["invitations-set", "invitationsset", "setinvitations", "set-invitacion", "invitacion-set", "setinvitacion", "invitacionset"], 

    execute (client, message, args, Util) {

      if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tienes permisos para establecer el canal de invitaciones.`);

      if(!message.member.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tengo suficientes permisos para establecer el canal de invitaciones.`);

        const invitations = args[0]

        if(!invitations) return message.reply(`❌ | Tienes que proporcionar la ID de un canal.`)

        if(isNaN(parseInt(args[0]))) return message.reply(`❌ | Debes proporcionar una ID de canal para establecer el mensaje de invitaciones en el.`)

        const invitacionescanal = db.fetch(`invitacionescanal_${message.guild.id}`)

        if(invitacionescanal !== null) return message.reply(`❌ | El mensaje de invitaciones ya esta establecido en un canal. Canal actual <#${invitacionescanal}>. Remueve al bot del canal para establecer en otro.`)
        else if(invitacionescanal === null) {
            message.reply(`✔️ | Mensajes de invitaciones establecido en <#${invitations}>`)
            db.set(`invitacionescanal_${message.guild.id}`, invitations)
            
  }

 }
 
}