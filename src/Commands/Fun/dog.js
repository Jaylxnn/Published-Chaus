const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const superagent = require('superagent')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['doge', 'doggy'],
			description: 'Shows a cute image of a doggy!',
			category: '<:Funny:835794439662206986> Fun',
			usage: '',
			guildOnly: true,
			cooldown: 5000
		});
	}

	async run(message) {

        const { body } = await superagent
        .get('https://dog.ceo/api/breeds/image/random')

		if(!body) {
			message.channel.send(`Oopsie! We went through a whoopsie. | Our API Provider has broke, try the command again.`)
		}

        const DogeEmbed = new MessageEmbed()
        .setAuthor(`Here's a cute Doggy!`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(colourembed.BotpfpColor)
        .setImage(body.message)
        message.channel.send(DogeEmbed)
		
	}

};