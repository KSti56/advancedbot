const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    
    let staffrole = message.guild.roles.get('437741177920290817');
    let moderatorrole = message.guild.roles.get('434825316385423361');
    let adminrole = message.guild.roles.get('434825265932271630');
    let ownerrole = message.guild.roles.get('434825208797593601');
    let channel = message.guild.channels.find(`name`,`forum-${message.member.id}`);
    if(message.member.roles.has(ownerrole.id)) {
        if(args.length == 0 || args[0].toLowerCase() == "help"){
            let embed = new Discord.RichEmbed()
            .setTitle("**Forum Help**")
            .setColor("#f46b42")
            .setDescription(`**Commands:**\n  create - create a forum\n`)
            .setFooter(`AdvancedBot by ThisLightMan`);
            message.channel.send(embed);
            return;
        }
        if(args[0].toLowerCase() == "create"){
            if(channel) return message.channel.send(`${message.member}, you already have a forum channel that you have not finished creating.`).then(msg => {msg.delete(5000)});
            message.guild.createChannel(`forum-${message.member.id}`, "text")
                .then(c =>{
                    c.setParent("447881423072788500");
                }).catch(console.error);
                let newchannel = message.guild.channels.find("name",`forum-${message.member.id}`);
                message.channel.send(`${message.author}, your new forum channel is ${newchannel}`).then(msg => {
                  msg.delete(10000);
                //newchannel.send(`${message.author}, what do you want the name of your forum to be?`);
                });
            
            
        message.delete().catch(O_o=>{});       
        return;
            }
    } else {
        message.delete().catch(O_o=>{});
        return message.channel.send(`${message.author}, you don't have permission for that command`).then(msg => {msg.delete(5000)}); 
    }
} 

    

module.exports.help = {
    name: "forum"
};