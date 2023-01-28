const db = require('quick.db');

module.exports = {
  comando: "set-reglasid", 
  comandos: ["reglasid-set", "reglasidset", "setreglasid", "rulesid-set", "set-rulesid", "setrulesid", "rulesidset"], 

    execute (client, message, args, Util) {

      if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tienes permisos para establecer la ID de reglas.`);

      if(!message.member.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tengo suficientes permisos para establecer la ID de reglas.`);

        const reglas = args[0]

        if(!reglas) return message.reply(`❌ | Tienes que proporcionar la ID de un canal.`)

        if(isNaN(parseInt(args[0]))) return message.reply(`❌ | Debes proporcionar una ID de canal para establecer la ID de reglas.`)

        const reglasid = db.fetch(`reglasid_${message.guild.id}`)

        if(reglasid !== null) return message.reply(`❌ | La ID ya esta guardada como: <#${reglasid}>. Borra la ID del canal para guardar otro ID.`)
        else if(reglasid === null) {
            message.reply(`✔️ | ID de canal establecido como <#${reglas}>`)
            db.set(`reglasid_${message.guild.id}`, reglas)

   }

 }
 
}