const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
  comando: "tempmute", 
  comandos: ["tempm", "silencio-temporal", "silenciotemporal", "silenciotemp", "silencio-temp"], 

    execute (client, message, args) {
      
      if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tienes permisos para silenciar miembros temporalmente.`);
      
      if(!message.member.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply(`❌ | No tengo suficientes permisos para silenciar miembros temporalmente.`);

      const member = message.mentions.members.first()

        if(!member) return message.reply(`❌ | Tienes que mencionar a un miembro para silenciar temporalmente.`);
        
        if(member.isCommunicationDisabled()) return message.reply(`❌ | El miembro ya esta silenciado temporalmente.`);

        if (member.id === message.author.id)
        return message.reply(`❌ | No te puedes silenciar a ti mismo temporalmente.`);

        if (message.member.roles.highest.position < member.roles.highest.position)
        return message.reply(`❌ | No puedes silenciar temporalmente a un miembro con un rol mas alto.`);

        const tiempo = args [1]
        if(!tiempo) return message.reply(`❌ | Especifica el tiempo del silencio.`);
        const time = ms(tiempo);

        const razon = args.slice(2).join(" ")
        if(!razon) return message.reply(`❌ | Debes dar una razon para silenciar temporalmente a este miembro.`);

        member.timeout(time, razon)
       
        const embed = new MessageEmbed()
        .setTitle('Usuario silenciado temporalmente')
        .setColor('FF0000')
        .setDescription(`**Fue silenciado temporalmente:**\n<@${member.user.id}>\n\n**Razon del silencio temporal:**\n${razon}\n\n**Tiempo del silencio a esperar:**\n${tiempo}`)
        .setTimestamp()
        .setFooter({
            text: `Solicitado por  •  ${message.author.tag}`
            })
        message.channel.send({ embeds: [embed] })
        
 }

}