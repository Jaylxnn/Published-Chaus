const Event = require('../../Structures/Event');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const colourembed = require('../../../shortcutembedcolor.json')
const db = require('quick.db')
const BotConfig = require('../../../BotConfig.json')
const mongoose = require('mongoose')
const userSchema = require('../../Modules/userSchema')

module.exports = class extends Event {

	
	async run(message) {
		const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
		const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);
      
      // reminder to self; blacklist ppl who snipe my messages

		if (message.author.bot) return;


		const BotServer = this.client.guilds.cache.get(BotConfig.SupportServerID)
		const Messenger = BotServer.members.cache.get(BotConfig.BotOwner)

		if(message.guild) {
			if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
				await db.delete(`afk-${message.author.id}+${message.guild.id}`)
				message.reply(`Welcome Back! Your AFK has been removed.`)
			}
	
			if(message.mentions.members.first()) {
				if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
					message.channel.send(`${message.mentions.members.first().user.username} is AFK | ` + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
				};
			}
		}
		if (message.content.match(mentionRegex)) message.channel.send(`*Boop!* My prefix/command is \`${this.client.regular_prefix}\`! ^-^`);

		//const customizeableprefix = db.fetch(`prefix_${message.guild.id}`)

		const prefix = message.content.match(mentionRegexPrefix) ?
			message.content.match(mentionRegexPrefix)[0] : this.client.regular_prefix 
		
		if(message.content.includes("jaylen") || message.content.includes("Jaylen") || message.content.includes("363571068012593156")) {
			const namecalled = new MessageEmbed()
			.setAuthor(`Named Triggered!`)
			.setDescription(`click [here](${message.url}) if you want to see the message`)
			.addField('Message', message.content)
			.setFooter(`Triggered Server: ${message.guild.name}`)
			.setTimestamp()
			this.client.users.cache.get("363571068012593156").send(`Your name has been said by ${message.author} ${message.author.id}`, namecalled)
			//console.log("the word jaylen, has been triggered")
		}
		if (!message.content.startsWith(prefix)) return;

		const [cmd, ...args] = message.content.slice(prefix.length || customizeableprefix).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
		if (command) {

			//node if (db.find(``))

			if (command.BotOwner && !this.client.utils.checkOwner(message.author.id)) {
				return;
			}

			if (command.guildOnly && !message.guild) {
				return;
			}

			if (command.nsfw && !message.channel.nsfw) {
				return message.reply('Sorry, this command can only be ran in a NSFW marked channel.');
			}

			if (command.args && !args.length) {
				return message.reply(`Oopsie!, You didn't do the command correctly silly, do ${command.usage ?
					`${this.client.regular_prefix + command.name} ${command.usage}` : 'Uh this command does not have a format/usage'}`);
			}

			if (this.client.cooldowns.has(`${message.author.id}-${command.name}`)) {
				const CooldownEmbed = new MessageEmbed()
				.setAuthor(`Hey! Slowdown!`)
				.setColor(colourembed.BotpfpColor)
				.setDescription(`Woah! Slowdown on using the commands, you could break them!`)
				return message.channel.send(message.author, CooldownEmbed)
			}

			if (command.cooldown) {
				this.client.cooldowns.set(`${message.author.id}-${command.name}`, Date.now() + command.cooldown);
				setTimeout(() => {
					this.client.cooldowns.delete(`${message.author.id}-${command.name}`)
				}, command.cooldown);
			}

			if (message.guild) {


				const DoesntHavePermission = new MessageEmbed()
				.setAuthor(`No Permission!`, this.client.user.displayAvatarURL({ dynamic: true}))
				.setColor(colourembed.PermissionWrongColor)
				.setDescription(`<a:whitex:821671615712329749> I do not have \`SEND_MESSAGES\` permission(s).`)
				.setFooter(`The command you inputted will not run in the server.`)
				if(!message.guild.me.hasPermission('SEND_MESSAGES')) {
					try {
						message.author.send(DoesntHavePermission)
					} catch(error) {
						return;
					}
				}
				
				/*const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
				if (userPermCheck) {
					const missing = message.channel.permissionsFor(message.member).missing(userPermCheck);
					if (missing.length) {
						const NoPermissionsMember = new MessageEmbed()
						.setColor(colourembed.PermissionWrongColor)
						.setAuthor(`You do not have Permissions!`, message.author.displayAvatarURL({ dynamic: true }))
						.setDescription(`You do not have ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permission(s).`)
						.setFooter(`This command will not run due to your permissions.`)
						return message.channel.send(NoPermissionsMember);
					}
				}**/

				/*const botPermCheck = command.botPerms ? this.client.defaultPerms.add(command.botPerms) : this.client.defaultPerms;
				if (botPermCheck) {
					const missing = message.channel.permissionsFor(this.client.user).missing(botPermCheck);
					if (missing.length) {
						const NoPermissionsBot = new MessageEmbed()
						.setColor(colourembed.PermissionWrongColor)
						.setAuthor(`Do not have Permissions!`, message.author.displayAvatarURL({ dynamic: true }))
						.setDescription(`I do not have ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permission(s).`)
						.setFooter(`If you would like to run this, change my permissions so I can run this!`)
						return message.reply(NoPermissionsBot);
					}
				}**/
			}


			
			command.run(message, args);
		}
	}

};