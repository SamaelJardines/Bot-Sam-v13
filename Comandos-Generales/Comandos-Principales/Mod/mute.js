const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
  comando: "silenciar", 
  comandos: ["mute", "mutear"], 

    execute (client, message, args) {
      
      if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tienes permisos para silenciar miembros.`);
      
      if(!message.member.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tengo suficientes permisos para silenciar miembros.`);

      const member = message.mentions.members.first()

      const muteid = db.fetch(`muteid_${message.guild.id}`)

        if(!muteid) return message.reply(`❌ | Aun no esta asignado el ID del rol mute.`);

        if(!member) return message.reply(`❌ | Tienes que mencionar a un miembro para silenciar.`);
        
        if(member.roles.cache.has(muteid)) return message.reply(`❌ | El miembro ya esta silenciado.`);

        if (member.id === message.author.id)
        return message.reply(`❌ | No te puedes silenciar a ti mismo.`);

        if (message.member.roles.highest.position < member.roles.highest.position)
        return message.reply(`❌ | No puedes silenciar a un miembro con un rol mas alto.`);

        const razon = args.slice(1).join(" ")
        if(!razon) return message.reply(`❌ | Debes dar una razon para silenciar a este miembro.`);

        member.roles.add(muteid);
       
        const embed = new MessageEmbed()
        .setTitle('Usuario silenciado')
        .setColor('FF0000')
        .setDescription(`**Fue silenciado:**\n<@${member.user.id}>\n\n**Razon del silencio:**'\n${razon}`)
        .setTimestamp()
        .setFooter({
            text: `Solicitado por  •  ${message.author.tag}`
            })
        message.channel.send({ embeds: [embed] })
        
 }

}