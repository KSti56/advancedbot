const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    
    let staffrole = message.guild.roles.get('437741177920290817');
    let moderatorrole = message.guild.roles.get('434825316385423361');
    let adminrole = message.guild.roles.get('434825265932271630');
    let ownerrole = message.guild.roles.get('434825208797593601');
        
    if(message.member.roles.has(staffrole.id)) {
         let embed = new Discord.RichEmbed()
        .setDescription("**Server Information**")
        .setColor("#3e98bc")
        .setThumbnail(message.guild.iconURL)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined On", message.member.joinedAt)
        .addField("Channels", message.guild.channels.size)
        .addField("Members", message.guild.memberCount);
        message.delete().catch(O_o=>{});
        return message.channel.send(embed);
    
    } else {
        message.delete().catch(O_o=>{});
        return message.channel.send(`${message.author}, you don't have permission for that command`).then(msg => {msg.delete(5000)}); 
}
    }
module.exports.help = {
    name: "serverinfo"
};