const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const MoneyDatabase = require('../../Modules/UserMoneyStatsSchema')
const mongoose = require('mongoose');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["worker", "workingas"],
			description: 'Work at any job that is available! (MANY MORE JOBS WILL BE COMING SOON!)',
			category: '<:Money:835798941320740864> Economy',
			usage: '[job name]',
			guildOnly: true,
			cooldown: 5000
		});
	}

	async run(message, args) {

        const NoArgs = new MessageEmbed()
        .setAuthor(`Invalid Arguments!`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`The only Available jobs are \`writer\` \`constructor\`, \`programmer\`,  \`stripper\`, \`accountant\` `)
        if(!args[0]) return message.channel.send(NoArgs)

        if (args[0] == 'writer') {

            let amount = Math.floor(Math.random() * 3000) + 1;

            var writertext = [
                `You wrote a book about love and got **$${amount}**!`,
                `You wrote a book about discovering a scary monster and earned **$${amount}**!`,
                `You wrote a book about Romeo & Juliet and got **$${amount}**!`,
                `You wrote a Journal and earned **$${amount}**`
            ]
    
            let embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })) 
            .setDescription(writertext[Math.floor(Math.random() * writertext.length)])
            .setColor(colourembed.BotpfpColor)
            message.channel.send(embed)
            
            await MoneyDatabase.findOne({
                userID: message.author.id
            }, async (err, user) => {
              if (err) console.error(err);
      
              if (!user) {
                  const newMoneyDatabase = new MoneyDatabase({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    Cash: amount,
                    Bank: 0,
                    lb: "all",
                    PensiveMode: false,
                  });
      
                  await newMoneyDatabase.save()
                  .then(result => console.log(result))
                  .catch(err => console.error(err));
              } else {
                  user.updateOne({
                      Cash: user.Cash + amount
                  })
                  .then(result => console.log(result))
                  .catch(err => console.error(err));
            };
        });

        } else if(args[0] == 'constructor') {

            let amount = Math.floor(Math.random() * 15000) + 1;

            var constructortext = [
                `You worked as a constructor and built a cool House near hollywood! You've earned **$${amount}**!`,
                `You rebuilt the local candy store and got **$${amount}**!`,
                `You've built a kindergarten schoolhouse and earned **$${amount}** for it!`,
                `You built a nice apartment at New York City and got payed **$${amount}**!`
            ]
    
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })) 
            .setDescription(constructortext[Math.floor(Math.random() * constructortext.length)])
            .setColor(colourembed.BotpfpColor)
            
            message.channel.send(embed)
            
            await MoneyDatabase.findOne({
                userID: message.author.id
            }, async (err, user) => {
              if (err) console.error(err);
      
              if (!user) {
                  const newMoneyDatabase = new MoneyDatabase({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    Cash: amount,
                    Bank: 0,
                    lb: "all",
                    PensiveMode: false,
                  });
      
                  await newMoneyDatabase.save()
                  .then(result => console.log(result))
                  .catch(err => console.error(err));
              } else {
                  user.updateOne({
                      Cash: user.Cash + amount
                  })
                  .then(result => console.log(result))
                  .catch(err => console.error(err));
            };
        });

        } else if(args[0] == 'programmer') {

            let amount = Math.floor(Math.random() * 30000) + 1;

            var programmertext = [
                `You programmed a entertaining app and earned **$${amount}**!`,
                `You programmed Google Chrome and got **$${amount}**!`,
            ]
    
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true })) 
            .setDescription(programmertext[Math.floor(Math.random() * programmertext.length)])
            .setColor(colourembed.BotpfpColor)
            
            message.channel.send(embed)


            await MoneyDatabase.findOne({
                userID: message.author.id
            }, async (err, user) => {
              if (err) console.error(err);
      
              if (!user) {
                  const newMoneyDatabase = new MoneyDatabase({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    Cash: amount,
                    Bank: 0,
                    lb: "all",
                    PensiveMode: false,
                  });
      
                  await newMoneyDatabase.save()
                  .then(result => console.log(result))
                  .catch(err => console.error(err));
              } else {
                  user.updateOne({
                      Cash: user.Cash + amount
                  })
                  .then(result => console.log(result))
                  .catch(err => console.error(err));
            };
        });

        } else if(args[0] == "stripper") {

            let amount = Math.floor(Math.random() * 9500) + 1;

            var strippertext = [
                `You worked as a Stripper and a random female gave you **$${amount}**!`,
                `You worked as a Stripper and suddenly a full pile of **$${amount}** has dropped on you!`,
                `You quietly stole **$${amount}** from someone at the Strip Club.`,
            ]
    
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true })) 
            .setDescription(strippertext[Math.floor(Math.random() * strippertext.length)])
            .setColor(colourembed.BotpfpColor)
            
            message.channel.send(embed)


            await MoneyDatabase.findOne({
                userID: message.author.id
            }, async (err, user) => {
              if (err) console.error(err);
      
              if (!user) {
                  const newMoneyDatabase = new MoneyDatabase({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    Cash: amount,
                    Bank: 0,
                    lb: "all",
                    PensiveMode: false,
                  });
      
                  await newMoneyDatabase.save()
                  .then(result => console.log(result))
                  .catch(err => console.error(err));
              } else {
                  user.updateOne({
                      Cash: user.Cash + amount
                  })
                  .then(result => console.log(result))
                  .catch(err => console.error(err));
            };
        });
        } else if(args[0] == "accountant") {

            let amount = Math.floor(Math.random() * 30000) + 1;

            var accountanttext = [
                `You worked as an Accountant and earned **$${amount}**`,
                `You worked as an Accountant for the money and robbed **$${amount}**`,
                `You worked as an Accountant and the Manager decided to give you **$${amount}**`,
            ]
    
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true })) 
            .setDescription(accountanttext[Math.floor(Math.random() * accountanttext.length)])
            .setColor(colourembed.BotpfpColor)
            
            message.channel.send(embed)


            await MoneyDatabase.findOne({
                userID: message.author.id
            }, async (err, user) => {
              if (err) console.error(err);
      
              if (!user) {
                  const newMoneyDatabase = new MoneyDatabase({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    Cash: amount,
                    Bank: 0,
                    lb: "all",
                    PensiveMode: false,
                  });
      
                  await newMoneyDatabase.save()
                  .then(result => console.log(result))
                  .catch(err => console.error(err));
              } else {
                  user.updateOne({
                      Cash: user.Cash + amount
                  })
                  .then(result => console.log(result))
                  .catch(err => console.error(err));
            };
        });

        }
    
		
	}

};