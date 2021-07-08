const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const fetch = require('node-fetch')
const colourembed = require("../../../shortcutembedcolor.json");
require('dotenv').config();

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            aliases: ['activities'],
			description: 'Watch or Play Discord\'s Activities. The only working Activity is `Youtube`. More Activities are getting Added.',
			category: '<:Funny:835794439662206986> Fun',
			usage: '<activity>',
			guildOnly: true,
			cooldown: 3000
		});
	}

	async run(message, args) {

        function ErrorSad() {
            const SadEmbed = new MessageEmbed()
            .setColor(colourembed.PermissionWrongColor)
            .setDescription('An Error Happened! Possible Errors: `Not in Voice Channel`, `Bot Error`, `Not a Available Activity`, or `Auth Denied`.')
            .setFooter('The only Available Activity are Youtube, Fishington.io, Betrayal.io, & Poker Night.')
            message.channel.send(SadEmbed)
        }

        let VoiceChat = message.member.voice.channel;
        if(!VoiceChat) return ErrorSad()

        if(args[0] === 'youtube') {
            fetch(`https://discord.com/api/v8/channels/${VoiceChat.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "755600276941176913",
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${process.env.BotToken}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(invite => {
                if(!invite.code) return ErrorSad()
                const YoutubeWatch = new MessageEmbed()
                .setAuthor('Created Youtube Together')
                .setColor(colourembed.BotpfpColor)
                .setDescription(`[Click Here](https://discord.com/invite/${invite.code}) to watch Youtube with your Friends or by yourself!`)
                message.channel.send(YoutubeWatch)
            })
        } else if(args[0] === 'poker' || args[0] === 'poker night') {
            fetch(`https://discord.com/api/v8/channels/${VoiceChat.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "755827207812677713",
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${process.env.BotToken}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(invite => {
                if(!invite.code) return ErrorSad()
                const Poker = new MessageEmbed()
                .setAuthor('Created Poker Night')
                .setColor(colourembed.BotpfpColor)
                .setDescription(`[Click Here](https://discord.com/invite/${invite.code}) to play Poker Night with your friends!`)
                message.channel.send(Poker)
            })
        } else if(args[0] == "fishington.io" || args[0] == "fish" || args[0] == "fishing") {
            fetch(`https://discord.com/api/v8/channels/${VoiceChat.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "814288819477020702",
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${process.env.BotToken}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(invite => {
                if(!invite.code) return ErrorSad()
                const Fish = new MessageEmbed()
                .setAuthor('Created Fishington.io')
                .setColor(colourembed.BotpfpColor)
                .setDescription(`[Click Here](https://discord.com/invite/${invite.code}) to play Fishington.io!`)
                message.channel.send(Fish)
            })
        } else if(args[0] == "betrayal" || args[0] == "betrayal.io") {
            fetch(`https://discord.com/api/v8/channels/${VoiceChat.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "773336526917861400",
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${process.env.BotToken}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(invite => {
                if(!invite.code) return ErrorSad()
                const BetrayalIO = new MessageEmbed()
                .setAuthor('Created Betrayal.io')
                .setColor(colourembed.BotpfpColor)
                .setDescription(`[Click Here](https://discord.com/invite/${invite.code}) to play Betrayal.io with your friends!`)
                message.channel.send(BetrayalIO)
            })
        } else if(!args[0]) return ErrorSad()

        
	}

};