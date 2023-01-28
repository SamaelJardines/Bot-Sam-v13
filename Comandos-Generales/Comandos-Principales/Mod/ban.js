const { MessageEmbed } = require('discord.js');

module.exports = {
  comando: "ban", 
  comandos: [], 

    execute (client, message, args) {
      
      if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`❌ | No tienes permisos para banear miembros.`);
      
      if(!message.member.guild.me.permissions.has("BAN_MEMBERS")) return message.reply(`❌ | No tengo suficientes permisos para banear miembros.`);
      
      const member = message.mentions.members.first()

        if(!member) return message.reply(`❌ | Tienes que mencionar a un miembro para banear.`);

        if (member.id === message.author.id)
        return message.reply(`❌ | No te puedes banear a ti mismo.`);

        if (message.member.roles.highest.position < member.roles.highest.position)
        return message.reply(`❌ | No puedes banear a un miembro con un rol mas alto.`);

        const razon = args.slice(1).join(" ")
        if(!razon) return message.reply(`❌ | Debes dar una razon para banear a este miembro.`);
        
        member.ban({ reason: razon })

          const embed = new MessageEmbed()
          .setTitle('Usuario baneado')
          .setColor('FF0000')
          .setDescription(`**Fue baneado:**\n<@${member.user.id}>\n\n**Razon de baneo:**\n${razon}`)
          .setTimestamp()
          .setFooter({
              text: `Solicitado por  •  ${message.author.tag}`
              })
        message.channel.send({ embeds: [embed] })
        
 }
 
}