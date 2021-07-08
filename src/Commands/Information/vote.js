const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const { MessageButton } = require('discord-buttons')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Vote for the Bot Top.gg',
			category: '<:Information:835795138277539850> Information',
			usage: '',
			guildOnly: true,
			BotOwner: false,
			cooldown: 5999
		});
	}

	async run(message, args) {

		const vote = new MessageButton()
		.setStyle('url')
		.setLabel(`Vote ${this.client.user.username}!`)
		.setURL(`https://top.gg/bot/821653425778720768/vote`)

		message.channel.send(`Vote`, {
			buttons: [vote]
		})

	}

};