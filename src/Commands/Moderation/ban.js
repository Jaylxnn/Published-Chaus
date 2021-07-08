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
			aliases: ['bans', 'banable'],
			description: "Bans the person you pinged.",
            category: '<:Hammer:835792865287340033> Moderation',
            usage: '[userid || @user] <reason>',
            guildOnly: true,
            cooldown: 10000,
            userPerms: ["BAN_MEMBERS"],
            botPerms: ["BAN_MEMBERS", "MANAGE_MESSAGES"]
		});
    }
	async run(message, args) {

        if (!message.guild.me.hasPermission('SEND_MESSAGES'))
        return;

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

        const cannotban2 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> *Whoopsie!* You don't have the `BAN_MEMBERS` permission.")
        if (!message.member.hasPermission('BAN_MEMBERS' || message.member.hasPermission("ADMINISTRATOR")))
        return message.channel.send(cannotban2).then(m => m.delete({timeout: 10000}));

        const cannotban7 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> *Uh...* I don't have the `BAN_MEMBERS` permission.")
        if (!message.guild.me.hasPermission('BAN_MEMBERS' || message.guild.me.hasPermission("ADMINISTRATOR")))
        return message.channel.send(cannotban7).then(m => m.delete({timeout: 10000}));

        const cannotban1 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription(`<a:whitex:821671615712329749> *Oopsie!*  You forgot to add an ID or a Mention in the text! If you need help with the comamnd, you do this; \`${this.client.regular_prefix}ban <@user> [reason]\` | I hope this helped you! ^-^`)
        if (!member)
        return message.channel.send(cannotban1).then(m => m.delete({timeout: 13000}));

        const cannotban3 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription(`<a:whitex:821671615712329749> *Uh oh!* I can't find them. Maybe check if they are in the server.`)
        if (!message.member.guild)
        return message.channel.send(cannotban3).then(m => m.delete({timeout: 10000}));

        const cannotban4 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription(`<a:whitex:821671615712329749> *Why?* Don't ban yourself :c You are welcomed here!`)
        if(member.user.id == message.author.id)
        return message.channel.send(cannotban4).then(m => m.delete({timeout: 10000}));

        const cannotban5 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> *Hmm...* This person is not bannable.")
        if (!member.bannable)
        return message.channel.send(cannotban5).then(m => m.delete({timeout: 10000}));

        const cannotban6 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> **Whaa...** Cannot ban someone who has a higher role than you.")
        if (message.member.roles.highest.position < member.roles.highest.position)
        return message.channel.send(cannotban6).then(m => m.delete({timeout: 10000}));

        let reason = 'No reason';

        if (args.length > 1) reason = args.slice(1).join(' ');

        member.send(`You've been banned from \`${message.guild.name}\`. | ${reason}`).then(() =>
        member.ban({ reason: reason })
        .catch(err => {
            if(err) console.log(error);
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
					kickCount: 0,
					banCount: 1,
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
                    banCount: user.banCount + 1
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        guildDB.updateOne({
            CaseCurrentNumber: guildDB.CaseCurrentNumber + 1
        }).then(() => {
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
            const memberbancompleteddmworked = new MessageEmbed()
            .setAuthor("Successfully Banned", message.author.displayAvatarURL())
            .setColor(colourembed.ActionCompleted)
            .setDescription(`<a:whitecheckmark:821673231580790824> **${member}** has been banned.`)
            message.channel.send(memberbancompleteddmworked);
    
            if(guildDB.ServerModLogChannelID == "None") {
                return;
            } else {
                try {
                    const embed = new MessageEmbed()
                    .setAuthor(`Member Banned (#${guildDB.CaseCurrentNumber})`, message.author.displayAvatarURL({ dynamic: true}))
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setColor(colourembed.ActionCompleted)
                    .addField('Moderator', `${message.author} (${message.author.id})`)
                    .addField('User', `${member} (${member.user.id})`)
                    .addField('Reason', reason)
                    .setFooter('Banned Time', this.client.user.displayAvatarURL())
                    .setTimestamp()
                    return this.client.channels.cache.get(guildDB.ServerModLogChannelID).send(embed)
                } catch(error) {
                    return;
                }
            }
        })
    }
};
