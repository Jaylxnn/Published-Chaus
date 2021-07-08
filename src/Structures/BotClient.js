const { Client, Collection, Permissions } = require('discord.js');
const Util = require('./BotUtility.js');
require('dotenv').config()

module.exports = class BotClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone'
		});
		this.validate(options);

		this.commands = new Collection();

		this.aliases = new Collection();

		this.cooldowns = new Collection();

		this.snipes = new Collection()

		this.editedmessage = new Collection()

		this.premiumsubscription = new Collection()

		this.events = new Collection();

		this.utils = new Util(this);

		this.BotOwner = options.BotOwner;

	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('uh girl you messed up the options, fix it bitch');

		if (!process.env.BotToken) throw new Error('girl theres no token whatsoever so fix that');
		this.BotToken = process.env.BotToken;

		if (!options.regular_prefix) throw new Error('bitch wheres the prefix????/');
		if (typeof options.regular_prefix !== 'string') throw new TypeError('chile prefix aint working?!?!??! fix it !');
		this.regular_prefix = options.regular_prefix;
	}

	async start(BotToken = this.BotToken) {
		this.utils.loadCommands();
		this.utils.loadEvents();
		
		await super.login(BotToken);
	}

};