const { Client, MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  comando: "messageDelete", 

    execute (message, client) {

      if(!message.partial) {

        const channel = db.fetch(`mensajesborradoscanal_${message.guild.id}`);

        if(channel && !message.author.bot) {
        const embed = new MessageEmbed()
        .setAuthor(`Mensaje borrado ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('#FF0000')
        .setDescription(`**Mensaje:**\n${message.content}`)
        .addField('**Nombre**', `${message.author.tag}`, true)
        .addField('**Canal**', `${message.channel.name}`, true)
        .setTimestamp()
        .setFooter({
            text: `Recuperado por  •  ${client.user.tag}`
            })
        message.guild.channels.cache.get(channel).send({ embeds: [embed] })

        }
    }

  }
  
}