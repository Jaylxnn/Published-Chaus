const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const colourembed = require("../../../shortcutembedcolor.json")

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["hotlines"],
			description: 'If you\'re in need to talk with a professional that can help you, call the number you need below! There are online communication too, we are here together!',
			category: '<:Information:835795138277539850> Information',
			usage: '',
			guildOnly: true,
			cooldown: 0
		});
	}

	async run(message, args) {

        const HotlineEmbed = new MessageEmbed()
        .setAuthor(`Available Hotlines`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(colourembed.BotpfpColor)
        .setDescription('If you\'re in need to talk with a professional that can help you, call the number you need below! There are online communication too, we are here together!')
        .addField("Crisis Pregnancy Helpline", [
            `Crisis Pregnancy Hotline Number ;; 1-800-67-BABY-6`,
            `Liberty Godparent Ministry ;; 1-800-368-3336`
        ])
        .addField(`Domestic Violence`, [
            `National Domestic Violence Hotline ;; 1-800-799-SAFE`,
            `National Domestic Violence Hotline Spanish ;; 1-800-942-6908`,
            `Battered Women and their Children ;; 1-800-603-HELP`,
            `Elder Abuse Hotline ;; 1-800-252-8966`,
            `RAINN ;; 1-800-656-HOPE (4673)`,
        ])
        .addField(`Family Violence`, [
            `Family Violence Prevention Center ;; 1-800-313-1310`
        ])
        .addField(`Gambling`, [
            `Compulsive Gambling Hotline ;; 1-410-332-0402`
        ])
        .addField(`Grief/Loss`, [
            `GriefShare ;; 1-800-395-5755`
        ])
        .addField(`Homeless Shelters`, [
            `Homeless ;; 1-800-231-6946`,
            `American Family Housing ;; 1-888-600-4357`,
        ])
        .addField(`LGBTQIA`, [
            `Helpline ;; 1-800-398-GAYS`,
            `Gay and Lesbian National Hotline ;; 1-888-843-4564`,
            `Trevor Hotline (Suicide) ;; 1-866-4-U-TREVOR`,
        ])
        .addField(`Parents`, [
            `Hotline for parents considering abducting their children ;; 1-800-A-WAY-OUT`,
            `United States Missing Children Hotline ;; 1-800-235-3535`,
        ])
        .addField(`Poison`, [
            `Poison Control ;; 1-800-942-5969`
        ])
        .addField(`Runaways`, [
            `Boystown National Hotline ;; 1-800-448-3000`,
            `National Runaway Safeline ;; 1-800-RUNAWAY (786-2929)`,
            `Laurel House ;; 1-714-832-0207`,
            `National Runaway Switchboard ;; 1-800-621-4000`,
            `Teenline ;; 1-888-747-TEEN`,
            `Youth Crisis Hotline ;; 1-800-448-4663`,
        ])
        .addField(`Self-Injury`, [
            `S.A.F.E. (Self Abuse Finally Ends) ;; 1-800-DONT-CUT`
        ])
        .addField(`Sexual Addiction`, [
            `Project Know ;; 1-888-892-1840`,
            `Sex Addicts Anonymous ;; 1-800-477-8191`,
        ])
        .addField(`Suicide`, [
            `Suicide Hotline ;; 1-800-SUICIDE (784-2433)`,
            `1-800-273-TALK (8255)`,
            `Suicide Prevention Hotline ;; 1-800-827-7571`,
            `Deaf Hotline ;; 1-800-799-4TTY`,
            `Holy Spirit Teenline ;; (717) 763-2345 or 1-800-722-5385`,
            `Crisis Intervention (Harrisburg) ;; (717) 232-7511 or 1- 888- 596-4447`,
            `Carlisle Helpline ;; (717) 249-6226`,
            `Crisis Intervention (York) ;; (717) 851-5320 or 1-800-673-2496`,
        ])
        /*.addField("Hotlines", [
            `**CRISIS PREGNANCY HELPLINE**
            Crisis Pregnancy Hotline Number ;; 1-800-67-BABY-6
            Liberty Godparent Ministry ;; 1-800-368-3336
            
            **DOMESTIC VIOLENCE**
            National Domestic Violence Hotline ;; 1-800-799-SAFE
            National Domestic Violence Hotline Spanish ;; 1-800-942-6908
            Battered Women and their Children ;; 1-800-603-HELP
            Elder Abuse Hotline ;; 1-800-252-8966
            RAINN ;; 1-800-656-HOPE (4673)
            
            **FAMILY VIOLENCE**
            Family Violence Prevention Center ;; 1-800-313-1310
            
            **GAMBLING**
            Compulsive Gambling Hotline ;; 1-410-332-0402
            
            **GRIEF/LOSS**
            GriefShare ;; 1-800-395-5755
            
            **HOMELESS/SHELTERS**
            Homeless ;; 1-800-231-6946
            American Family Housing ;; 1-888-600-4357
            
            **LGBTQIA+**
            Helpline ;; 1-800-398-GAYS
            Gay and Lesbian National Hotline ;; 1-888-843-4564
            Trevor Hotline (Suicide) ;; 1-866-4-U-TREVOR
            
            **PARENTS**
            Hotline for parents considering abducting their children ;; 1-800-A-WAY-OUT
            United States Missing Children Hotline ;; 1-800-235-3535
            
            **POISON**
            Poison Control ;; 1-800-942-5969
            
            **RUNAWAYS**
            Boystown National Hotline ;; 1-800-448-3000
            National Runaway Safeline ;; 1-800-RUNAWAY (786-2929)
            Laurel House ;; 1-714-832-0207
            National Runaway Switchboard ;; 1-800-621-4000
            Teenline ;; 1-888-747-TEEN
            Youth Crisis Hotline ;; 1-800-448-4663
            
            **SELF-INJURY**
            S.A.F.E. (Self Abuse Finally Ends) ;; 1-800-DONT-CUT
            
            **SEXUAL ADDICTION**
            Project Know ;; 1-888-892-1840
            Sex Addicts Anonymous ;; 1-800-477-8191
            
            **SUICIDE**
            Suicide Hotline ;; 1-800-SUICIDE (784-2433)
            1-800-273-TALK (8255)
            Suicide Prevention Hotline ;; 1-800-827-7571
            Deaf Hotline ;; 1-800-799-4TTY
            Holy Spirit Teenline ;; (717) 763-2345 or 1-800-722-5385
            Crisis Intervention (Harrisburg) ;; (717) 232-7511 or 1- 888- 596-4447
            Carlisle Helpline ;; (717) 249-6226
            Crisis Intervention (York) ;; (717) 851-5320 or 1-800-673-2496`
        ])*/
        message.channel.send(HotlineEmbed)
		
	}

};