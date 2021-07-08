const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const BotConfig = require("../../../BotConfig.json")
const User = require('../../Modules/userSchema');
const mongoose = require('mongoose')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["badge"],
			description: 'See the badges that can be obtainable!',
			category: '<:Information:835795138277539850> Information',
			usage: '',
			guildOnly: true,
      		cooldown: 5999
		});
	}

	

	async run(message, args) {
		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member

		const CannotRunCommand = new MessageEmbed()
		.setAuthor(`Cannot Run Command`)
		.setColor(colourembed.PermissionWrongColor)
		.setDescription(`HEY! You are not allowed to run this command. Only specific people can.`)

		const BotServer = this.client.guilds.cache.get(BotConfig.SupportServerID)
		const Messenger = BotServer.members.cache.get(message.author.id)

		const hasAdministratorRole = Messenger ? Messenger.roles.cache.some(role => role.id === BotConfig.Administration) : false

		function NotifyBadge() {
			const Notify = new MessageEmbed()
			.setColor(colourembed.BotpfpColor)
			.setAuthor(`Chaus Notification`)
			.setDescription(`Hello there! Chaus is here to notify you that you've been given a badge by ${message.author}! To check the badge type \`ch!profile\` to see the badge.`)
			member.send(Notify)
		}

		if(args[1] == "give") {
			if(!hasAdministratorRole) return message.channel.send(CannotRunCommand)
			if(!member) return;

			if(args[2] == "loved") {
				const FetchingProfile = new MessageEmbed()
				.setColor(colourembed.BotpfpColor)
				.setDescription(`<a:typing:847049063903789066> Giving badge to user...`)
				const GivingBadge = await message.channel.send(FetchingProfile)
		  
				setTimeout(function() {
					User.findOne({
						userID: member.user.id
					}, async (err, user) => {
					  if (err) console.error(err);
			  
					  if (!user) {
						const newUserDatabase = new User({
							_id: mongoose.Types.ObjectId(),
							ServerID: message.guild.id,
							userID: member.user.id,
							muteCount: 0,
							warnCount: 0,
							kickCount: 0,
							banCount: 0,
							pronouns: "Not Identified Yet.",
							profiledescription: false,
							trusted: false,
							staffmember: false,
							loved: true,
							knowndeveloper: false,
							swag: false,
							Blacklisted: false,
						});
						newUserDatabase.save()
						.then(result => console.log(result))
						.catch(err => console.error(err));
					  } else {
						  user.updateOne({
							  loved: true
						  })
						  .then(result => console.log(result))
						  .catch(err => console.error(err));	
						};
					});
					const BadgeSuccess = new MessageEmbed()
					.setColor(colourembed.BotpfpColor)
					.setAuthor(`Given Badge!`, message.author.displayAvatarURL({ dynamic: true }))
					.setDescription(`**Successfully given the __loved__ badge to ${member.user}!**`)
					GivingBadge.edit(BadgeSuccess)
					NotifyBadge()
			   }, 3000);
			} else if(args[2] == "staff") {
				const FetchingProfile = new MessageEmbed()
				.setColor(colourembed.BotpfpColor)
				.setDescription(`<a:typing:847049063903789066> Giving badge to user...`)
				const GivingBadge = await message.channel.send(FetchingProfile)
		  
				setTimeout(function() {
					User.findOne({
						userID: member.user.id
					}, async (err, user) => {
					  if (err) console.error(err);
			  
					  if (!user) {
						const newUserDatabase = new User({
							_id: mongoose.Types.ObjectId(),
							ServerID: message.guild.id,
							userID: member.user.id,
							muteCount: 0,
							warnCount: 0,
							kickCount: 0,
							banCount: 0,
							pronouns: "Not Identified Yet.",
							profiledescription: false,
							trusted: false,
							staffmember: true,
							loved: false,
							knowndeveloper: false,
							swag: false,
							Blacklisted: false,
						});
						newUserDatabase.save()
						.then(result => console.log(result))
						.catch(err => console.error(err));
					  } else {
						  user.updateOne({
							  staffmember: true
						  })
						  .then(result => console.log(result))
						  .catch(err => console.error(err));	
						};
					});

					const BadgeSuccess = new MessageEmbed()
					.setColor(colourembed.BotpfpColor)
					.setAuthor(`Given Badge!`, message.author.displayAvatarURL({ dynamic: true }))
					.setDescription(`**Successfully given the __staff member__ badge to ${member.user}!**`)
					GivingBadge.edit(BadgeSuccess)
					NotifyBadge()
			   }, 3000);
			} else if(args[2] == "trusted") {
				const FetchingProfile = new MessageEmbed()
				.setColor(colourembed.BotpfpColor)
				.setDescription(`<a:typing:847049063903789066> Giving badge to user...`)
				const GivingBadge = await message.channel.send(FetchingProfile)
				setTimeout(function() {
					User.findOne({
						userID: member.user.id
					}, async (err, user) => {
					  if (err) console.error(err);
			  
					  if (!user) {
						const newUserDatabase = new User({
							_id: mongoose.Types.ObjectId(),
							ServerID: message.guild.id,
							userID: member.user.id,
							muteCount: 0,
							warnCount: 0,
							kickCount: 0,
							banCount: 0,
							pronouns: "Not Identified Yet.",
							profiledescription: false,
							trusted: true,
							staffmember: false,
							loved: false,
							knowndeveloper: false,
							swag: false,
							Blacklisted: false,
						});
						newUserDatabase.save()
						.then(result => console.log(result))
						.catch(err => console.error(err));
					  } else {
						  user.updateOne({
							  trusted: true
						  })
						  .then(result => console.log(result))
						  .catch(err => console.error(err));	
						};
					});

					const BadgeSuccess = new MessageEmbed()
					.setColor(colourembed.BotpfpColor)
					.setAuthor(`Given Badge!`, message.author.displayAvatarURL({ dynamic: true }))
					.setDescription(`**Successfully given the __trusted__ badge to ${member.user}!**`)
					GivingBadge.edit(BadgeSuccess)
					NotifyBadge()
			   }, 3000);
			} else if(args[0]) {
				const FetchingProfile = new MessageEmbed()
				.setColor(colourembed.BotpfpColor)
				.setDescription(`<a:typing:847049063903789066> Giving badge to user...`)
				const GivingBadge = await message.channel.send(FetchingProfile)
		  
				setTimeout(function() {
					User.findOne({
						userID: member.user.id
					}, async (err, user) => {
					  if (err) console.error(err);
			  
					  if (!user) {
						const newUserDatabase = new User({
							_id: mongoose.Types.ObjectId(),
							ServerID: message.guild.id,
							userID: member.user.id,
							muteCount: 0,
							warnCount: 0,
							kickCount: 0,
							banCount: 0,
							pronouns: "Not Identified Yet.",
							profiledescription: false,
							trusted: false,
							staffmember: false,
							loved: false,
							knowndeveloper: true,
							swag: false,
							Blacklisted: false,
						});
						newUserDatabase.save()
						.then(result => console.log(result))
						.catch(err => console.error(err));
					  } else {
						  user.updateOne({
							  knowndeveloper: true
						  })
						  .then(result => console.log(result))
						  .catch(err => console.error(err));	
						};
					});

					const BadgeSuccess = new MessageEmbed()
					.setColor(colourembed.BotpfpColor)
					.setAuthor(`Given Badge!`, message.author.displayAvatarURL({ dynamic: true }))
					.setDescription(`**Successfully given the __known developer__ badge to ${member.user}!**`)
					GivingBadge.edit(BadgeSuccess)
					NotifyBadge()
			   }, 3000);
			}
		}

	}

};