const { MessageEmbed } = require("discord.js");

module.exports = {
  comando: "crear-embed", 
  comandos: ["embed-crear", "create-embed", "embed-create", "crearembed", "embedcrear", "createembed", "embedcreate"], 

    execute (client, message, args) {

      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`❌ | No tienes permisos para crear un embed.`);

      if(!message.member.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply(`❌ | No tengo suficientes permisos para crear un embed.`);

      const channel = message.mentions.channels.first()

        if(!channel) return message.reply(`❌ | Proporciona un canal para enviar el embed.`)

        // Embed Options
        const titulo = args [1]

        if(!titulo) return message.reply(`❌ | Proporciona un titulo para el embed.`)

        const descripcion = args [2]

        if(!descripcion) return message.reply(`❌ | Proporciona una descripcion para el embed.`)

        const footer = args [3]

        if(!footer) return message.reply(`❌ | Proporciona un footer para el embed.`)

        const color = args [4]

        if(!color) return message.reply(`❌ | Proporciona un color para el embed.`)

        const thumbnail = args [5]

        if(!thumbnail) return message.reply(`❌ | proprociona un thumbnail para el embed.`)

        const imagen = args [6]

        if(!imagen) return message.reply(`❌ | Proporciona una imagen para el embed.`)

        const embed = new MessageEmbed()
        .setTitle(titulo)
        .setDescription(descripcion)
        .setColor(color)
        .setFooter(footer)
        .setImage(imagen)
        .setThumbnail(thumbnail)
        channel.send({ embeds: [embed] })

 }
 
}