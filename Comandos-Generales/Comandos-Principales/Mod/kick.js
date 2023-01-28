const { MessageEmbed } = require('discord.js');

module.exports = {
  comando: "kick", 
  comandos: [], 

    execute (client, message, args) {
      
      if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply(`❌ | No tienes permisos para kickear miebros.`);

      if(!message.member.guild.me.permissions.has("KICK_MEMBERS")) return message.reply(`❌ | No tengo suficientes permisos para kickear miembros.`);

      const member = message.mentions.members.first()

        if(!member) return message.reply(`❌ | Tienes que mencionar a un miembro para kickear.`);

        if (member.id === message.author.id)
        return message.reply(`❌ | No te puedes kickear a ti mismo.`);

        if (message.member.roles.highest.position < member.roles.highest.position)
        return message.reply(`❌ | No puedes kickear a un mimebro con un rol mas alto.`);

        const razon = args.slice(1).join(" ")
        if(!razon) return message.reply(`❌ | Debes dar una razon para kickear a este miembro.`);
        
        member.kick({ reason: razon })

          const embed = new MessageEmbed()
          .setTitle('Usuario kickeado')
          .setColor('FF0000')
          .setDescription(`**Fue kickeado:**\n<@${member.user.id}>\n\n**Razon del kickeo:**\n${razon}`)
          .setTimestamp()
          .setFooter({
              text: `Solicitado por  •  ${message.author.tag}`
              })
        message.channel.send({ embeds: [embed] })
        
 }

}