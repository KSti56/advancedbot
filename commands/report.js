const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
        
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send(`${message.author}, I couldn't find that user in this server!`).then(msg => {msg.delete(5000)});

        if(rUser === message.author) return message.channel.send(`${message.author}, you can't report yourself!`).then(msg => {msg.delete(5000)});
        message.channel.send(`${message.author}, Thanks for the report! Check your DMs for a copy of the report!`).then(msg => {msg.delete(5000)});
        let reason = args.join(" ").slice(22);

        let reportchannel = message.guild.channels.find(`name`, "reports");
        if(!reportchannel) return message.channel.send(`${message.author}, I couldn't find a reports channel. Please contact an administrator for help.`).then(msg => {msg.delete(5000)});


        let embed = new Discord.RichEmbed()
        .setDescription("Report")
        .setColor("#a3091e")
        .addField("**Offender**", `${rUser} with ID: ${rUser.id}`)
        .addField("**Reporter**", message.author)
        .addField("**Channel**", message.channel.name)
        .addField("**Time**", message.createdAt)
        .addField("**Reason**", `${reason}`);

        message.delete().catch(O_o=>{});
        reportchannel.send(embed);
        message.member.send(`Here is a copy of your report:`)
        message.member.send(embed);
        return;
    }

module.exports.help = {
    name: "report"
};