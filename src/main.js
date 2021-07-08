const BotClient = require('../src/Structures/BotClient');
const config = require('../BotConfig.json');
const colourembed = require('../shortcutembedcolor.json')
const mongoose = require('mongoose');
/*const express = require('express');
const app = express();
let port = require('../BotConfig.json').port || 3000;
app.set('port', port);


const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(session({
    secret: '48738924783748273742398747238',
    resave: false,
    saveUninitialized: false,
    expires: 604800000,
}));
require('./router')(app);

app.listen(port, () => console.info(`${port} is now Connected`));*/

const client = new BotClient(config);
require('discord-buttons')(client)
client.mongoose = require('../src/Structures/mongoose');

client.mongoose.init();
client.start();                                                                                         