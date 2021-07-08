const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            aliases: ['rps'],
			description: 'Play rock paper scissors with the bot!',
			category: '<:Funny:835794439662206986> Fun',
			usage: 'rock || paper || scissors',
			guildOnly: true,
            cooldown: 5000
		});
	}

	async run(message, args) {

        if (!args[0]) {
            return message.channel.send('*uhm.* You didn\'t include a choice?')
        }

        let choices = ['rock', 'paper', 'scissors'];
        if (choices.includes((args[0]).toLowerCase())) {
            let number = Math.floor(Math.random() * 3);
            if (number == 1) {
                const TieMatch = new MessageEmbed()
                .setColor("YELLOW")
                .setDescription(`*Woah!* It's a tie! We both did the same choice, let's do this again!!!`)
                return message.channel.send(TieMatch)
            }
            if (number == 2) {
                if ((args[0]).toLowerCase() == "rock") {
                    const BotRockMatch = new MessageEmbed()
                    .setColor(colourembed.BotpfpColor)
                    .setDescription(`*yay!* I won! My choice was **Paper**. Do not worry, you will win soon, I know you will! <3`)
                    return message.channel.send(BotRockMatch)
                }
                if ((args[0]).toLowerCase() == "paper") {
                    const BotPaperMatch = new MessageEmbed()
                    .setColor(colourembed.BotpfpColor)
                    .setDescription(`*yay!* I won! My choice was **Scissors**. Do not worry, you will win soon, I know you will! <3`)
                    return message.channel.send(BotPaperMatch)
                }
                if ((args[0]).toLowerCase() == "scissors") {
                    const BotScissorsMatch = new MessageEmbed()
                    .setColor(colourembed.BotpfpColor)
                    .setDescription(`*yay!* I won! My choice was **Rock**. Do not worry, you will win soon, I know you will! <3`)
                    return message.channel.send(BotScissorsMatch)
                }
            }
            if (number == 0) {
                if ((args[0]).toLowerCase() == "rock") {
                    const PlayerRockMatch = new MessageEmbed()
                    .setColor(colourembed.ActionCompleted)
                    .setDescription(`*Whoohoo!* You won! Your choice was **Rock**. You did it! You are a expert at this ^-^`)
                    return message.channel.send(PlayerRockMatch)
                }
                if ((args[0]).toLowerCase() == "paper") {
                    const PlayerPaperMatch = new MessageEmbed()
                    .setColor(colourembed.ActionCompleted)
                    .setDescription(`*Whoohoo!* You won! Your choice was **Paper**. I cannot believe this! You're a pro!`)
                    return message.channel.send(PlayerPaperMatch)
                }
                if ((args[0]).toLowerCase() == "scissors") {
                    const PlayerScissorsMatch = new MessageEmbed()
                    .setColor(colourembed.ActionCompleted)
                    .setDescription(`*Whoohoo!* You won! Your choice was **Scissors**. Oh my god! You are better than me!`)
                    return message.channel.send(PlayerScissorsMatch)
                }
            }
        } else {
            return message.channel.send('*whaa* That\'s not a choice silly! You got to choose between **Rock**, **Paper** or **Scissors**.')
        }
		
	}

};