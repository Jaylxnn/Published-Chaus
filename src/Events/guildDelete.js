const Event = require('../Structures/Event');
const colourembed = require('../../shortcutembedcolor.json')
const BotSystemLogs = "829851340095881276"
const TopGGAPIHandler = require('@top-gg/sdk')
const botconfig = require('../../BotConfig.json')
const TopGGHook = new TopGGAPIHandler.Api(botconfig.TopGGToken)
const { MessageEmbed } = require('discord.js')

module.exports = class extends Event {

    async run(guild) {

        const embed = new MessageEmbed()
        .setAuthor(`Bot got removed to Server`, this.client.user.displayAvatarURL())
        .setColor(colourembed.BotpfpColor)
        .setDescription(`${guild.id}`)
        .setTimestamp()
        this.client.channels.cache.get(BotSystemLogs).send(embed)

};

};
