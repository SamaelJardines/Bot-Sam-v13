const db = require('quick.db');

module.exports = {
  comando: "set-welcomeimage", 
  comandos: ["welcomeimage-set", "setwelcomeimage", "welcomeimageset", "set-imagenbienvenida", "imagenbienvenida-set", "setimagenbienvenida", "bienvenidaimagenset"], 

    execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tienes permisos para cambiar la imagen de bienvenida.`)
      
      if(!message.member.guild.me.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tengo suficientes permisos para cambiar la imagen de bienvenida.`)

        const image = args[0]
        
        if(!image) return message.reply(`❌ | Tienes que proporcionar un enlace de imagen`)
        else {
            message.reply(`✔️ | Imagen de bienvenida establecida como "${image}"`)
            db.set(`imagenbienvenida_${message.guild.id}`, image)
            
  }
     
 }
 
}