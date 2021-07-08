const mongoose = require('mongoose');

const ModerationCasesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ServerID: String,
    CaseNumber: Number,
    Moderator: String,
    Reason: String,
});

module.exports = mongoose.model('Setting ', ModerationCasesSchema, 'Settings');