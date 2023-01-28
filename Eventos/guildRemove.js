const db = require("quick.db");

module.exports = {
  comando: "guildMemberRemove", 

    async execute (member, client) {

      let guild = member.guild;

      if(db.has(`despedidascanal_${guild.id}`)) {
      let channel = await guild.channels.fetch(db.get(`despedidascanal_${guild.id}`), true, true)
      channel.send({content: `<@${member.id}> Se fue del servidor... :sleepy:`})

      }
      
   }
 
}