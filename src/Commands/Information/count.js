const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const BotConfig = require("../../../BotConfig.json")

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Server + Mmeber Count globally in the bot. (Only Specific people can run this!)',
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

        let ServerCountAll = this.client.guilds.cache.size
        let MemberCountAll = this.client.users.cache.size

        const Count = new MessageEmbed()
        .setAuthor(`Bot Stats Count`)
        .setColor(colourembed.BotpfpColor)
        .addField("ServerCount", `${ServerCountAll}`)
        .addField("MemberCount All Servers", `${MemberCountAll}`)
        message.channel.send(Count)

	}

};