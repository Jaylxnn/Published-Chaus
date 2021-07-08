const { MessageEmbed, Message } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const MoneyDatabase = require('../../Modules/UserMoneyStatsSchema')
const mongoose = require('mongoose')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
      aliases: ["dep", "depo"],
			description: 'Deposit your money!',
			category: '<:Money:835798941320740864> Economy',
			usage: '<amount>',
			guildOnly: true
		});
	}

	async run(message, args) {
    
    await MoneyDatabase.findOne({
      userID: message.author.id
      }, async (err, user) => {
        if (err) console.error(err)
        var DepositedRequestAmount = args[0]
        const isNaNEmbed = new MessageEmbed()
        .setAuthor(`No Number Included`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(colourembed.PermissionWrongColor)
        .setDescription(`That's not a number silly!`)
        const NoCash = new MessageEmbed()
        .setAuthor(`Insufficient Funds`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(colourembed.PermissionWrongColor)
        .setDescription(`You do not have any Cash Available \`or\` you have less amount of Cash.`)
        if(!user || user.Cash === 0) return message.channel.send(NoCash)
        if (user.Cash < DepositedRequestAmount) return message.channel.send(NoCash)



        if(DepositedRequestAmount == "all") {
          if(!user || user.Cash === 0) return message.channel.send(NoCash)
          const DepositedAllBank = new MessageEmbed()
          .setAuthor(`Deposit Amount`, message.author.displayAvatarURL({ dynamic: true }))
          .setColor(colourembed.BotpfpColor)
          .setDescription(`Deposit **All** of your Cash in your Bank`)
          user.updateOne({
            Bank: user.Bank + user.Cash,
            Cash: 0
          })
          .then(result => console.log(result))
          message.channel.send(DepositedAllBank)
          .catch(err => console.error(err));
        } else if(isNaN(DepositedRequestAmount) || !DepositedRequestAmount) {
          return message.channel.send(isNaNEmbed)
        } /*else {
          const DepositedBank = new MessageEmbed()
          .setAuthor(`Deposit Amount`, message.author.displayAvatarURL({ dynamic: true }))
          .setColor(colourembed.BotpfpColor)
          .setDescription(`Deposit **$${DepositedRequestAmount}** in your Bank`)
          
          user.updateOne({
            Cash: user.Cash -DepositedRequestAmount,
            Bank: user.Bank +DepositedRequestAmount
          })
          .then(result => console.log(result))
          message.channel.send(DepositedBank)
          .catch(err => console.error(err));
        }*/
    }); 
	}

};