const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")
const db = require('quick.db')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["connect"],
			description: 'Play connect4 with a Member!',
			category: '<:Funny:835794439662206986> Fun',
			usage: '<@user>',
			guildOnly: true,
			cooldown: 12000
		});
	}

	async run(message, args) {


        const challenger = message.member;
        const oppenent = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const AlreadyPlaying = await db.get(`${message.author.id}-Connect4`)
        if(AlreadyPlaying) return message.channel.send('You or the requested Player is currently playing a game with someone. Finish that game first.')

        const NotaMember = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription('Woah! Mention a real member')

        if (!oppenent) return message.channel.send(NotaMember);
        if(oppenent.user.bot) return message.channel.send(NotaMember)
        if(oppenent.user.id == message.author.id) return message.channel.send(NotaMember)

        const oppenentPlaying = await db.get(`${oppenent.user.id}-Connect4`)
        if(oppenentPlaying) return message.channel.send(AlreadyPlaying)

        const questionopponet = new MessageEmbed()
        .setDescription(`Would you like to play Connect 4 against ${challenger}?`)
        .setColor(colourembed.PokeCommandColor)
        const question = await message.channel.send(oppenent, questionopponet);

        ["✅", "❌"].forEach(async el => await question.react(el));
        
        const filter = (reaction, user) => ["✅", "❌"].includes(reaction.emoji.name) && user.id === oppenent.id; 

        const response = await question.awaitReactions(filter, { max: 1 });

        const reaction = response.first();

        const DecinedOffer = new MessageEmbed()
        .setColor(colourembed.PermissionWrongColor)
        .setDescription('The oppenent declined playing with you.')

        if (reaction.emoji.name === "❌") return question.edit(message.author, DecinedOffer);
        else {

            db.set(`${challenger.id}-Connect4`, true)
            db.set(`${oppenent.id}-Connect4`, true)

            await message.delete();
            await question.delete();

            const board = [
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ];

            const renderBoard = (board) => {
                let tempString = "";
                for (const boardSection of board) {
                    tempString += `${boardSection.join("")}\n`;
                }

                tempString = tempString.concat("1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣");

                return tempString;
            }

            const initialState = renderBoard(board);

            const initial = new MessageEmbed()
            .setAuthor(`Connect 4`)
            .setFooter(`Game Started By ${message.author.username}`)
            .setTimestamp()
            .setColor(colourembed.BotpfpColor)
            .setDescription(initialState);
            
            const gameMessage = await message.channel.send(initial);

            ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "❌"].forEach(async el => gameMessage.react(el));

            const gameFilter = (reaction, user) => ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "❌"].includes(reaction.emoji.name) && (user.id === oppenent.id || user.id === challenger.id);

            const gameCollector = gameMessage.createReactionCollector(gameFilter);

            const gameData = [
                { member: challenger, playerColor: "🔴" },
                { member: oppenent, playerColor: "🔵" }
            ];

            let player = 0;


            const checkFour = (a, b, c, d) => (a === b) && (b === c) && (c === d) && (a !== "⚪");

            const horizontalCheck = () => {
                for (let i = 0; i < 6; i++) {
                    for (let j = 0; j < 4; j++) {
                        if (checkFour(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3])) return [
                            board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3]
                        ];
                    }
                }
            }

            const verticalCheck = () => {
                for (let j = 0; j < 7; j++) {
                    for (let i = 0; i < 3; i++) {
                        if (checkFour(board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j])) return [
                            board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j]
                        ];
                    }
                }
            }

            const diagonal1 = () => {
                for (let col = 0; col < 4; col++) {
                    for (let row = 0; row < 3; row++) {
                        if (checkFour(board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3])) return [
                            board[row][col], board[row + 1][col + 1], board[row + 2], board[col + 2], board[row + 3][col + 3]
                        ]
                    }
                }
            }

            const diagonal2 = () => {
                for (let col = 0; col < 4; col++) {
                    for (let row = 5; row > 2; row--) {
                        if (checkFour(board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3])) return [
                            board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3]
                        ]
                    }
                }
            }

            const tieCheck = () => {
                let count = 0;
                for (const el of board) {
                    for (const string of el) {
                        if (string !== "⚪") count++;
                    }
                }
                if (count === 42) return true;
                else return false;
            }

            const checks = [horizontalCheck, verticalCheck, diagonal1, diagonal2];

            gameCollector.on("collect", (reaction, user) => {

                if (user.id === gameData[player].member.id) {

                    function NextPlayer() {
                        if(gameData[player].member.id === challenger.id) {
                            const OppenentTurn = message.channel.send(`${oppenent}, it's your turn!`)
                            setTimeout(function() {
                                OppenentTurn.delete()
                            }, 3000);
                        } else {
                            const ChallengerTurn = message.channel.send(`${challenger}, it's your turn!`)
                            setTimeout(function() {
                                ChallengerTurn.delete()
                            }, 3000);
                        }
                    }


                    const openSpaces = [];


                    switch (reaction.emoji.name) {

                        case "1️⃣":

                            for (let i = 5; i > -1; i--) {
                                if (board[i][0] === "⚪") openSpaces.push({ i, j: 0 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a differnt one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            gameMessage.reactions.resolve('1️⃣').users.remove(gameData[player].member.id);
                            NextPlayer()
                        break;
                        case "2️⃣":
                            
                            for (let i = 5; i > -1; i--) {
                                if (board[i][1] === "⚪") openSpaces.push({ i, j: 1 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a differnt one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            gameMessage.reactions.resolve('2️⃣').users.remove(gameData[player].member.id);
                            NextPlayer()
                        break;
                        case "3️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][2] === "⚪") openSpaces.push({ i, j: 2 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a differnt one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            gameMessage.reactions.resolve('3️⃣').users.remove(gameData[player].member.id);
                            NextPlayer()
                        break;
                        case "4️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][3] === "⚪") openSpaces.push({ i, j: 3 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a differnt one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            gameMessage.reactions.resolve('4️⃣').users.remove(gameData[player].member.id);
                            NextPlayer()
                        break;
                        case "5️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][4] === "⚪") openSpaces.push({ i, j: 4 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a differnt one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            gameMessage.reactions.resolve('5️⃣').users.remove(gameData[player].member.id);
                            NextPlayer()
                        break;
                        case "6️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][5] === "⚪") openSpaces.push({ i, j: 5 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a differnt one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            gameMessage.reactions.resolve('6️⃣').users.remove(gameData[player].member.id);
                            NextPlayer()
                        break;
                        case "7️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][6] === "⚪") openSpaces.push({ i, j: 6 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a differnt one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                            gameMessage.reactions.resolve('7️⃣').users.remove(gameData[player].member.id);
                            NextPlayer()
                        break;
                        case "❌":
                            const ENDGame = new MessageEmbed()
                            .setColor(colourembed.PermissionWrongColor)
                            .setDescription(`${gameData[player].member.id} has ended the Game. Nobody won!`)
                            db.delete(`${oppenent.user.id}-Connect4`)
                            db.delete(`${challenger.user.id}-Connect4`)
                            message.channel.send(ENDGame)
                            gameMessage.delete()
                        break;
                    }

                    if (tieCheck()) {

                        const TieEmbed = new MessageEmbed()
                        .setColor(colourembed.BotpfpColor)
                        .setDescription(renderBoard(board))
                        gameCollector.stop("Tie Game");
                        message.channel.send('Nobody won! It is a tie!')
                        db.delete(`${oppenent.user.id}-Connect4`)
                        db.delete(`${challenger.user.id}-Connect4`)
                        return gameMessage.edit(`Nobody won, it is a tie!`, { embed: TieEmbed });

                    }

                    for (const func of checks) {

                        const data = func();
                        if (data) {

                            const WinEmbed = new MessageEmbed()
                            .setColor(colourembed.BotpfpColor)
                            .setAuthor(`${gameData[player].member.user} won!`)
                            .setDescription(renderBoard(board))
                            gameCollector.stop(`${gameData[player].member.id} won`);
                            message.channel.send(`${gameData[player].member} won connect 4!`)
                            db.delete(`${oppenent.user.id}-Connect4`)
                            db.delete(`${challenger.user.id}-Connect4`)
                            return gameMessage.edit(`${gameData[player].member} has won the game!`, { embed: WinEmbed });

                        }

                    }

                    player = (player + 1) % 2;

                    const newEmbed = new MessageEmbed()
                    .setAuthor(`Connect 4`)
                    .setFooter(`Game Started By ${message.author.username}`)
                    .setTimestamp()
                    .setColor(colourembed.BotpfpColor)
                    .setDescription(renderBoard(board))
                    gameMessage.edit("", { embed: newEmbed });

                } else {
                    message.channel.send(`You're not the person who's next. Wait for your turn. | Person who Reacted: ${user}`)
                }

            });


        }

		
	}

};