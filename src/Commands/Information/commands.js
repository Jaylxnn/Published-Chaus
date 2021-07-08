const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
//const banner = require('../../Images/chausbanner')
const { stripIndents } = require('common-tags')
const { MessageButton } = require('discord-buttons')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['help', 'command', 'cmds'],
			description: `Shows you all available commands for the bot! ^-^`,
			category: '<:Information:835795138277539850> Information',
			usage: '[command]',
			guildOnly: true,
			cooldown: 5999
		});
	}

	async run(message, [command]) {

        if (!message.guild.me.hasPermission('SEND_MESSAGES')) {
            return;
        } else {
		if (!message.guild.me.hasPermission('ADD_REACTIONS'))
        return;
		
		const helpembed = new MessageEmbed()
			.setColor(colourembed.BotpfpColor)
			.setAuthor(`${this.client.user.username}'s Commands Menu`, this.client.user.displayAvatarURL())
			.setFooter(`Requested By ${message.author.username}`)
			.setTimestamp();

		if (command) {
			const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

			const notcommandembed = new MessageEmbed()
			.setColor(colourembed.PermissionWrongColor)
			.setDescription(`<a:whitex:821671615712329749> \`${command}\` is not a command. Hmm...`)

			if (!cmd) return message.channel.send(notcommandembed);

			helpembed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Command Information`, this.client.user.displayAvatarURL());
			helpembed.setDescription([
				`**Aliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'None'}`,
				`**Category:** ${cmd.category}`,
				`**Description:** ${cmd.description}`,
				`**Usage:** ${cmd.usage}`
			]);

			return message.channel.send(helpembed);
		} else {
			let categories;

			if(message.guild.id !== "828722793121972245") {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'ChausAdministration').map(cmd => cmd.category));
			} else {
				categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
			}

			for (const category of categories) {
				helpembed.addField(`**${this.client.utils.capitalise(category)}**`, `${this.client.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' ')}`, true);
			}

			const InviteBotButton = new MessageButton()
			.setStyle('url')
			.setLabel(`Invite ${this.client.user.username} to your server!`)
			.setURL(`https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=4227984598`)

			const VoteButton = new MessageButton()
			.setStyle('url')
			.setLabel(`Vote ${this.client.user.username}`)
			.setURL(`https://top.gg/bot/821653425778720768/vote`)

			const SupportServerButton = new MessageButton()
			.setStyle('url')
			.setLabel(`Join ${this.client.user.username} Support Server!`)
			.setURL(`https://discord.gg/8sEZyVzKXF`)
	

			//helpembed.addField(this.client.user.username, "[Invite me](https://discord.com/oauth2/authorize?client_id=821653425778720768&scope=bot&permissions=4227984598) - [Vote me](https://top.gg/bot/821653425778720768/vote) - [Support Server](https://discord.gg/8sEZyVzKXF)")
			helpembed.setDescription(`Thank you for using Chaus! We are no longer in Heavy Development and have changed a lot of things, I hope you enjoy them!`)
			//embed.setImage(banner)
			message.channel.send({
				buttons: [InviteBotButton, VoteButton, SupportServerButton],
				embed: helpembed
			})
			//message.author.send(embed);
		}
        }


	}

};