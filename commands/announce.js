const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    
    let staffrole = message.guild.roles.get('437741177920290817');
    if(message.member.roles.has(staffrole.id)) {
        let announcechannel = message.guild.channels.find(`name`, "announcements");
        if(!announcechannel) return message.channel.send(`${message.author}, I couldn't find a announcements channel. Please contact an administator or owner for help.`).then(msg => {msg.delete(5000)});
        let text = args.join(" ");
        let embed = new Discord.RichEmbed()
        .setTitle(`:exclamation: Announcement :exclamation:`)
        .setColor("#42dff4")
        .setDescription(`${text}`)
        .setFooter(message.author.username + " • " + message.createdAt);
            
        message.delete().catch(O_o=>{});
        announcechannel.send(embed);
            
        
        return;
    } else {
        message.delete().catch(O_o=>{});
        return message.channel.send(`${message.author}, you don't have permission for that command`).then(msg => {msg.delete(5000)}); 
    }
} 

    

module.exports.help = {
    name: "announce"
};