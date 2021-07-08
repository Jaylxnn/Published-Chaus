const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['server', 'guild', 'guildinfo', 'info'],
			description: "Displays the servers info",
			category: '<:Information:835795138277539850> Information',
			guildOnly: true,
			cooldown: 5999
		});
	}

	async run(message) {

		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;
		const owner = await message.guild.members.fetch(message.guild.ownerID);

		const embed = new MessageEmbed()
			.setAuthor(`Server Information`, message.guild.iconURL({ dynamic: true }))
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setColor(colourembed.BotpfpColor)
			.addField('Information', [
				`**Server Name:** ${message.guild.name}`,
				`**Owner:** ${message.guild.owner.user.tag} (${message.guild.owner.id} | ${message.guild.owner.user})`,
				`**Server ID:** ${message.guild.id}`,
				`**Server Created:** ${moment(message.guild.createdTimestamp).format('LT')} | ${moment(message.guild.createdTimestamp).format('LL')} | ${moment(message.guild.createdTimestamp).fromNow()}`,
				'\u200b'
			])
			.addField('Server Stats', [
				`**Member Count:** ${members.size}`,
				`**Emoji Count:** ${emojis.size}`,
				`**Role Count:** ${message.guild.roles.cache.size}`,
				`**Booster Level:** ${message.guild.premiumTier ? `${message.guild.premiumTier}/3` : '0/3'}`,
				`**Booster Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
			])
		message.channel.send(embed);

	}

};