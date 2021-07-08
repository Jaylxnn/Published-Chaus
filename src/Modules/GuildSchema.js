const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ServerID: String,
    ServerPrefix: String,
    ServerModLogChannelID: String,
    CaseCurrentNumber: Number,
    SuggestionChannelID: String,
    SuggestionCurrentNumber: Number,
    Blacklisted: String,
});

module.exports = mongoose.model('Setting', guildSchema, 'Settings');