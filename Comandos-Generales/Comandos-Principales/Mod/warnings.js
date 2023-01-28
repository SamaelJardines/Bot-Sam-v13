const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  comando: "advertencias", 
  comandos: ["lista-advertencias", "warns", "warnings", "warning", "list-warnings", "list-warning"], 

    execute (client, message, args) {

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        
        if(!user) return message.reply(`❌ | Tienes que mencionar a un miembro para ver advertencias.`);

        let warnings = db.fetch(`warns_${message.guild.id}_${user.id}`)
        if(warnings === null || warnings === 0) warnings = '0'

        const embed = new MessageEmbed()
        .setAuthor(`Advertencias de ${user.user.username}`, user.user.displayAvatarURL({ dynamic: true }))
        .setColor('#330479')
        .setDescription(`<@${user.id}> Tiene **${warnings}** advertencias.`)
        .setTimestamp()
        .setFooter({
            text: `Solicitado por  •  ${message.author.tag}`
            })
        message.channel.send({ embeds: [embed] })
        
 }

}