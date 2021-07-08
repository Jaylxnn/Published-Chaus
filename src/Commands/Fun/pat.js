const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["pet", "petting", "patting"],
			description: 'Pat the person!',
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

        const data = await fetch('https://nekos.life/api/pat')
        .then(res => res.json())
        .then(json => json);
        const url = data.url;

        const pingthemselves = new MessageEmbed()
        .setColor(colourembed.PatCommandColor)
        .setAuthor(`${this.client.user.username} pats ${message.author.username}, pat pat ><`, message.author.displayAvatarURL())
        .setImage(url)
        .setFooter(`${this.client.user.username} will pat you gently!`)

        if(member.user.id == message.author.id) return message.channel.send(pingthemselves)

        const pingbot = new MessageEmbed()
        .setColor(colourembed.PatCommandColor)
        .setAuthor(`${this.client.user.username} pats ${message.author.username}, pats ><`, message.author.displayAvatarURL())
        .setImage(url)
        .setFooter(`${this.client.user.username} will pat you gently`)

        if(member.user.id == this.client.user.id) return message.channel.send(pingbot)

        
        const embed = new MessageEmbed()
        .setColor(colourembed.PatCommandColor)
        .setAuthor(`${message.author.username} pats ${member.user.username}, pat pat ><`, message.author.displayAvatarURL())
        .setImage(url);
        message.channel.send(embed)
	}

};