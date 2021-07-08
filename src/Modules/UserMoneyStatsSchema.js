const mongoose = require('mongoose')

const usermoneystatsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    Cash: Number,
    Bank: Number,
    lb: String,
    PensiveMode: String,
});

module.exports = mongoose.model('MoneyStats', usermoneystatsSchema, 'usermoneystats');