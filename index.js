const { Client, Intents, Collection, MessageEmbed, Util } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const invites = new Map();

const client = new Discord.Client({
    intents: 32767,
});

const { comandos } = require(`${__dirname}/Handler/comandos.js`);
const { eventos } = require(`${__dirname}/Handler/eventos.js`);

comandos(fs, client, Collection)
eventos(fs, client, MessageEmbed, Util)

client.on("messageCreate", (message) => {

   const { def_prefix } = require('./config.json')
   let prefix = db.fetch(`prefix_${message.guild.id}`)
   if(prefix === null) prefix = db.set(`prefix_${message.guild.id}`, def_prefix)

   if(message.author.bot) return;

   if(!message.content.startsWith(prefix)) return;

   let usuario = message.mentions.members.first() || message.author
   const args = message.content.slice(prefix.length).trim().split(/ +/g)
   const command = args.shift().toLowerCase();

  let cmd = client.commands.find((c) => c.comando === command || c.comandos && c.comandos.includes(command));
  if(cmd){
    cmd.execute(client, message, args)
  }

})

client.on("messageCreate", (message) => {
  
   const { def_background } = require('./config.json') 
   const imagenbienvenida = db.fetch(`imagenbienvenida_${message.guild.id}`)

    if (!imagenbienvenida) {
    db.set(`imagenbienvenida_${message.guild.id}`, def_background)
      
  }

})

const wait = require("timers/promises").setTimeout;

client.on("ready", async () => {

  await wait(10000);

  client.guilds.cache.forEach(async (guild) => {
    const firstInvites = await guild.invites.fetch();
    invites.set(guild.id, new Map(firstInvites.map((invite) => [invite.code, invite.uses])));
  });
});

client.on("inviteDelete", (invite) => {
  invites.get(invite.guild.id).delete(invite.code);
});

client.on("inviteCreate", (invite) => {
  invites.get(invite.guild.id).set(invite.code, invite.uses);
});

client.on("guildCreate", (guild) => {
  guild.invites.fetch().then(guildInvites => {
    invites.set(guild.id, new Map(guildInvites.map((invite) => [invite.code, invite.uses])));
  })
});

client.on("guildDelete", (guild) => {
  invites.delete(guild.id);
});

client.on("guildMemberAdd", member => {

  let guild = member.guild;

  const invitacionescanal = db.fetch(`invitacionescanal_${guild.id}`);

  if(!invitacionescanal) return;
  member.guild.invites.fetch().then(newInvites => {
    const oldInvites = invites.get(member.guild.id);
    const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
    const inviter = client.users.cache.get(invite.inviter.id);
 
    const logChannel = member.guild.channels.cache.find(channel => channel.id === invitacionescanal);
     
    const embed = new MessageEmbed()
    .setAuthor(`Nuevo miembro ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
    .setColor("#00FFFF")
    .setDescription(`**Miembro #${member.guild.memberCount} en entrar:**\n${member.user.tag}\n**Usos de la invitacion:**\n${invite.uses}`)
    .addField("**Creador del enlace**", `${inviter.tag}`, true)
    .addField("**Codigo de invitacion**", `${invite.code}`, true)
    .addField("**Link:**", `${invite.url}`)
    .setTimestamp()
    .setFooter({
        text: `Solicitado por  •  ${client.user.tag}`
        })
    logChannel.send({ embeds: [embed] })
    
  });
})

.setMaxListeners(300)
const mySecret = process.env['token']
client.login(mySecret)