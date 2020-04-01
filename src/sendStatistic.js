const Promise = require('bluebird');
Promise.config({
  cancellation: true
});
const TelegramBot = require('node-telegram-bot-api');
const secrets = require('../secrets.json');
const bot = new TelegramBot(token, {polling: false});

const imgPath = "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/12/16/sorry-note-rex.jpg?w968h681";
        bot.sendPhoto(msg.chat.id, imgPath, { caption : "Sorry, I can't help you with that at the moment :). Please contact [Kevin](github.com/kevinam99) for this purpose. Send /start to get started.", "parse_mode": "markdown" } );