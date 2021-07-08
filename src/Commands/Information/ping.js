const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["pong"],
			description: 'The bot\'s Latency.',
			category: '<:Information:835795138277539850> Information',
			usage: '',
			guildOnly: true
		});
	}

	async run(message, args) {

        const messageawait = await message.channel.send("pong!");

        const latency = messageawait.createdTimestamp - message.createdTimestamp;
        messageawait.edit(`pong! \`${latency} ms\``)

	}
};