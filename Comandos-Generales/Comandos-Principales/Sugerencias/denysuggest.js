const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  comando: "deny-suggest", 
  comandos: ["suggest-deny", "denysuggest", "suggestdeny", "rechazar-sugerencia", "sugerencia-rechazar", "rechazarsugerencia", "sugerenciarechazar", "d-suggest", "suggest-d", "sugerencia-d", "d-sugerencia"], 

    async execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`❌ | No tienes permisos para rechazar sugerencias.`);

      if(!message.member.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply(`❌ | No tengo suficientes permisos para rechazar sugerencias.`);

      const messageID = args[0]
      const denyQuery = args.slice(1).join(" ");

      if (!messageID) return message.reply(`❌ | Ingresa una ID de sugerencia.`);
      if (!denyQuery) return message.reply(`❌ | Debes dar una razon para rechazar la sugerencia.`);

      const sugerenciascanal = db.fetch(`sugerenciascanal_${message.guild.id}`);

      const suggestionChannel = message.guild.channels.cache.get(sugerenciascanal);

      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);

      const data = suggestedEmbed.embeds[0]
      const denyEmbed = new MessageEmbed()
      .setAuthor(data.author)
      .setColor('#FF0000')
      .setDescription(data.description)
      .addField("**Comentario:**", denyQuery)
      .addField("**Estado**", "(RECHAZADA)")
      .setTimestamp(data.timestamp)
      .setFooter(data.footer)
      suggestedEmbed.edit({embeds: [denyEmbed] })
      message.reply(`❌ | Sugerencia rechazada.`)

 }
 
}