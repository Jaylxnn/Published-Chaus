const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const BotConfig = require("../../../BotConfig.json")
const User = require('../../Modules/userSchema');
const mongoose = require('mongoose')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["badge"],
			description: 'How many servers the bot are in (ONLY SPECIFIC PEOPLE CAN USE THIS COMMAND)',
			category: '<:Information:835795138277539850> Information',
			usage: '',
			guildOnly: true,
      		cooldown: 5999
		});
	}

	

	async run(message, args) {

		const BotServer = this.client.guilds.cache.get(BotConfig.SupportServerID)
		const Messenger = BotServer.members.cache.get(message.author.id)

		const hasAdministratorRole = Messenger ? Messenger.roles.cache.some(role => role.id === BotConfig.Administration) : false

		if(!hasAdministratorRole) return;

		let serverlist = ''
        this.client.guilds.cache.forEach((guild) => {
            serverlist = serverlist.concat(" - " + guild.name + ": ID: " + guild.id + " MEMBERS: " +guild.members.cache.size + "\n")
        })

		console.log(serverlist)

	}

};