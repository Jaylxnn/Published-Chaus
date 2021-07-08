const { MessageEmbed } = require('discord.js');
const colourembed = require("../../../shortcutembedcolor.json")
const Command = require('../../Structures/Command');
const mongoose = require('mongoose');
const Cases = require('../../Modules/CasesModSchema')
const Settings = require('../../Modules/GuildSchema');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['delete', 'messageremove', 'p', 'prune'],
			description: 'Deletes messages on the amount you have entered.',
			category: '<:Hammer:835792865287340033> Moderation',
			usage: '[number]',
			guildOnly: true,
      cooldown: 5000,
      userPerms: ["MANAGE_MESSAGES"],
      botPerms: ["MANAGE_MESSAGES"]
		});
	}

	async run(message, args) {

    if (!message.guild.me.hasPermission('SEND_MESSAGES'))
    return;

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
            Blacklisted: false
          });

          await newSettings.save()
          .then(result => console.log(result))
          .catch(err => console.error(err));
      };
  });

		const amount = args.join(" ");

    const cannotpurge1 = new MessageEmbed()
    .setColor(colourembed.PermissionWrongColor)
    .setDescription("<a:whitex:821671615712329749> *Whoopsie!* You don't have the `MANAGE_MESSAGES` permission.")
    if (!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send(cannotpurge1).then(m => m.delete({timeout: 10000}));

    const cannotpurge2 = new MessageEmbed()
    .setColor(colourembed.PermissionWrongColor)
    .setDescription("<a:whitex:821671615712329749> **Erm...** I don't have the `MANAGE_MEMBERS` permission. Maybe fix that?")
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES' || message.guild.me.hasPermission("ADMINISTRATOR")))
    return message.channel.send(cannotpurge2).then(m => m.delete({timeout: 10000}));

    const noamount = new MessageEmbed()
    .setColor(colourembed.PermissionWrongColor)
    .setDescription("<a:whitex:821671615712329749> *What!* There's no amount! Do between 1-100.")
    if(!amount) return message.reply(noamount)

    const overamount = new MessageEmbed()
    .setColor(colourembed.PermissionWrongColor)
    .setDescription("<a:whitex:821671615712329749> *No!* I can't go above 100, it's too much for me :c")
    if(amount > 100) return message.reply(overamount)

    const notanamount = new MessageEmbed()
    .setColor(colourembed.PermissionWrongColor)
    .setDescription("<a:whitex:821671615712329749> That's not a number silly! Go between 1-100. ")
    if(amount < 1) return message.reply(notanamount)

    await message.channel.messages.fetch({limit: amount}).then(messages => {
        message.channel.bulkDelete(messages
    )});



	  const successpurge = new MessageEmbed()
	  .setColor(colourembed.ActionCompleted)
	  .setDescription(`<a:whitecheckmark:821673231580790824> Successfully deleted ${amount} messages.`)
	  message.channel.send(successpurge).then(msg => {
		msg.delete({ timeout: 9000 })
	  })

    if(guildDB.ServerModLogChannelID == "None") {
      return;
    } else {
      try {

        const embed = new MessageEmbed()
        .setAuthor(`Deleted Messages (#${guildDB.CaseCurrentNumber})`, message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setColor(colourembed.ActionCompleted)
        .addField('Moderator', `${message.author} (${message.author.id})`)
        .addField("Messages", `${amount}`)
        .setFooter('Deleted Messages', this.client.user.displayAvatarURL())
        .setTimestamp()
        return this.client.channels.cache.get(guildDB.ServerModLogChannelID).send(embed)

    } catch(error) {
        return;
    }

  }

	}

};
