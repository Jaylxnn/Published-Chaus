const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const Settings = require("../../Modules/GuildSchema")
const mongoose = require('mongoose');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["setactionlog", "setlog"],
			description: 'Set the Action Log when used for Moderation commands.',
			category: '<:Hammer:835792865287340033> Moderation',
			usage: '[channel]',
			guildOnly: true,
			cooldown: 5000,
		});
	}

	async run(message, args) {

        const cannotpurge1 = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription("<a:whitex:821671615712329749> *Whoopsie!* You don't have the `MANAGE_SERVER` permission.")
        if (!message.member.hasPermission('MANAGE_GUILD' || message.member.hasPermission("ADMINISTRATOR")))
        return message.channel.send(cannotpurge1).then(m => m.delete({timeout: 10000}));

        const channel = await message.mentions.channels.first();

        const cannotfindchannel = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription('<a:whitex:821671615712329749> *Whoops!* I can\'t find that channel.. Aw :c')

        if (!channel)
        return message.channel.send(cannotfindchannel).then(m => m.delete({timeout: 10000}));

        await Settings.findOne({
            ServerID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const newSettings = new Settings({
                    _id: mongoose.Types.ObjectId(),
                    ServerID: message.guild.id,
                    ServerPrefix: this.client.regular_prefix,
                    ServerModLogChannelID: channel.id
                });

                await newSettings.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
                
                const actioncompleted1 = new MessageEmbed()
                .setColor(colourembed.ActionCompleted)
                .setDescription(`<a:whitecheckmark:821673231580790824> **${channel}** has been set as the Action Logs`)
                return message.channel.send(actioncompleted1);
            } else {
                Settings.updateOne({
                    ServerModLogChannelID: channel.id
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));

                const actioncompleted2 = new MessageEmbed()
                .setColor(colourembed.ActionCompleted)
                .setDescription(`<a:whitecheckmark:821673231580790824> **${channel}** has been set as the Action Logs`)
                return message.channel.send(actioncompleted2);
            };
        });
		
	}

};