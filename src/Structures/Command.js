const { Permissions } = require('discord.js');

module.exports = class Command {

	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.aliases = options.aliases || [];
		this.cooldown = options.cooldown;
		this.description = options.description || 'Blank';
		this.category = options.category || 'Main';
		this.usage = `${this.client.regular_prefix}${this.name} ${options.usage || ''}`.trim();
		this.guildOnly = options.guildOnly || false;
		this.BotOwner = options.BotOwner || false;
		this.PremiumOnly = options.PremiumOnly || false
		this.userPerms = options.userPerms || "None";
		this.botPerms = options.botPerms || "None";
		this.nsfw = options.nsfw || false;
		this.args = options.args || false;
	}
	async run(message, args) {
		throw new Error(`Command ${this.name} doesn't provide a run method!`);
	}

};