const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  comando: "unwarn", 
  comandos: [], 

    async execute (client, message, args) {

      if(!message.member.permissions.has("MUTE_MEMBERS")) return message.reply(`❌ | No tienes permisos para quitar advertencias.`);

      if(!message.member.guild.me.permissions.has("MUTE_MEMBERS")) return message.reply(`❌ | No tengo suficientes permisos para quitar advertencias.`);

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        const member = message.mentions.members.first()  

        const cantidad = parseInt(args[1]);
        if (isNaN(cantidad)) {
        return message.reply(`❌ | Pon una cantidad de advertencias para remover.`)}

        if(!user) return message.reply(`❌ | Tienes que mencionar a un miembro para quitar advertencias.`);

        if (member.id === message.author.id)
        return message.reply(`❌ | No te puedes quitar advertencias a ti mismo.`);

        if (message.member.roles.highest.position < member.roles.highest.position)
        return message.reply(`❌ | No le puedes quitar advertencias a un miembro con un rol mas alto.`);

        let warnings = db.fetch(`warns_${message.guild.id}_${user.id}`)
        if(warnings === null || warnings === 0) warnings = '0'

        const embed = await new MessageEmbed()
        .setAuthor(`Advertencia removida ${user.user.username}`, user.user.displayAvatarURL({ dynamic: true }))
        .setColor('#330479')
        .setDescription(`**Se le quito la advertencia:**\n<@${user.id}>\n\n**Advertencias restantes:**\n${warnings}`)
        .setTimestamp()
        .setFooter({
            text: `Solicitado por  •  ${message.author.tag}`
            })
        message.channel.send({ embeds: [embed] })
        db.subtract(`warns_${message.guild.id}_${user.id}`, cantidad)
        
 }

}