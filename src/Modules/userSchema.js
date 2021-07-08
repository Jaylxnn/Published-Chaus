const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ServerID: String,
    userID: String,
    muteCount: Number,
    warnCount: Number,
    kickCount: Number,
    banCount: Number,
    pronouns: String,
    description: String,
    trusted: Boolean,
    staffmember: Boolean,
    loved: Boolean,
    knowndeveloper: Boolean,
    swag: Boolean,
    Blacklisted: Boolean,
});

module.exports = mongoose.model('Users', userSchema, 'users');