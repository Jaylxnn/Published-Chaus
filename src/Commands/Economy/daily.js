const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const MoneyDatabase = require('../../Modules/UserMoneyStatsSchema')
const mongoose = require('mongoose');
const DailyTimeOut = new Set();

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Get your daily money! [ONCE YOU DAILY YOU MUST WAIT 24 HOURS]',
			category: '<:Money:835798941320740864> Economy',
			usage: '',
			guildOnly: true
		});
	}

	async run(message, args) {

    if (DailyTimeOut.has(message.author.id)) {
        const SlowdownonDaily = new MessageEmbed()
        .setAuthor(`Already Claimed`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(colourembed.BotpfpColor)
        .setDescription(`You've already claimed your daily, wait 24 hours.`)
        message.channel.send(SlowdownonDaily);
    } else {

      let amount = Math.floor(Math.random() * 1000) + 1;

      await MoneyDatabase.findOne({
          userID: message.author.id
      }, async (err, user) => {
        if (err) console.error(err);

        if (!user) {
            const newMoneyDatabase = new MoneyDatabase({
              _id: mongoose.Types.ObjectId(),
              userID: message.author.id,
              Cash: amount,
              Bank: 0,
              lb: "all",
              PensiveMode: false,
            });

            await newMoneyDatabase.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));
        } else {
            user.updateOne({
                Cash: user.Cash + amount
            })
            .then(result => console.log(result))
            .catch(err => console.error(err));
        };
    });
    
        const embed = new MessageEmbed()
        .setAuthor(`Collected Daily`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(colourembed.BotpfpColor)
        .setDescription(`**Collected**: ${amount}`)
        message.channel.send(embed)

        DailyTimeOut.add(message.author.id);
        setTimeout(() => {
          DailyTimeOut.delete(message.author.id);
        }, 86400000);
    }

		
	}

};