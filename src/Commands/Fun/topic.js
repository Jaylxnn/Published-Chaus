const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const ball = require('8ball.js')

const Topic = [
    'Who was the last person that you called or texted?',
    'How old were you when you stopped playing toys?',
    'Would you rather be stuck with your bestie (best friend) or be stuck with your crush?',
    'If you won a lottery, what will you use it on?',
    'Do you have any siblings? If so, how many do you have?',
    'Which one do you prefer on going to a specific country, take a vehicle or plane?',
    'Do you like pets and why?',
    'Would you prefer Netflix or Hulu?',
    'If there was $1000 on the ground, what would you do with it?',
    'What was the last show you watched?',
    'What is your favorite Food?',
    'Do you have any Social Media? If so, what platform do you use?',
    'What are your hobbies?',
    'What is the cutest thing you like?',
    'What are your pronouns?',
    'What is the gift you want from Santa?',
    'Favorite Food?',
    'What video games do you like?',
    'If you had a superpower, what would you do?',
    'What do you like about everyone?',
    'Taco Bell or Taco Truck?',
    'What\'s your favorite Movie?',
    'What\'s the best thing that happened to you during quarentine?',
    'What is your dream job?',
    'Do you enjoy Chaus and it\'s heavy development?',
    'What\'s your favorite Fruit?',
    'Have you ever confessed to someone?',
    'What are the devices you currently have?',
    'What\'s your biggest fear?',
    'What\'s your favorite animal?',
];

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Random category will be generated and you can reply to it.',
			category: '<:Funny:835794439662206986> Fun',
			usage: '',
			guildOnly: true,
			BotOwner: false,
      cooldown: 3000
		});
	}

	async run(message, args) {
    
    message.channel.send(`${Topic[Math.floor(Math.random() * Topic.length)]}`);

	}

};