module.exports.eventos = function (fs, client, MessageEmbed, Util) {
    const eventFiles = fs.readdirSync(__dirname + "/" + `../Eventos/`).filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
      const event = require(__dirname + "/" + `../Eventos/${file}`);
      if (event.once) {
        client.once(event.comando, (...args) => event.execute(...args, client));
      } else {
        client.on(event.comando, (...args) => event.execute(...args, client, MessageEmbed, Util));
      }
    }
  };