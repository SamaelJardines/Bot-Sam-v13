const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
  comando: "unmute", 
  comandos: ["um"], 

    execute (client, message, args) {
      
      if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tienes permisos para desmutear miembros.`);
      
      if(!message.member.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tengo suficientes permisos para desmutear miembros.`);

      const member = message.mentions.members.first()

      const muteid = db.fetch(`muteid_${message.guild.id}`)

        if(!member) return message.reply(`❌ | Tienes que mencionar a un miembro para desmutear.`);
        
        if(!member.roles.cache.has(muteid)) return message.reply(`❌ | El miembro ya esta desmuteado.`);

        if (member.id === message.author.id)
        return message.reply(`❌ | No te puedes desmutear a ti mismo.`);

        if (message.member.roles.highest.position < member.roles.highest.position)
        return message.reply(`❌ | No puedes desmutear a un miembro con un rol mas alto.`);

        const razon = args.slice(1).join(" ")
        if(!razon) return message.reply(`❌ | Debes dar una razon para desmutear a este miembro.`);

        member.roles.remove(muteid);
       
        const embed = new MessageEmbed()
        .setTitle('Usuario desmuteado')
        .setColor('#00FF00')
        .setDescription(`**Fue desmuteado:**\n<@${member.user.id}>\n\n**Razon del desmuteo:**\n${razon}`)
        .setTimestamp()
        .setFooter({
            text: `Solicitado por  •  ${message.author.tag}`
            })
        message.channel.send({ embeds: [embed] })
        
 }

}