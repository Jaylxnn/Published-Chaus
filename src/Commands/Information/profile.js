const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const MoneyDatabase = require('../../Modules/UserMoneyStatsSchema')
const UserDatabase = require('../../Modules/userSchema')
const moment = require('moment');
const colourembed = require("../../../shortcutembedcolor.json")
const mongoose = require('mongoose')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["userinfo", "user"],
			description: 'Check your current balance!',
			category: '<:Information:835795138277539850> Information',
			usage: '<@user>',
			guildOnly: true,
			cooldown: 5000
		});
	}

	async run(message, args) {

		const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
		if(!member) return message.channel.send(`*Whoopsie!* That is not a real member!`)

		// Profile Stuff, doesnt rlly matter
		//var UserDescription = []
		var MemberBadges = []
		var NoEconomyProfile = null
		var NoProfile = null

		const UserStuff = await UserDatabase.findOne({
			userID: member.user.id
		}, async (err, user) => {
			if (err) console.error(err)
			if (!user) {
				const newUserDatabase = new UserDatabase({
                    _id: mongoose.Types.ObjectId(),
					ServerID: message.guild.id,
					userID: member.user.id,
					Level: 0,
					muteCount: 0,
					warnCount: 0,
					kickCount: 0,
					banCount: 0,
					pronouns: "Not Identified Yet.",
					profiledescription: false,
					trusted: false,
					staffmember: false,
					loved: false,
					knowndeveloper: false,
					swag: false,
					Blacklisted: false,
				});
				NoProfile == true
				await newUserDatabase.save()
				.then(result => console.log(result))
				.catch(err => console.error(err));
			}
		});

		const TotalMoney = await MoneyDatabase.findOne({
			userID: member.user.id
		}, async (err, user) => {
		  if (err) console.error(err);
		  if (!user) {
			  const newMoneyDatabase = new MoneyDatabase({
				_id: mongoose.Types.ObjectId(),
				userID: member.user.id,
				Cash: 0,
				Bank: 0,
				lb: "all",
				PensiveMode: false,
			  });
			  NoEconomyProfile == true
			  await newMoneyDatabase.save()
			  .then(result => console.log(result))
			  .catch(err => console.error(err));
		  	};
	  	});

		const FetchingProfile = new MessageEmbed()
		.setColor(colourembed.BotpfpColor)
		.setDescription(`<a:typing:847049063903789066> Fetching Profile...`)
		const FetchingProfileMessage = await message.channel.send(FetchingProfile)

		if(NoEconomyProfile == true || NoProfile == true) {
			const NoProfileFound = new MessageEmbed()
			.setAuthor(`No Profile Found!`, message.author.displayAvatarURL({ dynamic: true }))
			.setColor(colourembed.PermissionWrongColor)
			.setDescription(`<a:whitex:821671615712329749> You did not have a profile, do not worry, I have made it. Please type this command again.`)
			return setTimeout(function() {
				FetchingProfileMessage.edit(NoProfileFound)
			}, 3000);
		} else if(NoEconomyProfile == null || NoProfile == null){
			if(UserStuff.trusted == true) {
				MemberBadges.push("<:trusted_badge:846669026775138324>")
			}
			if(UserStuff.staffmember == true) {
				MemberBadges.push("<:staffmember_badge:846670475668357130>")
			}
			if(UserStuff.loved == true) {
				MemberBadges.push("<:loved_badge:846670475534139452>")
			}
			if(UserStuff.knowndeveloper == true) {
				MemberBadges.push("<:knowndeveloper_badge:846670475630608384>")
			}
			if(UserStuff.swag == true) {
				MemberBadges.push("<:swag_badge:846670475676614656>")
			}
			/*if(!UserStuff.profiledescription == false) {
				UserDescription.push(`${UserStuff.profiledescription}`)
			}*/

			if(MemberBadges.length == 0) {
				MemberBadges.push("None")
			}

			const ProfileCard = new MessageEmbed()
			.setAuthor(`${member.user.username}'s Profile [${member.user.id}]`, member.user.displayAvatarURL({ dynamic: true }))
			.setColor(colourembed.BotpfpColor)
			.setTimestamp()
			.setFooter(`Requested By: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
			//.setDescription(`${UserDescription}`)
			.addField(`ᘏ Information`, [
				`**User**: ${member.user}`,
				`**${this.client.user.username} Badges**: ${MemberBadges.join(" ")}`,
				`**Created Account**: ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
				`**Joined Guild**: ${moment(member.joinedAt).format('LL LTS')}`,
				//`**Pronouns**: ${UserStuff.pronouns}`,
				`\u200b`,
			])
			.addField(`ᘏ Economy Information`, [
				`**Bucks**: ${TotalMoney.Cash || 0}`,
				`**Bank**: ${TotalMoney.Bank || 0}`,
				`**Safemode?**: ${TotalMoney.PensiveMode || false}`,
			])
	  
			  setTimeout(function() {
				FetchingProfileMessage.edit(ProfileCard)
			  }, 3000);
	
		}

		/*if(UserDescription.length == 0) {
			UserDescription.push(`This user has not set up their profile description. To set up your profile, type \`${this.client.regular_prefix}setprofile\``)
		}*/
		//${moment(member.user.createdTimestamp).format('LT')}

		
	}

};