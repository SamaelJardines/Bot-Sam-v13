const db = require("quick.db");

module.exports = {
  comando: "guildMemberAdd", 

    async execute (member, client) {

      let guild = member.guild;

      const welcomeImage = require('../Comandos-Generales/Comandos-Principales/Mod/welcomeImage');
      const img = await welcomeImage(member);

      const rules = await guild.channels.fetch(db.get(`reglasid_${guild.id}`), true, true)
      
      if(db.has(`bienvenidascanal_${guild.id}`)) {
      let channel = await guild.channels.fetch(db.get(`bienvenidascanal_${guild.id}`), true, true)
      channel.send({content: `Bienvenido a **${member.guild.name}** <@${member.id}>
Porfavor mira ${rules}`,
        files: [img]})

      }
      
   }

}