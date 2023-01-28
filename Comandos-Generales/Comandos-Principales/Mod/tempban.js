const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
  comando: "tempban", 
  comandos: ["tempb", "ban-temp"], 

    execute (client, message, args) {
      
      if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`❌ | No tienes permisos para banear temporalmente a un miembro.`);
      
      if(!message.member.guild.me.permissions.has("BAN_MEMBERS")) return message.reply(`❌ | No tengo suficientes permisos para banear temporalmente a un miembro.`);

      const member = message.mentions.members.first()

        if(!member) return message.reply(`❌ | Tienes que mencionar a un miembro para banear temporalmente.`);

        if (member.id === message.author.id)
        return message.reply(`❌ | No te puedes banear temporalmente a ti mismo.`);

        if (message.member.roles.highest.position < member.roles.highest.position)
        return message.reply(`❌ | No puedes banear temporalmente a un miembro con un rol mas alto.`);

        const tiempo = args [1]
        if(!tiempo) return message.reply(`❌ | Especifica el tiempo del ban.`);

        const razon = args.slice(2).join(" ")
        if(!razon) return message.reply(`❌ | Debes dar una razon para banear temporalmente a este miembro.`);

        member.ban({ reason: razon })

        const embed = new MessageEmbed()
        .setTitle('Usuario baneado temporalmente')
        .setColor('FF0000')
        .setDescription(`**Fue silenciado temporalmente:**\n<@${member.user.id}>\n\n**Razon del baneo temporal:**\n${razon}\n\n**Tiempo del silencio a esperar:**\n${tiempo}`)
        .setTimestamp()
        .setFooter({
            text: `Solicitado por  •  ${message.author.tag}`
            })
        message.channel.send({ embeds: [embed] })

        setTimeout(async () => {
            await message.guild.members.unban(member)
        }, ms(tiempo))
        
 }

}