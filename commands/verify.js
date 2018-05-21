const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    
    let unverifiedRole = message.guild.roles.get('434851091331547136');
    let memberRole = message.guild.roles.get('434838023725776928');

    if(message.member.roles.has(unverifiedRole.id)) {
        
        let modchannel = message.guild.channels.find(`name`, "moderation-logs");
        if(!modchannel) return message.channel.send(`${message.author}, I couldn't find a mod channel. Please contact an administator or owner for help.`).then(msg => {msg.delete(5000)});
        let text = args.join(" ");
        modchannel.send(`${message.author} with the ID **${message.member.id}** has been verified!`);
        message.member.removeRole(unverifiedRole).catch();
        message.member.addRole(memberRole).catch();
        message.member.send("You have confirmed that you have **read the rules and agree to follow them**. You have been verified and now have access to other channels.")
        
        message.delete().catch(O_o=>{});
        return;
    } else {
        message.delete().catch(O_o=>{});
        return message.channel.send(`${message.author}, you are already verified`).then(msg => {msg.delete(5000)}); 
    }
} 

    

module.exports.help = {
    name: "verify"
};