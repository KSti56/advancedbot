const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    
    let staffrole = message.guild.roles.get('437741177920290817');
    let moderatorrole = message.guild.roles.get('434825316385423361');
    let adminrole = message.guild.roles.get('434825265932271630');
    let ownerrole = message.guild.roles.get('434825208797593601');
    
    if(message.member.roles.has(staffrole.id)) {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send(`${message.author}, I couldn't find that user in this server!`).then(msg => {msg.delete(5000)});
            let reason = args.join(" ").slice(22);    
        if(kUser.roles.has(staffrole.id) && !message.member.roles.has(adminrole.id) && !message.member.roles.has(ownerrole.id)) return message.channel.send(`${message.author}, you cannot kick staff!`);
            
            let modchannel = message.guild.channels.find(`name`, "moderation-logs");
            if(!modchannel) return message.channel.send(`${message.author}, I couldn't find a kick channel. Please contact an administator for help.`).then(msg => {msg.delete(5000)});
    
    
            let embed = new Discord.RichEmbed()
            .setDescription("Kick")
            .setColor("#42f4b9")
            .addField("**User**", `${kUser} with ID: ${kUser.id}`)
            .addField("**Moderator**", `${message.author} with the ID: ${message.author.id}`)
            .addField("**Channel**", message.channel.name)
            .addField("**Time**", message.createdAt)
            .addField("**Reason**", `${reason}`);
            
            message.delete().catch(O_o=>{});
            
            message.guild.member(kUser).kick(reason);

            modchannel.send(embed);
    
            return;




        } else {
            message.delete().catch(O_o=>{});
            return message.channel.send(`${message.author}, you don't have permission for that command`).then(msg => {msg.delete(5000)}); 
    }
} 

    

module.exports.help = {
    name: "kick"
};