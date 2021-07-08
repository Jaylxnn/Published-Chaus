const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const db = require('quick.db')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["brb", "gtg"],
			description: 'Set your afk and when you type, your afk will turn off!',
			category: '<:Information:835795138277539850> Information',
			usage: '',
			guildOnly: true,
            cooldown: 5000
		});
	}

	async run(message, args) {

        let reasontobeafk = args.join(" ")
        if(!reasontobeafk) reasontobeafk = "AFK"

        await db.set(`afk-${message.author.id}+${message.guild.id}`, reasontobeafk)
        const embed = new MessageEmbed()
        .setDescription(`AFK has been set | ${reasontobeafk}`)
        .setColor(colourembed.BotpfpColor)
        message.channel.send(message.author, embed)

	}

};