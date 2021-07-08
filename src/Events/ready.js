const Event = require('../Structures/Event');
const { MessageEmbed, Message } = require('discord.js');
const colourembed = require('../../shortcutembedcolor.json')
const botconfig = require('../../BotConfig.json')
const TopGGAPIHandler = require('@top-gg/sdk')
const TopGGHook = new TopGGAPIHandler.Api(botconfig.TopGGToken)

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	run() {
		console.log([
			`Operating as ${this.client.user.tag}`,
			`${this.client.commands.size} commands running.`,
			`Loaded ${this.client.events.size} events!`
		].join('\n'));

		const activities = [
			`I hope I can meet new friends!`,
			`Have a great day/night <3`,
			`You are important!`,
			`You matter!`,
			`Need help with me? Join the Support Server!`,
		];

		//console.log(this.client.user.guilds.map(v=>v.name).join('\n'));


		let i = 0;
		this.client.user.setActivity(`${this.client.regular_prefix}commands | ${activities[i++ % activities.length]}`, { type: 'WATCHING' })
		
		setInterval(() => this.client.user.setActivity(`${this.client.regular_prefix}commands | ${activities[i++ % activities.length]} | ${this.client.users.cache.size} users!`, { type: 'WATCHING' }), 290000); 

	}

};
