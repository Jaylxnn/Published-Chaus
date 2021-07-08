const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const MoneyDatabase = require('../../Modules/UserMoneyStatsSchema')
const colourembed = require("../../../shortcutembedcolor.json")
const mongoose = require('mongoose')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["bal", "total", "currency", "money"],
			description: 'Check your current balance!',
			category: '<:Money:835798941320740864> Economy',
			usage: '',
			guildOnly: true,
			cooldown: 5000
		});
	}

	async run(message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
         
        if(!member) return message.channel.send(`*Whoopsie!* That is not a real member!`)

		const TotalMoney = await MoneyDatabase.findOne({
			userID: member.user.id
		}, async (err, user) => {
		  if (err) console.error(err);
  
		  if (!user) {
			  const newMoneyDatabase = new MoneyDatabase({
				_id: mongoose.Types.ObjectId(),
				userID: member.user.id,
				Cash: 0,
				Bank: 0,
				PensiveMode: false,
			  });
  
			  await newMoneyDatabase.save()
			  .then(result => console.log(result))
			  .catch(err => console.error(err));
		  };
	  });

   		const BalanceEmbed = new MessageEmbed()
    	.setAuthor(`${member.user.username}'s Total Balance`, member.user.displayAvatarURL({ dynamic: true }))
        .setColor(colourembed.BotpfpColor)
		.addField(`Balance`, [
			`**Cash**: ${TotalMoney.Cash || 0}`,
			`**Bank**: ${TotalMoney.Bank || 0}`
		])
		.setFooter(`Requested By ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(BalanceEmbed);
		
	}

};