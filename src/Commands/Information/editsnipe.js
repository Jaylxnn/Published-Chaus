const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require('../../../shortcutembedcolor.json');
const moment = require('moment')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['geteditmessage'],
			description: 'Snipe the recent deleted message',
			category: '<:Information:835795138277539850> Information',
			usage: '',
			guildOnly: true,
			cooldown: 0,
		});
	}

	async run(message, args) {
        const editedmessage = this.client.editedmessage.get(message.channel.id);
        const NotEmbedMessages = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription('There aren\'t any recent edited messages.')
        if(!editedmessage) return message.channel.send(NotEmbedMessages);

        const snipededitmsg = +args[0] - 1 || 0;
        const target = editedmessage[snipededitmsg];
        if(!target) return message.channel.send(`Woah! There are only ${editedmessage.length} edited message(s) in here.`);

        const { oldmsg, newmsg, time } = target;
        const Sniped = new MessageEmbed()
        .setAuthor(newmsg.author.tag, newmsg.author.displayAvatarURL({ dynamic: true }));
        if(oldmsg.content) {
            Sniped.addField('Old Message', oldmsg);
        }
        if(newmsg.content) {
            Sniped.addField('New Message', newmsg);
        }
        Sniped.setFooter(`${moment(time).fromNow()} | Pages: ${snipededitmsg + 1}/ ${editedmessage.length}`);
        Sniped.setColor(colourembed.BotpfpColor);
        message.channel.send(Sniped);
	}

};