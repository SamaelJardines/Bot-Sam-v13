const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  comando: "suggest", 
  comandos: ["sugerencia"], 

    execute (client, message, args) {
      
      const suggestionQuery = args.join(" ");

      if (!suggestionQuery) return message.reply(`❌ | Debes escribir la sugerencia.`);

      const sugerenciascanal = db.fetch(`sugerenciascanal_${message.guild.id}`);

      if(!sugerenciascanal) return message.reply(`❌ | Aun no esta asignado el ID del canal sugerencias.`);

      const embed = new MessageEmbed()
      .setAuthor(`Sugerencia de ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setColor("#FFFF00")
      .setDescription(`**Sugerencia:**\n${suggestionQuery}`)
      .addField("**Estado**", "(PENDIENTE)")
      .setTimestamp()
      .setFooter({
          text: `Solicitado por  •  ${message.author.tag}`
          })
      message.guild.channels.cache.get(sugerenciascanal).send({ embeds: [embed] })
      message.reply(`✔️ | Sugerencia enviada.`)
            
 }
 
}