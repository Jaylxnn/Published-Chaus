const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['av', 'profilepicture', 'pfp'],
			description: 'Shows the person profile picture.',
			category: '<:Information:835795138277539850> Information',
			usage: '<@user> or <userid>',
			guildOnly: true,
            cooldown: 5999
		});
	}

	async run(message, args) {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

            const nomember = new MessageEmbed()
            .setColor(colourembed.PermissionWrongColor)
            .setDescription("<a:whitex:821671615712329749> *Erm...* There is no member in that message or not a real member?")
            if(!member)
            return message.channel.send(nomember).then(m => m.delete({timeout: 10000}));

        
            const AvatarEmbed = new MessageEmbed()
            .setColor(colourembed.BotpfpColor)
            .setAuthor(`${member.user.username}'s Avatar`, member.user.displayAvatarURL({ dynamic: true }))
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            message.channel.send(AvatarEmbed);

	}

};