const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["mc", "memberscount"],
			description: 'Shows your membercount',
			category: '<:Information:835795138277539850> Information',
			usage: '',
			guildOnly: true,
			cooldown: 0
		});
	}

	async run(message, args) {

        const members = message.guild.members.cache;

        const MemberCount = new MessageEmbed()
        .setColor(colourembed.BotpfpColor)
        .setDescription(`${message.guild.name} has ${members.size} members!`)
        message.channel.send(MemberCount)
		
	}

};