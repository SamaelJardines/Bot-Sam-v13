const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  comando: "warn", 
  comandos: ["advertir", "advertencia"], 

    execute (client, message, args) {

      if(!message.member.permissions.has("MUTE_MEMBERS")) return message.reply(`❌ | No tienes permisos para dar advertencias.`);

      if(!message.member.guild.me.permissions.has("MUTE_MEMBERS")) return message.reply(`❌ | No tengo suficientes permisos para dar advertencias.`);

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())    
        const member = message.mentions.members.first()  

        if(!user) return message.reply(`❌ | Tienes que mencionar a un miembro para advertir.`);

        if (member.id === message.author.id)
        return message.reply(`❌ | No te puedes advertir a ti mismo.`);

        if (message.member.roles.highest.position < member.roles.highest.position)
        return message.reply(`❌ | No puedes advertir a un miembro con un rol mas alto.`);
        
        const razon = args.slice(1).join(" ")
        if(!razon) return message.reply(`❌ | Debes dar una razon para advertir a este miembro.`);

        const embed = new MessageEmbed()
        .setAuthor(`Advertencia para ${user.user.username}`, user.user.displayAvatarURL({ dynamic: true }))
        .setColor('#330479')
        .setDescription(`**Usuario advertido:**\n<@${member.user.id}>\n\n**Razon de la advertencia:**\n${razon}`)
        .setTimestamp()
        .setFooter({
            text: `Solicitado por  •  ${message.author.tag}`
            })
        message.channel.send({ embeds: [embed] })
        db.add(`warns_${message.guild.id}_${user.id}`, 1) 
        
 }

}