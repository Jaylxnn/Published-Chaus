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
			aliases: ['warns'],
			description: "Warn a member and the bot will DM them if they can.",
            category: '<:Hammer:835792865287340033> Moderation',
            usage: '[userid || @user]',
            guildOnly: true,
            cooldown: 9000,
            userPerms: ["KICK_MEMBERS"],
            botPerms: ["MANAGE_MESSAGES"]
		});
    }
	async run(message, args, target) {

        if (!message.guild.me.hasPermission('SEND_MESSAGES')) return;

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

        const cannotwarn1 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> *Whoopsie!* You don't have the `KICK_MEMBERS` permission.")
        if (!message.member.hasPermission('KICK_MEMBERS' || message.member.hasPermission("ADMINISTRATOR")))
        return message.channel.send(cannotwarn1).then(m => m.delete({timeout: 10000}));

        const cannotwarn2 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription(`<a:whitex:821671615712329749> *Oopsie!*  You forgot to add an ID or a Mention in the text! If you need help with the comamnd, you do this; \`${this.client.regular_prefix}warn <@user> [reason]\` | I hope this helped you! ^-^`)
        if (!member)
        return message.channel.send(cannotwarn2).then(m => m.delete({timeout: 13000}));

        const cannotwarn3 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription(`<a:whitex:821671615712329749> *Uh oh!* I can't find them. Maybe check if they are in the server.`)
        if (!message.member.guild)
        return message.channel.send(cannotwarn3).then(m => m.delete({timeout: 10000}));


        let reason = 'No reason';

        if (args.length > 1) reason = args.slice(1).join(' ');

        member.send(`You've been warned from \`${message.guild.name}\`. | ${reason}`)
        .catch(err => {
            const couldntdm = new MessageEmbed()
            .setColor(colourembed.PermissionWrongColor)
            .setDescription(`I couldn\'t send a DM to the user due to their DMs being closed (\`Privacy Settings\`)`)
            message.channel.send(couldntdm)
            if(err) console.log(err);
        })
//        member.ban({ reason: reason }
  //      .catch(err => {
    //    if(err) return message.channel.send(`${err}`)


        await User.findOne({
            ServerID: message.guild.id,
            userID: member.id
        }, async (err, user) => {
            if (err) console.error(err);

            if (!user) {
				const newUser = new UserDatabase({
                    _id: mongoose.Types.ObjectId(),
					ServerID: message.guild.id,
					userID: member.user.id,
					muteCount: 0,
					warnCount: 1,
					kickCount: 0,
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
                    warnCount: user.warnCount + 1
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

            const memberwarncompleteddmworked = new MessageEmbed()
            .setAuthor(`Successfully Warned`, message.author.displayAvatarURL())
            .setColor(colourembed.ActionCompleted)
            .setDescription(`<a:whitecheckmark:821673231580790824> **${member}** has been warned.`)

            guildDB.updateOne({
                CaseCurrentNumber: guildDB.CaseCurrentNumber + 1
            }).then(() => {
                message.channel.send(memberwarncompleteddmworked);
                if(guildDB.ServerModLogChannelID == "None") {
                    return;
                } else {
                    try {
                        const embed = new MessageEmbed()
                        .setAuthor(`Member Warned (#${guildDB.CaseCurrentNumber})`, message.author.displayAvatarURL({ dynamic: true }))
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                        .setColor(colourembed.ActionCompleted)
                        .addField('Moderator', `${message.author} (${message.author.id})`)
                        .addField('User', `${member.user} (${member.user.id})`)
                        .addField('Reason', reason)
                        .setFooter('Warned Time', this.client.user.displayAvatarURL())
                        .setTimestamp()
                        return this.client.channels.cache.get(guildDB.ServerModLogChannelID).send(embed)
                    } catch(error) {
                        return;
                    }
                }
            })
    }
};
