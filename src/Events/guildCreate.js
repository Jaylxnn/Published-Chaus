const Event = require('../Structures/Event');
const colourembed = require('../../shortcutembedcolor.json')
const BotSystemLogs = "829851340095881276"
const TopGGAPIHandler = require('@top-gg/sdk')
const botconfig = require('../../BotConfig.json')
const TopGGHook = new TopGGAPIHandler.Api(botconfig.TopGGToken)
const { MessageEmbed } = require('discord.js')

module.exports = class extends Event {

    async run(guild) {

        const owner = await guild.members.fetch(guild.ownerID);
        const embed = new MessageEmbed()
        .setAuthor(`Bot got added to Server`, this.client.user.displayAvatarURL())
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setColor(colourembed.BotpfpColor)
        .addField(`Guild ID`, `${guild.id}`)
        .addField(`MemberCount`, `${guild.members.cache.size}`)
        .addField(`Owner`, `${guild.owner.user.tag}`)
        .addField(`Guild Name`, `${guild.name}`)
        .setFooter(`User ID: ${guild.owner.user.id}`, guild.iconURL({ dynamic: true }))
        .setTimestamp()
        this.client.channels.cache.get(BotSystemLogs).send(embed)
        .catch(err => console.error(err));

	}

};
