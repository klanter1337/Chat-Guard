const config = { 
//------------Connections-----------//
    Client_Token: '',
    MongoDB_ConnectURL: '',
    //------------BotSettings-----------//
    Prefix: '',
    Custom_Status_Text: '',
    Custom_Status_Type: 'PLAYING', // => PLAYING / WATCHING / LISTENING
    Custom_Status: 'dnd', // => dnd / idle / online / invisible
    VoiceChannelID: '',
    //------------ServerSettings-----------//
    ServerID: '',
    MutedRoleID: '',
    PunishLogChannelID: '',
    MuteDurationMinute: 60 
};
  
module.exports = config;
