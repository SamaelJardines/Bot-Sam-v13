const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  comando: "accept-suggest", 
  comandos: ["suggest-accept", "acceptsuggest", "suggestaccept", "aceptar-sugerencia", "sugerencia-aceptar", "aceptarsugerencia", "sugerenciaaceptar", "a-suggest", "suggest-a", "d-sugerencia", "sugerencia-d"], 

    async execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`❌ | No tienes permisos para aceptar sugerencias.`);

      if(!message.member.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply(`❌ | No tengo suficientes permisos para aceptar sugerencias.`);

      const messageID = args[0]
      const acceptQuery = args.slice(1).join(" ");

      if (!messageID) return message.reply(`❌ | Ingresa una ID de sugerencia.`);
      if (!acceptQuery) return message.reply(`❌ | Debes dar una razon para aceptar la sugerencia.`);

      const sugerenciascanal = db.fetch(`sugerenciascanal_${message.guild.id}`);

      const suggestionChannel = message.guild.channels.cache.get(sugerenciascanal);

      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);

      const data = suggestedEmbed.embeds[0]
      const acceptEmbed = new MessageEmbed()
      .setAuthor(data.author)
      .setColor('#00FF00')
      .setDescription(data.description)
      .addField("**Comentario:**", acceptQuery)
      .addField("**Estado**", "(ACEPTADA)")
      .setTimestamp(data.timestamp)
      .setFooter(data.footer)
      suggestedEmbed.edit({embeds: [acceptEmbed] })
      message.reply(`✔️ | Sugerencia aceptada.`)

 }
 
}