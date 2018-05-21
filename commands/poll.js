const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    
    let staffrole = message.guild.roles.get('437741177920290817');
    let moderatorrole = message.guild.roles.get('434825316385423361');
    let adminrole = message.guild.roles.get('434825265932271630');
    let ownerrole = message.guild.roles.get('434825208797593601');
    
    if(message.member.roles.has(moderatorrole.id) || message.member.roles.has(adminrole.id) || message.member.roles.has(ownerrole.id)) {
        let pollschannel = message.guild.channels.find(`name`, "polls");
        if(!pollschannel) return message.channel.send(`${message.author}, I couldn't find a polls channel. Please contact an administator or owner for help.`).then(msg => {msg.delete(5000)});
        let text = args.join(" ");
        let embed = new Discord.RichEmbed()
        .setTitle("**Poll**")
        .setColor("#d19123")
        .setDescription(text)
        .addBlankField()
        .addField("Vote", "**React** with :thumbsup: for **YES** or :thumbsdown: for **NO**")
        .setFooter(message.author.username + " • " + message.createdAt);
            
        message.delete().catch(O_o=>{});
        pollschannel.send(embed)
            .then(function (message) {
                message.react("👍")
                message.react("👎")
            }).catch(function() {})
            
        
        return;
    } else {
        message.delete().catch(O_o=>{});
        return message.channel.send(`${message.author}, you don't have permission for that command`).then(msg => {msg.delete(5000)}); 
    }
} 

    

module.exports.help = {
    name: "poll"
};