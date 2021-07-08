const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["huggy", "snuggle", "wuggle"],
			description: 'Huggie your friend! <3',
			category: '<:Funny:835794439662206986> Fun',
			usage: '<@user>',
			guildOnly: true,
                        cooldown: 5000
		});
	}

	async run(message, args) {
        const member = message.mentions.members.first();

        const didntping = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> *Whoops!* I think you forgot to mention a person, mention them!")
        if(!member) return message.reply(didntping);

        const data = await fetch('https://nekos.life/api/hug')
        .then(res => res.json())
        .then(json => json);
        const url = data.url;
        
        const embed = new MessageEmbed()
        .setColor(colourembed.HugCommandColor)
        .setAuthor(`${message.author.username} hugs ${member.user.username}, cute! >-<`, message.author.displayAvatarURL())
        .setImage(url);
        message.channel.send(embed)
	}

};