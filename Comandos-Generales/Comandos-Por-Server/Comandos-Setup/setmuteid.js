const db = require('quick.db');

module.exports = {
  comando: "set-muteid", 
  comandos: ["muteid-set", "muteidset", "setmuteid", "silencioid-set", "set-silencioid", "setsilencioid", "silencioidset"], 

    execute (client, message, args, Util) {

      if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tienes permisos para establecer la ID del rol mute.`);

      if(!message.member.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tengo suficientes permisos para establecer la ID del rol mute.`);

        const silencio = args[0]

        if(!silencio) return message.reply(`❌ | Tienes que proporcionar la ID del rol mute.`)

        if(isNaN(parseInt(args[0]))) return message.reply(`❌ | Debes proporcionar una ID del rol mute.`)

        const muteid = db.fetch(`muteid_${message.guild.id}`)

        if(muteid !== null) return message.reply(`❌ | La ID ya esta guardada como: <@&${muteid}>. Borra la ID del rol para guardar otro ID.`)
        else if(muteid === null) {
            message.reply(`✔️ | ID de rol establecido como <@&${silencio}>`)
            db.set(`muteid_${message.guild.id}`, silencio)

   }

 }
 
}