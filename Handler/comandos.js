module.exports.comandos = function (fs, client, Collection) {
    client.commands = new Collection();
    const commandFolder1 = fs.readdirSync(__dirname + "/" + `../Comandos-Generales`);
    for (const folder1 of commandFolder1) {
      const commandFolder2 = fs.readdirSync(__dirname + "/" + `../Comandos-Generales/${folder1}`);
      for (const folder2 of commandFolder2) {
         const commandFile = fs.readdirSync(__dirname + "/" + `../Comandos-Generales/${folder1}/${folder2}`);
         for (const file of commandFile) {
            const comandos = require(__dirname + "/" + `../Comandos-Generales//${folder1}/${folder2}/${file}`);
            client.commands.set(comandos.comando, comandos);
      }
    }
  }
};