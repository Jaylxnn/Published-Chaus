const Event = require('../Structures/Event');
const colourembed = require('../../shortcutembedcolor.json')

module.exports = class extends Event {

    async run(message) {

        if (message.author.bot) return;
        if (message.content.includes('https://') || message.content.includes('discord.gg')) return;
        let snipes = this.client.snipes.get(message.channel.id) || [];
        if(snipes.length > 5) snipes.slice(0, 4)

        snipes.unshift({ msg: message, image: message.attachments.first()?.proxyURL || null, video: message.attachments.first()?.proxyURL || null, time: Date.now() });

        this.client.snipes.set(message.channel.id, snipes);
    }
};
