const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() == "js");
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.")
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        
    });

});
bot.on("ready", async () => {
    console.log(`${bot.user.username} is now online!`);
    console.log(`${bot.users.size} users`);
    console.log(`${bot.channels.size} channels`);
    console.log(`${bot.guilds.size} servers`);
    console.log(`Token: ${bot.token}`);
    bot.user.setActivity(botconfig.activity, {type: botconfig.activityType});
});
bot.on("guildMemberAdd", member =>{

    let channel = member.guild.channels.find(`name`, `welcome`);
    if(!channel) return;
    let unverifiedrole = member.guild.roles.find(`name`, `Unverified`);
    let embed = new Discord.RichEmbed()
    .setColor("#39afdd")
    .setTitle("Welcome to **AdvancedPVP**")
    .setDescription(`${member}, Welcome to the **AdvancedPVP** Discord!`)
    .addField(`After you have read **#rules**, do **!!verify** in **#unverified** to confirm that you have read and accepted the rules. Once you do this, you will be granted access to more channels!`,`**Server Adress**: advancedpvp.hopto.org`)
    .setFooter(`AdvancedBot by ThisLightMan`);
    channel.send(embed);

    member.addRoles(unverifiedrole);
    return;
});
bot.on("messageDelete", (message) => {
    let logschannel = message.guild.channels.find(`name`, `chat-logs`);
    if(!logschannel) return message.channel.send("No logs channel found! Contact an administrator!");
    logschannel.send(`[${message.createdAt}] [${message.author}] [${message.channel}]: **DELETED:** ${message.content}`);
    return;
});
bot.on("messageUpdate", (oldmsg, newmsg) => {
    if(oldmsg.member.id == '434856223720865793') return;
    let logschannel = oldmsg.guild.channels.find(`name`, `chat-logs`);
    if(!logschannel) return oldmsg.channel.send("No logs channel found! Contact an administrator!");
    logschannel.send(`[${oldmsg.createdAt}] [${oldmsg.author}] [${oldmsg.channel}]: **EDITED:** **OLD MESSAGE**: ${oldmsg.content} **NEW MESSAGE**: ${newmsg.content}`);
    return;
});
/*
const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd'
};
bot.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;
    const { d: data } = event;
    const user = bot.users.get(data.user_id);
    const channel = bot.channels.get(data.channel_id);
    if (channel.messages.has(data.message_id)) return;
    const message = await channel.fetchMessage(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    if(message.id === 'MESSAGEIDHERE' && emojiKey === "✅"){
        message.member.addRole(message.guild.roles.find(`name`,"ROLENAME"));
    }
});
*/
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let logschannel = message.guild.channels.find(`name`, `chat-logs`);
    if(!logschannel) return message.channel.send("No logs channel found! Contact an administrator!");
    logschannel.send(`[${message.createdAt}] [${message.author}] [${message.channel}]: ${message.content}`);
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if(message.channel.id == 434851708326379521 && message.member.id !== 434851708326379521 && cmd !== "!!verify"){
        message.delete().catch(O_o=>{});
        return;
    }
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
});
    

bot.login(`${process.env.TOKEN}`);