const { MessageEmbed } = require("discord.js");

module.exports = {
  comando: "clear",
  comandos: ["purge"], 

    execute (client, message, args) {
      
      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`❌ | No tienes permisos para eliminar mensajes.`);

      if(!message.member.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply(`❌ | No tengo suficientes permisos para eliminar mensajes.`);

      const cantidad = parseInt(args[0]) + 1;

        if (isNaN(cantidad)) {
            return message.reply(`❌ | Pon un numero de mensajes para borrar.`)
        } else if (cantidad <= 1 || cantidad > 100) {
            return message.reply(`❌ | Solo puedes borrar maximo 99 mensajes.`)
        }
        const embed = new MessageEmbed()
            .setTitle('Limpieza')
            .setColor('FF0000')
            .setDescription(`Mensajes borrados: ${cantidad-1}`)
            .setTimestamp()
            .setFooter({
                text: `Solicitado por  •  ${message.author.tag}`
                })
            message.channel.send({ embeds: [embed] }).then(newMessage => { setTimeout(() => newMessage.delete(), 10000);
});

        message.channel.bulkDelete(cantidad, true).catch(err => {
            console.error(err);
            message.channel.send(`❌ | Ocurrio un error borrando los mensajes del canal.`)

        }) 
        
 }
 
}