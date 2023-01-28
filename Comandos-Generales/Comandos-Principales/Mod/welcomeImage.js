const Canvas = require("canvas");
const Discord = require("discord.js");
const db = require('quick.db');

const dim = {
    height: 675,
    width: 1200,
    margin: 50
}

const av = {
    size: 256,
    x: 480,
    y: 170
}

const welcomeImage = async (member, client) => {
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    let guild = member.guild;

    let backgroundimage = db.fetch(`imagenbienvenida_${guild.id}`)

    backimg = await Canvas.loadImage(backgroundimage)
    ctx.drawImage(backimg, 0, 0)

    ctx.fillStyle = "rgba(0,0,0,0.45)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()
    
    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    var server = `Bienvenido a ${member.guild.name}` 
    ctx.font = "60px Roboto"
    ctx.fillText(server, dim.width / 2, dim.margin + 70)

    var username = `${member.user.username}`
    var discrim = ` #${member.user.discriminator}`
        if(username.length >= 16) { 
            ctx.font = 'bold 30px Roboto'
            ctx.fillText(username + discrim, dim.width / 2, dim.height - dim.margin - 125)
        } else { 
            ctx.font = 'bold 60px Roboto'
            ctx.fillText(username + discrim, dim.width / 2, dim.height - dim.margin - 125)
        }

    var count = `Miembro #${member.guild.memberCount}`
    ctx.font = "50px Roboto"
    ctx.fillText(count, dim.width / 2, dim.height - dim.margin - 50)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = welcomeImage