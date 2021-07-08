const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const mongoose = require('mongoose');
const Settings = require('../../Modules/GuildSchema');
const Cases = require('../../Modules/CasesModSchema')
const colourembed = require("../../../shortcutembedcolor.json")

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['unbans', 'unb'],
			description: "Unban a Member",
            usage: "<id>",
            category: '<:Hammer:835792865287340033> Moderation',
            guildOnly: true,
            cooldown: 5000,
            userPerms: ["MANAGE_MESSAGES", "BAN_MEMBERS"],
            botPerms: ["MANAGE_MESSAGES", "BAN_MEMBERS"]
		});
    }
	async run(message, args) {

        if (!message.guild.me.hasPermission('SEND_MESSAGES'))
        return;

        const cannotunban1 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> *Whoopsie!* You don't have the `BAN_MEMBERS` permission.")
        if (!message.member.hasPermission('BAN_MEMBERS' || message.member.hasPermission("ADMINISTRATOR")))
        return message.channel.send(cannotunban1).then(m => m.delete({timeout: 10000}));

        const cannotunban2 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> **Erm...** I don't have the `BAN_MEMBERS` permission. Maybe fix that?")
        if (!message.guild.me.hasPermission('BAN_MEMBERS' || message.guild.me.hasPermission("ADMINISTRATOR")))
        return message.channel.send(cannotunban2).then(m => m.delete({timeout: 10000}));

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
                    CaseCurrentNumber: 0,
                    Blacklisted: false
                });

                await newSettings.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        if (!args[0]) return message.channel.send('Oops~ Please provide a User ID to unban.').then(m => m.delete({ timeout: 5000 }));

        let member;

        try {
            member = await this.client.users.fetch(args[0])
        } catch (e) {
            console.log(e)
            return message.channel.send('woah! maybe check if they are a real user?').then(m => m.delete({ timeout: 5000 }));
        }

        let reason = 'No reason';
        if (args.length > 1) reason = args.slice(1).join(' ');

        const embed = new MessageEmbed()

        message.guild.fetchBans().then( bans => {

            const user = bans.find(ban => ban.user.id === member.id );

            const hasbeenunbanned = new MessageEmbed()
            .setColor(colourembed.ActionCompleted)
            .setDescription(`<a:whitecheckmark:821673231580790824> **${user.user.tag}** has been unbanned.`)
            .setFooter(`User ID: ${user.user.id}`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            message.channel.send(hasbeenunbanned)


                if(guildDB.ServerModLogChannelID == "None") {
                    return;
                } else {
                if (user) {
                    try {
                    const UnBannedLog = new MessageEmbed.apply()
                    .setAuthor(`Successfully Unbanned (#${guildDB.CaseCurrentNumber})`, user.user.displayAvatarURL({ dynamic: true }))
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                    .setColor(colourembed.ActionCompleted)
                    .addField('Moderator', `${message.author} (${message.author.id})`)
                    .addField('Unbanned Member', `${user.user} (${user.user.id})`)
                    .addField('Reason', reason)
                    message.channel.send(UnBannedLog)
                    message.guild.members.unban(user.user.id, reason)
                    this.client.channels.cache.get(guildDB.ServerModLogChannelID).send(UnBannedLog)
                    } catch(error) {
                        console.log(error)
                    }
                } else {
                    embed.setDescription(`<a:whitex:821671615712329749> ${member.tag} isn't banned!`)
                    embed.setColor(colourembed.PermissionWrongColor)
                    message.channel.send(embed).then(m => m.delete({timeout: 10000}));
                }
            }
    
            }).catch(e => {
                console.log(e)
                message.channel.send('*Whoops!* Something happened, maybe trust again?')
            });
    }
};