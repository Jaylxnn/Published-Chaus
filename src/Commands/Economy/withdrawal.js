const { MessageEmbed, Message } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const MoneyDatabase = require('../../Modules/UserMoneyStatsSchema')
const mongoose = require('mongoose')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
      aliases: ["withdrawn", "take"],
			description: 'Take out money from your Bank',
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
        var WithdrawalRequestAmount = args[0]
        const isNaNEmbed = new MessageEmbed()
        .setAuthor(`No Number Included`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(colourembed.PermissionWrongColor)
        .setDescription(`That's not a number silly!`)
        const NoCash = new MessageEmbed()
        .setAuthor(`Insufficient Funds`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(colourembed.PermissionWrongColor)
        .setDescription(`You do not have any Cash available \`or\` you have less amount of Cash in your Bank.`)
        if(isNaN(WithdrawalRequestAmount) || !WithdrawalRequestAmount) return message.channel.send(isNaNEmbed)
        if(!user || user.Bank === 0) return message.channel.send(NoCash)
        if (user.Bank < WithdrawalRequestAmount) return message.channel.send(NoCash)



        if(WithdrawalRequestAmount == "all") {
          if(!user || user.Bank === 0) return message.channel.send(NoCash)
          const DepositedAllBank = new MessageEmbed()
          .setAuthor(`Withdrawal Amount`, message.author.displayAvatarURL({ dynamic: true }))
          .setColor(colourembed.BotpfpColor)
          .setDescription(`Withdrawn **All** of your Cash to your Wallet.`)
          user.updateOne({
            Cash: user.Cash + user.Bank,
            Bank: 0
          })
          .then(result => console.log(result))
          message.channel.send(DepositedAllBank)
          .catch(err => console.error(err));
        } else if(isNaN(WithdrawalRequestAmount) || !WithdrawalRequestAmount) return message.channel.send(isNaNEmbed)

        if(isNaN(WithdrawalRequestAmount) || !WithdrawalRequestAmount) return message.channel.send(isNaNEmbed)

        const DepositedBank = new MessageEmbed()
        .setAuthor(`Withdrawal Amount`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(colourembed.BotpfpColor)
        .setDescription(`Withdrawn **$${WithdrawalRequestAmount}** to your Wallet.`)
        
        user.updateOne({
          Bank: user.Bank - WithdrawalRequestAmount,
          Cash: user.Cash + WithdrawalRequestAmount
        })
        .then(result => console.log(result))
        message.channel.send(DepositedBank)
        .catch(err => console.error(err));
    }); 
	}

};