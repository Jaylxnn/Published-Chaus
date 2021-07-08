const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["kisses", "mwa", "mwah"],
			description: 'Kissie your buddy <3',
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

        const data = await fetch('https://nekos.life/api/kiss')
        .then(res => res.json())
        .then(json => json);
        const url = data.url;

        const pingthemselves = new MessageEmbed()
        .setColor(colourembed.KissCommandColor)
        .setAuthor(`${this.client.user.username} kissed ${message.author.username}, awww, adorable!! ><`, message.author.displayAvatarURL())
        .setImage(url)
        .setFooter(`${this.client.user.username} will kiss you softly! mwa!`)

        if(member.user.id == message.author.id) return message.channel.send(pingthemselves)

        const pingbot = new MessageEmbed()
        .setColor(colourembed.KissCommandColor)
        .setAuthor(`${this.client.user.username} kissed ${message.author.username}, awww, adorable!! ><`, message.author.displayAvatarURL())
        .setImage(url)
        .setFooter(`${this.client.user.username} will kiss you softly! mwa!`)

        if(member.user.id == this.client.user.id) return message.channel.send(pingbot)

        
        const embed = new MessageEmbed()
        .setColor(colourembed.KissCommandColor)
        .setAuthor(`${message.author.username} kissed ${member.user.username}, mwa! ><`, message.author.displayAvatarURL())
        .setImage(url);
        message.channel.send(embed)
	}

};