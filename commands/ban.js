const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    
    let staffrole = message.guild.roles.get('437741177920290817');
    let moderatorrole = message.guild.roles.get('434825316385423361');
    let adminrole = message.guild.roles.get('434825265932271630');
    let ownerrole = message.guild.roles.get('434825208797593601');
    if(message.member.roles.has(moderatorrole.id) || message.member.roles.has(adminrole.id) || message.member.roles.has(ownerrole.id)) {
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send(`${message.author}, I couldn't find that user in this server!`).then(msg => {msg.delete(5000)});
            let reason = args.join(" ").slice(22);    
        if(bUser.roles.has(staffrole.id) && !message.member.roles.has(adminrole.id) && !message.member.roles.has(ownerrole.id)) return message.channel.send(`${message.author}, you cannot ban staff!`).then(msg => {msg.delete(5000)});
            
            let modchannel = message.guild.channels.find(`name`, "moderation-logs");
            if(!modchannel) return message.channel.send(`${message.author}, I couldn't find a ban channel. Please contact an administator or owner for help.`).then(msg => {msg.delete(5000)});
            if(bUser.id === 172131900289187849 || bUser.id === 434856223720865793) return message.channel.search(`${message.author}, you cannot ban that user!`).then(msg => {msg.delete(5000)});
    
            let embed = new Discord.RichEmbed()
            .setDescription("Ban")
            .setColor("#bc2f2f")
            .addField("**User**", `${bUser} with ID: ${bUser.id}`)
            .addField("**Moderator**", `${message.author} with the ID: ${message.author.id}`)
            .addField("**Channel**", message.channel.name)
            .addField("**Time**", message.createdAt)
            .addField("**Reason**", `${reason}`);
            
            message.delete().catch(O_o=>{});
            
            message.guild.member(bUser).ban(reason);

            modchannel.send(embed);
    
            return;




        } else {
            message.delete().catch(O_o=>{});
            return message.channel.send(`${message.author}, you don't have permission for that command`).then(msg => {msg.delete(5000)}); 
    }
}
module.exports.help = {
    name: "ban"
};