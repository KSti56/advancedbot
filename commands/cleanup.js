const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    
    let ownerrole = message.guild.roles.get('434825208797593601');
    
    if(message.member.roles.has(ownerrole.id)) {
        message.delete().catch(O_o=>{});
        message.channel.bulkDelete(100).catch(console.log("Messages in bulk delete are older than 13 days"));
        return;
    } else {
        message.delete().catch(O_o=>{});
        return message.channel.send(`${message.author}, you don't have permission for that command`).then(msg => {msg.delete(5000)}); 
    }
} 

    

module.exports.help = {
    name: "cleanup"
};