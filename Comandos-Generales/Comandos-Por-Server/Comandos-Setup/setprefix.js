const db = require('quick.db');

module.exports = {
  comando: "set-prefix", 
  comandos: ["prefix-set", "setprefix", "prefixset"], 

    execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tienes permisos para cambiar el prefix.`)
      
      if(!message.member.guild.me.permissions.has("MANAGE_GUILD")) return message.reply(`❌ | No tengo suficientes permisos para cambiar el prefix.`)

        const newprefix = args[0]

        const prefix = db.fetch(`prefix_${message.guild.id}`)

        if(prefix === args[0]) return message.reply(`❌ | Ese prefix ya esta establecido`)
        
        if(!newprefix) return message.reply(`❌ | Tienes que proporcionar un prefix`)
        else if(newprefix.length > 4) return message.reply(`❌ | El prefix es muy largo, escoge uno mas corto (Menos de 4 caracteres)`)
        else {
            message.reply(`✔️ | Prefix establecido a "${newprefix}"`)
            db.set(`prefix_${message.guild.id}`, newprefix)
            
  }
     
 }
 
}