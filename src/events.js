const { MessageEmbed } = require('discord.js');
const client = global.client;
const process = global.process;

const db = require('./db');
const config = require('./config');
const { Spam, RandomColor, BadWord, WhiteList, Punish } = require('./functionz');

client.on('message', async (message) => {
   if(!message.guild || message.author.bot || message.member.hasPermission(8) || message.author.id === message.guild.ownerID) return;
    const Database = await db.findOne({ ServerID: message.guild.id });
    if(!Database || await WhiteList(message) === true) return;
    const Embed = new MessageEmbed().setColor(RandomColor(true)).setTimestamp().setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }));

    if(message.content.length > '500') { 
        if(Database.CharacterLimit === false || Database.CharacterLimit === null || !Database.CharacterLimit) return;
        if (message && message.deletable) message.delete({ timeout: 0100 }).catch(() => {});
        return await Punish(message, 'CharacterLimit', Embed);
    }
    if(message.mentions.users.size >= 10) { 
        if(Database.MassPingGuard === false || Database.MassPingGuard === null || !Database.MassPingGuard) return;
        if (message && message.deletable) message.delete({ timeout: 0110 }).catch(() => {});
        return await Punish(message, 'MassPingGuard', Embed);
    }

    if(await Spam(message) === true ) {
        if(Database.SpamGuard === false || Database.SpamGuard === null || !Database.SpamGuard) return;
        if (message && message.deletable) message.delete({ timeout: 0130 }).catch(() => {});
        return await Punish(message, 'SpamGuard', Embed);
    }
    
    let InviteGuardReg = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;  
    if (InviteGuardReg.test(message.content)){
        if(Database.InviteGuard === false || Database.InviteGuard === null || !Database.InviteGuard) return;
        if (message && message.deletable) message.delete({ timeout: 0120 }).catch(() => {});
        return await Punish(message, 'InviteGuard', Embed);
    }
   
    let LinkGuardReg = /(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi;
    if (LinkGuardReg.test(message.content)){
        if(Database.LinkGuard === false || Database.LinkGuard === null || !Database.LinkGuard) return;
        if (message && message.deletable) message.delete({ timeout: 0130 }).catch(() => {});
        return message.channel.send(Embed.setDescription('<@'+message.author.id+'>, Link içeren mesajlar kullanman yasak !')).then(x => x.delete({timeout: 3000})).catch(() => {});
    }
    if(BadWord(message.content) === true) { 
        if(Database.BadWordGuard === false || Database.BadWordGuard === null || !Database.BadWordGuard) return;
        if (message && message.deletable) message.delete({ timeout: 0140 }).catch(() => {});
        return message.channel.send(Embed.setDescription('<@'+message.author.id+'>, Küfür içeren mesajlar kullanman yasak !')).then(x => x.delete({timeout: 3000})).catch(() => {});
    }
   
    if (Database && Database.FiltredWords.some(Word => ` ${message.content.toLowerCase()} `.includes(` ${Word} `)) === true) {
     if (message && message.deletable) message.delete({ timeout: 0150 }).catch(() => {});
     return message.channel.send(Embed.setDescription('<@'+message.author.id+'>, Filtrelenmiş kelime içeren mesajlar kullanman yasak !')).then(x => x.delete({timeout: 3000})).catch(() => {});
    }
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    if(!newMessage.guild || newMessage.author.bot || newMessage.member.hasPermission(8) || newMessage.author.id === newMessage.guild.ownerID) return;
     const Database = await db.findOne({ ServerID: newMessage.guild.id });
     if(!Database || await WhiteList(newMessage) === true) return;
     const Embed = new MessageEmbed().setColor(RandomColor(true)).setTimestamp().setAuthor(newMessage.guild.name, newMessage.guild.iconURL({ dynamic: true }));
 
     if(newMessage.content.length > '500') { 
         if(Database.CharacterLimit === false || Database.CharacterLimit === null || !Database.CharacterLimit) return;
         if (newMessage && newMessage.deletable) newMessage.delete({ timeout: 0100 }).catch(() => {});
         return await Punish(newMessage, 'CharacterLimit', Embed);
     }

     let InviteGuardReg = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;  
     if (InviteGuardReg.test(newMessage.content)){
         if(Database.InviteGuard === false || Database.InviteGuard === null || !Database.InviteGuard) return;
         if (newMessage && newMessage.deletable) newMessage.delete({ timeout: 0120 }).catch(() => {});
         return await Punish(newMessage, 'InviteGuard', Embed);
     }
    
     let LinkGuardReg = /(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi;
     if (LinkGuardReg.test(newMessage.content)){
         if(Database.LinkGuard === false || Database.LinkGuard === null || !Database.LinkGuard) return;
         if (newMessage && newMessage.deletable) newMessage.delete({ timeout: 0130 }).catch(() => {});
         return newMessage.channel.send(Embed.setDescription('<@'+newMessage.author.id+'>, Link içeren mesajlar kullanman yasak !')).then(x => x.delete({timeout: 3000})).catch(() => {});
     }
     if(BadWord(newMessage.content) === true) { 
         if(Database.BadWordGuard === false || Database.BadWordGuard === null || !Database.BadWordGuard) return;
         if (newMessage && newMessage.deletable) newMessage.delete({ timeout: 0140 }).catch(() => {});
         return newMessage.channel.send(Embed.setDescription('<@'+newMessage.author.id+'>, Küfür içeren mesajlar kullanman yasak !')).then(x => x.delete({timeout: 3000})).catch(() => {});
     }
    
    if (Database && Database.FiltredWords.some(Word => ` ${newMessage.content.toLowerCase()} `.includes(` ${Word} `)) === true) {
     if (newMessage && newMessage.deletable) newMessage.delete({ timeout: 0150 }).catch(() => {});
     return newMessage.channel.send(Embed.setDescription('<@'+newMessage.author.id+'>, Filtrelenmiş kelime içeren mesajlar kullanman yasak !')).then(x => x.delete({timeout: 3000})).catch(() => {});
    }
 });
 
client.on('guildMemberAdd', async (member) => {
    const Database = await db.findOne({ ServerID: member.guild.id });
    
    if (Database && Database.BlackListMembers.includes(member.id) === true) {
    const MuteRole = menber.guild.roles.cache.find(role => role.id === Database.MutedRoleID);
    if(!MuteRole) return;
        member.roles.add(MuteRole).catch(() => {});
        setTimeout(async() => {
            member.roles.remove(MuteRole).catch(() => {});
            await db.findOneAndUpdate({ ServerID: member.guild.id }, { $pull: { BlackListMembers: member.id }});
        }, 7200000);}
});


client.on('disconnect', () => console.log('bot kapanıyor'));
client.on('reconnecting', () => console.log('bot tekrar bağlanıyor'));
client.on('error', (error) => console.log(error));
client.on('warn', (warn) => console.log(warn));
process.on('unhandledRejection', (error) => console.log(error));
process.on('uncaughtException', (error) => { console.log(error); process.exit(1); });

