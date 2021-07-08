const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const ball = require('8ball.js')

const answers = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes.',
    'Definitely',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Cannot predict now.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.',
  ];

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Ask the *ball random questions and it will answer.',
			category: '<:Funny:835794439662206986> Fun',
			usage: '<question>',
			guildOnly: true,
			BotOwner: false,
      cooldown: 5999
		});
	}

	async run(message, args) {

        const question = args.join(' ');
        if (!question) return message.reply("*woah!* You're missing for putting a question silly!")
        const embed = new MessageEmbed()
          .setAuthor(`${this.client.user.username} says`, this.client.user.displayAvatarURL())
          .setColor(colourembed.BotpfpColor)
          .addField('Answer', `${answers[Math.floor(Math.random() * answers.length)]}`)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
        message.reply(embed);


	}

};