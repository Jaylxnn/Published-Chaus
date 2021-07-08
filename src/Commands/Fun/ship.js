const { MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../Structures/Command');
const Canvas = require('canvas')
const colourembed = require("../../../shortcutembedcolor.json")

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['shipping', 'shippers'],
			description: 'Ship 2 other people or you with someone!',
			category: '<:Funny:835794439662206986> Fun',
			usage: '<@user> <@user>',
			guildOnly: true,
			cooldown: 6000
		});
	}

	async run(message, args) {

        const canvas = Canvas.createCanvas(700, 250)
        const ctx = canvas.getContext("2d")

        const target = message.mentions.users.first()
        if(!target) return message.channel.send('Whoops! You forgot to put a user!')
        if(target.id == message.author.id) return message.channel.send('You can\'t ship yourself!')
    
        const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/712797888345800734/861448542958387200/invisible-png.png")
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
    
        const avatar = await Canvas.loadImage(message.author.displayAvatarURL( { format: 'png' } ))
        ctx.drawImage(avatar, 100, 25, 200, 200)
    
        const TargetAvatar = await Canvas.loadImage(target.displayAvatarURL( { format: "png" } ))
        ctx.drawImage(TargetAvatar, 400, 25, 200, 200)
    
        const heart = await Canvas.loadImage('https://cdn.discordapp.com/attachments/712797888345800734/861453017022464040/heart-icon-small-flat-4.png')
        const broken = await Canvas.loadImage('https://cdn.discordapp.com/attachments/712797888345800734/861453330009292820/1200px-Broken_heart_SVG.svg.png')
        const random = Math.floor(Math.random() * 99) + 1
    
        if(random >= 50) {
            ctx.drawImage(heart, 275, 60, 150, 150)
            const attachment = new MessageAttachment(canvas.toBuffer(), 'love.png')
            const embed = new MessageEmbed()
            .setDescription(`**${message.author.username} & ${target.username} | Love Rate: ${random}%**`)
            .attachFiles(attachment)
            .setImage(`attachment://love.png`)
            .setColor(colourembed.BotpfpColor)
            return message.channel.send(embed)
    
        } else {
            ctx.drawImage(broken, 275, 60, 150, 150)
            const attachment = new MessageAttachment(canvas.toBuffer(), 'broken.png')
            const embed = new MessageEmbed()
            .setDescription(`**${message.author.username} & ${target.username} | Love Rate: ${random}%**`)
            .attachFiles(attachment)
            .setImage(`attachment://broken.png`)
            .setColor(colourembed.BotpfpColor)
            return message.channel.send(embed)
    
        }    
		
	}

};