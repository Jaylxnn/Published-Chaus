const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require('../../../shortcutembedcolor.json');
const moment = require('moment');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['getmessage'],
			description: 'Snipe the recent deleted message',
			category: '<:Information:835795138277539850> Information',
			usage: '',
			guildOnly: true,
			cooldown: 0,
		});
	}

	async run(message, args) {

        const snipes = this.client.snipes.get(message.channel.id);
        if(!snipes) return message.channel.send('No recent deleted messages.');

        const snipe = +args[0] - 1 || 0;
        const target = snipes[snipe];
        if(!target) return message.channel.send(`Woah! There are only ${snipes.length} deleted message(s) in here.`);

        const { msg, time, image } = target;
        const Sniped = new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }));
        if(image) {
            Sniped.setImage(image);
        }
        if(msg.content) {
            Sniped.setDescription(msg.content);
        }
        Sniped.setFooter(`${moment(time).fromNow()} | ${snipe + 1}/ ${snipes.length}`);
        Sniped.setColor(colourembed.BotpfpColor);
        message.channel.send(Sniped);
	}

};