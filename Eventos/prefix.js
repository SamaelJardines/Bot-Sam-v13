const db = require('quick.db');

module.exports = {
  comando: "messageCreate", 

    execute (message, client) {

        const prefix = db.fetch(`prefix_${message.guild.id}`);

        if (message.content === "prefix" && !message.author.bot)
        message.reply(`Prefix "${prefix}"`)

  }
  
}