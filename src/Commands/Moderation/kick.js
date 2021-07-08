const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const mongoose = require('mongoose');
const User = require('../../Modules/userSchema');
const Settings = require('../../Modules/GuildSchema');
const Cases = require('../../Modules/CasesModSchema')
const colourembed = require("../../../shortcutembedcolor.json")

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['kicks', 'kickable'],
			description: "Kicks the person you ping",
            category: '<:Hammer:835792865287340033> Moderation',
            guildOnly: true,
            cooldown: 5000,

		});
    }
	async run(message, args, target) {

        if (!message.guild.me.hasPermission('SEND_MESSAGES'))
        return;

        const cannotmanagemessage = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> *woah!* I don't have the `MANAGE_MESSAGES` perrmision. I need this permission so that way I can delete your message and it won't spam/clog the chat! I hope I'm being helpful! :)")
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send(cannotmanagemessage).then(m => m.delete({timeout: 13000}));

        const member = message.mentions.members.last() || message.guild.members.cache.get(args[0])

        const guildDB = await Settings.findOne({
            ServerID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);

            if (!guild) {
                const newSettings = new Settings({
                _id: mongoose.Types.ObjectId(),
                ServerID: message.guild.id,
                ServerPrefix: this.client.regular_prefix,
                ServerModLogChannelID: "None",
                SuggestionChannelID: 0,
                SuggestionCurrentNumber: 0,
                Blacklisted: false,
        });
                await newSettings.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });



        const cannotkick1 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription(`<a:whitex:821671615712329749> *Oopsie!*  You forgot to add an ID or a Mention in the text! If you need help with the comamnd, you do this; \`${this.client.regular_prefix}kick <@user> [reason]\` | I hope this helped you! ^-^`)
        if (!member)
        return message.channel.send(cannotkick1).then(m => m.delete({timeout: 13000}));

        const cannotkick2 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> *Whoopsie!* You don't have the `KICK_MEMBERS` permission.")
        if (!message.member.hasPermission('KICK_MEMBERS' || message.member.hasPermission("ADMINISTRATOR")))
        return message.channel.send(cannotkick2).then(m => m.delete({timeout: 10000}));

        const cannotkick3 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription(`<a:whitex:821671615712329749> *Uh oh!* I can't find them. Maybe check if they are in the server.`)
        if (!message.member.guild)
        return message.channel.send(cannotkick3).then(m => m.delete({timeout: 10000}));

        const cannotkick4 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription(`<a:whitex:821671615712329749> *Why?* Don't kick yourself :c You are welcomed here!`)
        if(member.user.id == message.author.id)
        return message.channel.send(cannotkick4).then(m => m.delete({timeout: 10000}));

        const cannotkick5 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> *Hmm...* This person is not kickable.")
        if (!member.kickable)
        return message.channel.send(cannotkick5).then(m => m.delete({timeout: 10000}));

        const cannotkick6 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> **Whaa...** Cannot kick someone who has a higher role than you.")
        if (message.member.roles.highest.position < member.roles.highest.position)
        return message.channel.send(cannotkick6).then(m => m.delete({timeout: 10000}));

        const cannotkick7 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> **Erm...** I don't have the `KICK_MEMBERS` permission. Maybe fix that?")
        if (!message.guild.me.hasPermission('KICK_MEMBERS' || message.guild.me.hasPermission("ADMINISTRATOR")))
        return message.channel.send(cannotkick7).then(m => m.delete({timeout: 10000}));



        let reason = 'No reason';

        if (args.length > 1) reason = args.slice(1).join(' ');

        member.send(`You've been kicked from \`${message.guild.name}\`. | ${reason}`).then(() =>
        member.kick({ reason: reason })
        .catch(err => {
            if(err) console.log(err);
        }))
//        member.ban({ reason: reason }
  //      .catch(err => {
    //    if(err) return message.channel.send(`${err}`)


        await User.findOne({
            ServerID: message.guild.id,
            userID: member.user.id
        }, async (err, user) => {
            if (err) console.error(err);

            if (!user) {
				const newUser = new UserDatabase({
                    _id: mongoose.Types.ObjectId(),
					ServerID: message.guild.id,
					userID: member.user.id,
					muteCount: 0,
					warnCount: 0,
					kickCount: 1,
					banCount: 0,
					pronouns: "Not Identified Yet.",
					profiledescription: false,
					trusted: false,
					staffmember: false,
					loved: false,
					knowndeveloper: false,
					swag: false,
					Blacklisted: false,
				});

                await newUser.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            } else {
                user.updateOne({
                    kickCount: user.kickCount + 1
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        }).then(() => {
            guildDB.updateOne({
                CaseCurrentNumber: guildDB.CaseCurrentNumber + 1
            })
            const CaseNumbers = new Cases({
                _id: mongoose.Types.ObjectId(),
                ServerID: message.guild.id,
                CaseNumber: guildDB.CaseCurrentNumber,
                User: member.user.id,
                Reason: reason,
                Messages: false,
                Hidden: false,
                })
            CaseNumbers.save()
            }).then(() => {
                const memberkickcompleteddmworked = new MessageEmbed()
                .setAuthor("Successfully Kicked", message.author.displayAvatarURL())
                .setColor(colourembed.ActionCompleted)
                .setDescription(`<a:whitecheckmark:821673231580790824> **${member}** has been kicked.`)
                message.channel.send(memberkickcompleteddmworked);
    
                if(guildDB.ServerModLogChannelID == "None") {
                    return;
                } else {
                    try {
                        const embed = new MessageEmbed()
                        .setAuthor(`Member Kicked (#${guildDB.CaseCurrentNumber})`, message.author.displayAvatarURL({ dynamic: true }))
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                        .setColor(colourembed.ActionCompleted)
                        .addField('Moderator', `${message.author} (${message.author.id})`)
                        .addField('User', `${member.user} (${member.user.id})`)
                        .addField('Reason', reason)
                        .setFooter('Kicked Time', this.client.user.displayAvatarURL())
                        .setTimestamp()
                        return this.client.channels.cache.get(guildDB.ServerModLogChannelID).send(embed)
                    } catch(error) {
                        return;
                    }
               }
        }) 
    }
};