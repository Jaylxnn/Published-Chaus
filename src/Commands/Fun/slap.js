const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["slaps", "smack", "hit"],
			description: 'Smackie smack!',
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

        const data = await fetch('https://nekos.life/api/v2/img/slap')
        .then(res => res.json())
        .then(json => json);
        const url = data.url;

        if(member.user.id == message.author.id) return message.channel.send("Don't slap yourself! It hurts :c")

        if(member.user.id == this.client.user.id) return message.channel.send("Why would you slap me :( </3")

        
        const embed = new MessageEmbed()
        .setColor(colourembed.SlapCommandColor)
        .setAuthor(`${message.author.username} slapped ${member.user.username}, ouch! That must've hurt`, message.author.displayAvatarURL())
        .setImage(url);
        message.channel.send(embed)
	}

};