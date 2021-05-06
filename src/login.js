const { connect } = require('mongoose');
const { MongoDB_ConnectURL, Client_Token, Custom_Status, Custom_Status_Text, Custom_Status_Type, VoiceChannelID } = require('./config');
const client = global.client;

connect(MongoDB_ConnectURL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false })
    .catch(() => console.log('ERROR - Database\'e bağlanılamadı.'));

client.login(Client_Token)
    .catch(() => console.log('ERROR - API\'ye bağlanılamadı.'));

client.on('ready', async () => { 

    client.user.setPresence({ activity: { name: Custom_Status_Text }, type: Custom_Status_Type, status: Custom_Status })
        .then(console.log('PASS - '+ client.user.tag +' ismiyle API\'ye bağlanıldı ve bot hazır durumda.'))
        .catch(() => console.log('WARN - Belirsiz bir hata ile karşılaşıldı.'));

    client.channels.cache.get(VoiceChannelID)
        .join()
        .catch(() => console.log('WARN - Sesli Kanal\'a bağlanılamadı.'));
}); 

