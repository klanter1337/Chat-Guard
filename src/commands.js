const client = global.client;
const db = require('./db');
const config = require('./config');
const { MessageEmbed } = require('discord.js');
const { RandomColor } = require('./functions');


client.on('message', async message => {
    if(message.content.indexOf(config.Prefix) !== 0)
    if(!message.guild || message.guild.id !== config.ServerID || message.author.bot || !message.member.hasPermission(8)) return;
    if(config.BotsOwner.includes(message.author.id) === false || message.author.id !== message.guild.owner.id) return;
    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0].slice(config.Prefix.length);
    if(!command) return;
    const embed = new MessageEmbed().setColor(RandomColor(true)).setTimestamp().setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }));

    if(command.toLowerCase() === 'serverstatus') {
        const Database = await db.findOne({ ServerID: message.guild.id });
        if(Database) {

            message.channel.send(new MessageEmbed()
                .setColor(RandomColor(true))
                .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                .setThumbnail(message.guild.iconURL())
                .setTimestamp()
                .setDescription(`
        __**SİSTEMLER**__
        \`•\` **Character Limit:** ${Database.CharacterLimit ? '\`✔️\`' : '\`❌\`'}
        \`•\` **Invite Guard:** ${Database.InviteGuard ? '\`✔️\`' : '\`❌\`'}
        \`•\` **Link Guard:** ${Database.LinkGuard ? '\`✔️\`' : '\`❌\`'}
        \`•\` **MassPing Guard:** ${Database.MassPingGuard ? '\`✔️\`' : '\`❌\`'}
        \`•\` **BadWord Guard:** ${Database.BadWordGuard ? '\`✔️\`' : '\`❌\`'}
        \`•\` **Spam Guard:** ${Database.SpamGuard ? '\`✔️\`' : '\`❌\`'}
     
        __**WHİTELİST**__
        \`>\` Whitelist'te ki üyeler: ${Database.WhiteListMembers ? Database.WhiteListMembers.map(id => `<@${id}>`).join('\n') : 'Whitlist\'te hiç üye yok.'}
        \`>\` Whitelist'te ki roller: ${Database.WhiteListRoles ? Database.WhiteListRoles.map(id => `<@&${id}>`).join('\n') : 'Whitlist\'te hiç rol yok.'}
        \`>\` Whitelist'te ki kanallar: ${Database.WhiteListChannels ? Database.WhiteListChannels.map(id => `<#${id}>`).join('\n') : 'Whitlist\'te hiç kanal yok.'}
 
        __**Filtre**__
        \`•\`Kelime: **${Database.FiltredWords ? Database.FiltredWords.join() : 'Filtre\'de hiç kelime yok.'}**

  `)); }

        if(!Database) {
            message.channel.send(new MessageEmbed()
                .setColor(RandomColor(true))
                .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                .setThumbnail(message.guild.iconURL())
                .setTimestamp()
                .setDescription(`
    __**SİSTEMLER**__
    \`•\` **Character Limit:**\`❌\`
    \`•\` **Invite Guard:**\`❌\`
    \`•\` **Link Guard:**\`❌\`
    \`•\` **MassPing Guard:**\`❌\`
    \`•\` **BadWord Guard:**\`❌\`
    \`•\` **Spam Guard:**\`❌\`

   __**WHİTELİST**__
   \`>\` Whitelist'te ki üyeler: **Whitlist'te hiç üye yok.**
   \`>\` Whitelist'te ki roller: **Whitlist'te hiç rol yok.**
   \`>\` Whitelist'te ki kanallar: **Whitlist'te hiç kanal yok.**

   __**Filtre**__
   \`•\`Kelime: **Filtre'de hiç kelime yok**.
`)); }

    }
    if(command.toLowerCase() === 'komutlar') {

        message.channel.send(new MessageEmbed()
            .setColor(RandomColor(true))
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
            .setTitle('Chat Guard Komutları')
            .setTimestamp()
            .setDescription(`
    \`•\` :star: Sunucunun durumunu görmek için: \`${config.Prefix}serverstatus\`

    \`•\` Üyeleri bir rolü veya kanalı whitelist'e almak için: \`${config.Prefix}whitelist [ekle veya kaldır] [Rol veya kanal veya üye](etiket veya id)\`
    
    \`•\` Sunucuda Herhangi bir kelimenin  kullanılmaması yani filtreye eklemek için: \`${config.Prefix}filtre [ekle veya kaldır] [kelime]\`

    \`•\` Sunucuda ceza yemiş belirli bir kullanıcının cezasını kaldırmak için: \`${config.Prefix}cezakaldır @user [etiket veya id] \`
    
    \`•\` Sunucuda Çok uzun yazılıp sohbeti dolduran mesajların silinmesi için: \`${config.Prefix}characterlimit [aç veya kapat] \`
    
    \`•\` Sunucuda Başka sunucuların davet linklerinin  paylaşılmaması için: \`${config.Prefix}inviteguard [aç veya kapat] \`
    
    \`•\` Sunucuda herhangi bir link paylaşılmaması için için: \`${config.Prefix}linkguard [aç veya kapat] \`
    
    \`•\` Sunucuda Mesajında bir sürü kişinin etiketlenememesi için: \`${config.Prefix}masspingguard [aç veya kapat] \`

    \`•\` Sunucuda Küfür içerikli mesajlar atılmaması için: \`${config.Prefix}badwordguard [aç veya kapat] \`

    \`•\` Sunucuda spam yapılmaması için: \`${config.Prefix}spamguard [aç veya kapat] \`
    
      `));
    }
   
    if(command.toLowerCase() === 'whitelist') {
   


        if(!args[0]) return message.channel.send(embed.setDescription(':x: Örnek kullanım: **'+config.Prefix+'whitelist ekle/kaldır id/etiket (rol veya kanal veya kullanıcı)**'));

        if (args[0] === 'ekle' || args[0] === 'add' ) {
           
            var member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
            var role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
            var channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            if(!member && !role && !channel) return message.channel.send(embed.setDescription(':x: Örnek kullanım: **'+config.Prefix+'whitelist ekle/kaldır id/etiket (rol veya kanal veya kullanıcı)**'));

        
            if(member){   
                const Database = await db.findOne({ ServerID: message.guild.id });
                if (Database && Database.WhiteListMembers.includes(member.user.id)) return message.channel.send(embed.setDescription('**<@'+member.user.id+'>**, İsimli üye zaten whitlist\'te bulunmakta'));
        
                await db.findOneAndUpdate({ ServerID: message.guild.id }, { $push: { WhiteListMembers: member.user.id } }, { upsert: true });
                return message.channel.send(embed.setDescription('**<@'+member.user.id+'>**, İsimli üye başarıyla whitelist\'e eklendi'));}
      
            if(role) { 
                const Database = await db.findOne({ ServerID: message.guild.id });
                if (Database && Database.WhiteListRoles.includes(role.id))  return message.channel.send(embed.setDescription('**<@&'+role.id+'>**, İsimli Rol zaten whitlist\'te bulunmakta'));
          
                await db.findOneAndUpdate({ ServerID: message.guild.id }, { $push: { WhiteListRoles: role.id } }, { upsert: true });
                return message.channel.send(embed.setDescription('**<@&'+role.id+'>**, İsimli rol başarıyla whitelist\'e eklendi'));}
      
            if(channel) { 
                const Database = await db.findOne({ ServerID: message.guild.id });
                if (Database && Database.WhiteListChannels.includes(channel.id)) return message.channel.send(embed.setDescription('**<#'+channel.id+'>**, İsimli kanal zaten whitlist\'te bulunmakta'));
      
                await db.findOneAndUpdate({ ServerID: message.guild.id }, { $push: { WhiteListChannels: channel.id } }, { upsert: true });
                return message.channel.send(embed.setDescription('**<#'+channel.id+'>**, İsimli kanal başarıyla whitelist\'e eklendi'));}
        }
        if (args[0] === 'remove' || args[0] === 'kaldır' ) {

            var member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
            var role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
            var channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            if(!member && !role && !channel) return message.channel.send(embed.setDescription(':x: Örnek kullanım: **'+config.Prefix+'whitelist ekle/kaldır id/etiket (rol veya kanal veya kullanıcı)**'));

            if(member){   
                const Database = await db.findOne({ ServerID: message.guild.id });
                if (!Database || !Database.WhiteListMembers.includes(member.user.id)) return message.channel.send(embed.setDescription('**<@'+member.user.id+'>**, İsimli üye zaten whitlist\'te değil.'));
       
                await db.findOneAndUpdate({ ServerID: message.guild.id }, { $pull: { WhiteListMembers: member.id } } );
                return message.channel.send(embed.setDescription('**<@'+member.user.id+'>**, İsimli üye başarıyla whitelist\'ten kaldırıldı.'));}
     
            if(role) { 
                const Database = await db.findOne({ ServerID: message.guild.id });
                if (!Database || !Database.WhiteListRoles.includes(role.id)) return message.channel.send(embed.setDescription('**<@&'+role.id+'>**, İsimli rol zaten whitlist\'te değil.'));
         
                await db.findOneAndUpdate({ ServerID: message.guild.id }, { $pull: { WhiteListRoles: role.id } } );
                return message.channel.send(embed.setDescription('**<@&'+role.id+'>**, İsimli rol başarıyla whitelist\'ten kaldırıldı.'));}
     
            if(channel) { 
                const Database = await db.findOne({ ServerID: message.guild.id });
                if (!Database || !Database.WhiteListChannels.includes(channel.id)) return message.channel.send(embed.setDescription('**<#'+channel.id+'>**, İsimli kanal zaten whitlist\'te değil.'));
     
                await db.findOneAndUpdate({ ServerID: message.guild.id }, { $pull: { WhiteListChannels: channel.id }});
                return message.channel.send(embed.setDescription('**<#'+channel.id+'>**, İsimli kanal başarıyla whitelist\'ten kaldırıldı.'));}
        }
    }

    if(command.toLowerCase() === 'filtre') {
        if (!args[0]) return message.channel.send(embed.setDescription(':x: Örnek kullanım: '+config.Prefix+'filtre ekle/kaldır kelime'));
   
        if (args[0] === 'ekle' || args[0] === 'add' ) {
            if (!args[1]) return message.channel.send(embed.setDescription(':x: Örnek kullanım: '+config.Prefix+'filtre ekle/kaldır kelime'));
            const Database = await db.findOne({ ServerID: message.guild.id });    
            if (Database && Database.FiltredWords.includes(args[1]) === true) return message.channel.send(embed.setDescription('**'+args[1]+'**, Bu kelime zaten filtre\'de var.'));

            await db.findOneAndUpdate({ ServerID: message.guild.id }, { $push: { FiltredWords: args[1] } }, { upsert: true });
            return message.channel.send(embed.setDescription('**'+args[1]+'**, Başarıyla filtre\'ye eklendi.'));
        }
   
        if (args[0] === 'kaldır' || args[0] === 'remove' ) {
            if (!args[1]) return message.channel.send(embed.setDescription(':x: Örnek kullanım: '+config.Prefix+'filtre ekle/kaldır kelime'));
            const Database = await db.findOne({ ServerID: message.guild.id });    
            if (!Database || Database.FiltredWords.includes(args[1]) !== true) return message.channel.send(embed.setDescription('**'+args[1]+'**, Bu kelime zaten filtre\'de değil.'));
           
            await db.findOneAndUpdate({ ServerID: message.guild.id }, { $pull: { FiltredWords: args[1] }});
            return message.channel.send(embed.setDescription('**'+args[1]+'**, Başarıyla filtre\'den kaldırıldı.')); }
    }

    if(command.toLowerCase() === 'cezakaldır') {
   
        var member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

        if(!member) return message.channel.send(embed.setDescription(':x: Örnek kullanım: **'+config.Prefix+'cezakaldır @user/user id**'));

        const Database = await db.findOne({ ServerID: message.guild.id });
        if(!Database) return  message.channel.send(embed.setDescription('**<@'+member.user.id+'>**, İsimli üye\'nin herhangi bir cezası bulunamadı.'));

        if(Database.BlueListMembers.includes(member.user.id) === true) {
            await db.findOneAndUpdate({ ServerID: message.guild.id }, { $pull: { BlueListMembers: member.user.id } });
            return  message.channel.send(embed.setDescription('**<@'+member.user.id+'>**, İsimli üye\'nin uyarısı başarıyla kaldırıldı.'));
        }
        
        if(Database.BlackListMembers.includes(member.user.id) === true) {
            await db.findOneAndUpdate({ ServerID: message.guild.id }, { $pull: { BlackListMembers: member.user.id } });
            const MuteRole = message.guild.roles.cache.find(role => role.id === config.MutedRoleID);
            member.roles.remove(MuteRole);

            return message.channel.send(embed.setDescription('**<@'+member.user.id+'>**, İsimli üye\'nin mutesi başarıyla kaldırıldı.'));
        }
        if(Database.BlueListMembers.includes(member.user.id) === false || Database.BlackListMembers.includes(member.user.id) === false) return  message.channel.send(embed.setDescription('**<@'+member.user.id+'>**, İsimli üye\'nin herhangi bir cezası bulunamadı.'));
    }
      

    if(command.toLowerCase() === 'characterlimit') {

        const Database = await db.findOne({ServerID: message.guild.id});
        if(args[0] === 'aç') {
            if(Database && Database.CharacterLimit == true) return message.channel.send(embed.setDescription('<@'+message.author.id+'>, Bu Koruma zaten açık.'));

            await db.findOneAndUpdate({ServerID: message.guild.id}, { CharacterLimit: true }, {upsert: true});
            return message.channel.send(embed.setDescription('<@'+message.author.id+'>, **Karakter Limit** başarıyla açıldı.'));        
        }

        if(args[0] === 'kapat') {
            if(!Database || Database.CharacterLimit == false)  return message.channel.send(embed.setDescription('<@'+message.author.id+'>, Bu Koruma zaten kapalı.'));
            await db.findOneAndUpdate({ServerID: message.guild.id}, { CharacterLimit: false }, {upsert: true});
            return message.channel.send(embed.setDescription('<@'+message.author.id+'>, **Karakter Limit** başarıyla kapatıldı.'));        
        }

    }

    if(command.toLowerCase() === 'inviteguard') {

        const Database = await db.findOne({ServerID: message.guild.id});
        if(args[0] === 'aç') {
            if(Database && Database.InviteGuard == true) return message.channel.send(embed.setDescription('<@'+message.author.id+'>, Bu Koruma zaten açık.'));

            await db.findOneAndUpdate({ServerID: message.guild.id}, { InviteGuard: true }, {upsert: true});
            return message.channel.send(embed.setDescription('<@'+message.author.id+'>, **Invite koruması** başarıyla açıldı.'));        
        }

        if(args[0] === 'kapat') {
            if(!Database || Database.InviteGuard == false)  return message.channel.send(embed.setDescription('<@'+message.author.id+'>, Bu Koruma zaten kapalı.'));
            await db.findOneAndUpdate({ServerID: message.guild.id}, { InviteGuard: false }, {upsert: true});
            return message.channel.send(embed.setDescription('<@'+message.author.id+'>, **Invite koruması** başarıyla kapatıldı.'));        
        }

    }

    if(command.toLowerCase() === 'linkguard') {

        const Database = await db.findOne({ServerID: message.guild.id});
        if(args[0] === 'aç') {
            if(Database && Database.LinkGuard == true) return message.channel.send(embed.setDescription('<@'+message.author.id+'>, Bu Koruma zaten açık.'));

            await db.findOneAndUpdate({ServerID: message.guild.id}, { LinkGuard: true }, {upsert: true});
            return message.channel.send(embed.setDescription('<@'+message.author.id+'>, **Link koruması** başarıyla açıldı.'));        
        }

        if(args[0] === 'kapat') {
            if(!Database || Database.LinkGuard == false)  return message.channel.send(embed.setDescription('<@'+message.author.id+'>, Bu Koruma zaten kapalı.'));
            await db.findOneAndUpdate({ServerID: message.guild.id}, { LinkGuard: false }, {upsert: true});
            return message.channel.send(embed.setDescription('<@'+message.author.id+'>, **Link koruması** başarıyla kapatıldı.'));        
        }

    }

    if(command.toLowerCase() === 'masspingguard') {

        const Database = await db.findOne({ServerID: message.guild.id});
        if(args[0] === 'aç') {
            if(Database && Database.MassPingGuard == true) return message.channel.send(embed.setDescription('<@'+message.author.id+'>, Bu Koruma zaten açık.'));

            await db.findOneAndUpdate({ServerID: message.guild.id}, { MassPingGuard: true }, {upsert: true});
            return message.channel.send(embed.setDescription('<@'+message.author.id+'>, **Etiket koruması** başarıyla açıldı.'));        
        }

        if(args[0] === 'kapat') {
            if(!Database || Database.MassPingGuard == false)  return message.channel.send(embed.setDescription('<@'+message.author.id+'>, Bu Koruma zaten kapalı.'));
            await db.findOneAndUpdate({ServerID: message.guild.id}, { MassPingGuard: false }, {upsert: true});
            return message.channel.send(embed.setDescription('<@'+message.author.id+'>, **Etiket koruması** başarıyla kapatıldı.'));        
        }

    }

    if(command.toLowerCase() === 'badwordguard') {

        const Database = await db.findOne({ServerID: message.guild.id});
        if(args[0] === 'aç') {
            if(Database && Database.BadWordGuard == true) return message.channel.send(embed.setDescription('<@'+message.author.id+'>, Bu Koruma zaten açık.'));

            await db.findOneAndUpdate({ServerID: message.guild.id}, { BadWordGuard: true }, {upsert: true});
            return message.channel.send(embed.setDescription('<@'+message.author.id+'>, **Küfür koruması** başarıyla açıldı.'));        
        }

        if(args[0] === 'kapat') {
            if(!Database || Database.BadWordGuard == false)  return message.channel.send(embed.setDescription('<@'+message.author.id+'>, Bu Koruma zaten kapalı.'));
            await db.findOneAndUpdate({ServerID: message.guild.id}, { BadWordGuard: false }, {upsert: true});
            return message.channel.send(embed.setDescription('<@'+message.author.id+'>, **Küfür koruması** başarıyla kapatıldı.'));        
        }

    }
  
    if(command.toLowerCase() === 'spamguard') {

        const Database = await db.findOne({ServerID: message.guild.id});
        if(args[0] === 'aç') {
            if(Database && Database.SpamGuard == true) return message.channel.send(embed.setDescription('<@'+message.author.id+'>, Bu Koruma zaten açık.'));

            await db.findOneAndUpdate({ServerID: message.guild.id}, { SpamGuard: true }, {upsert: true});
            return message.channel.send(embed.setDescription('<@'+message.author.id+'>, **Spam koruması** başarıyla açıldı.'));        
        }

        if(args[0] === 'kapat') {
            if(!Database || Database.SpamGuard == false)  return message.channel.send(embed.setDescription('<@'+message.author.id+'>, Bu Koruma zaten kapalı.'));
            await db.findOneAndUpdate({ServerID: message.guild.id}, { SpamGuard: false }, {upsert: true});
            return message.channel.send(embed.setDescription('<@'+message.author.id+'>, **Spam koruması** başarıyla kapatıldı.'));        
        }

    }
});
   
