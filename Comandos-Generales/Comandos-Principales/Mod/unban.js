const { MessageEmbed } = require('discord.js');

module.exports = {
  comando: "unban", 
  comandos: ["ub"], 

    execute (client, message, args) {
      
      if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`❌ | No tienes permisos para desbanear usuarios.`);

      if(!message.member.guild.me.permissions.has("BAN_MEMBERS")) return message.reply(`❌ | No tengo suficientes permisos para desbanear usuarios.`);
      
      const userID = args[0]
        if(!userID) return message.reply(`❌ | Necesitas poner un ID valido de usuario para debanear.`);

        message.guild.bans.fetch().then(bans => {
            if(bans.size == 0) return
            let bannedUser = bans.find(b => b.user.id == userID)

            const razon = args.slice(1).join(" ")
            if(!razon) return message.reply(`❌ | Debes dar una razon para desbanear a este usuario.`);

            if(bannedUser) { 

                const embed =  new MessageEmbed()
                .setTitle('Usuario desbaneado')
                .setColor('#00FF00')
                .setDescription(`**Fue desbaneado:**\n<@${userID}>\n\n**Razon del desbaneo:**\n${razon}`)
                .setTimestamp()
                .setFooter({
                    text: `Solicitado por  •  ${message.author.tag}`
                    })

                message.channel.send({ embeds: [embed] }).then(message.guild.members.unban(bannedUser.user))
            } else {
                message.reply(`❌ | El usuario no esta baneado.`)
                
            }
            
        })

 }

}