const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const colourembed = require("../../../shortcutembedcolor.json")
const { MessageButton } = require('discord-buttons')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: "Invite the bot to your server!",
			category: '<:Information:835795138277539850> Information',
			guildOnly: false,
			cooldown: 5999
		});
	}

	async run(message) {
		const ClientID = this.client.user.id
        if (!message.guild.me.hasPermission('SEND_MESSAGES')) {
            return;
        } else {
		const invitebot = new MessageEmbed()
		.setColor(colourembed.BotpfpColor)
		.setAuthor(`Invite Panel`, message.author.displayAvatarURL({ dynamic: true }))


		const Invite = new MessageButton()
		.setStyle('url')
		.setLabel(`Invite ${this.client.user.username} to your server!`)
		.setURL(`https://discord.com/oauth2/authorize?client_id=${ClientID}&scope=bot&permissions=335635606`)

		const JoinServer = new MessageButton()
		.setStyle('url')
		.setLabel(`Join the ${this.client.user.username} Support Server`)
		.setURL(`https://discord.gg/8sEZyVzKXF`)

		message.channel.send({
			buttons: [Invite, JoinServer],
			embed: invitebot
		})

        }


	}

};