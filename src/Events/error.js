const Event = require('../Structures/Event');
const colourembed = require('../../shortcutembedcolor.json')
const BotSystemLogs = "829851340095881276"
const { MessageEmbed } = require('discord.js')

module.exports = class extends Event {

    async run(error) {

        const ErrorEmbed = new MessageEmbed()
        .setAuthor(`Error Detected!`)
        .setColor(colourembed.PermissionWrongColor)
        .setDescription(`\`${error}\``)
        .setFooter(`Please check if this error can be fixed or not.`)
        this.client.channels.cache.get(BotSystemLogs).send(ErrorEmbed)

	}

};
