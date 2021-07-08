const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const BotConfig = require('../../../BotConfig.json')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["say"],
			description: 'talks (only works for bot owner)',
			category: '<:Information:835795138277539850> Information',
			usage: '',
			guildOnly: true,
			cooldown: 0
		});
	}

	async run(message, args) {

        const BotServer = this.client.guilds.cache.get(message.guild.id)
		const Messenger = BotServer.members.cache.get(message.author.id)

		const hasAdministratorRole = Messenger ? Messenger.roles.cache.some(role => role.id === "847926022355025920") : false

		if(!hasAdministratorRole) return;

        const Server = this.client.guilds.cache.get(args[0])
        const channel = Server.channels.cache.get(args[1])
        const requestsaying = args.slice(2).join(' ');

        if(!Server || !channel || !requestsaying) return;

        message.channel.send(`sent message`)

        channel.send(requestsaying)
        

		
	}

};