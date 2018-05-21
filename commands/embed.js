const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    let staffrole = message.guild.roles.get('437741177920290817');
    let moderatorrole = message.guild.roles.get('434825316385423361');
    let adminrole = message.guild.roles.get('434825265932271630');
    let ownerrole = message.guild.roles.get('434825208797593601');
    
    if(message.member.roles.has(adminrole.id) || message.member.roles.has(ownerrole.id)) {
        let text = args.join(" ");
        let eArray = text.split(`" `);
        for(var i=0; i < eArray.length; i++){
            eArray[i] = eArray[i].replace(/"/g,``);
        }
        let eTitle = eArray[0];
        let eDescription = eArray[1];
        let embed = new Discord.RichEmbed()
        .setTitle(`${eTitle}`)
        .setColor("#41f462")
        .setDescription(`${eDescription}`);
            
        message.delete().catch(O_o=>{});
        message.channel.send(embed);
            
        
        return;
    } else {
        message.delete().catch(O_o=>{});
        return message.channel.send(`${message.author}, you don't have permission for that command`).then(msg => {msg.delete(5000)}); 
    }
} 

    

module.exports.help = {
    name: "embed"
};