const mongoose = require('mongoose');

const CasesModSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ServerID: String,
    CaseNumber: Number,
    User: String,
    Reason: String,
    Messages: String,
    Hidden: String,
});

module.exports = mongoose.model('cases', CasesModSchema, 'CasesMod');