const Promise = require('bluebird');
Promise.config({
  cancellation: true
});
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {polling: false});
const token = process.env.BOT_TOKEN;

const caption = "Sorry, I can't help you with that at the moment :). Please contact [Kevin](github.com/kevinam99) for this purpose. Send /start to get started.";
const parse_mode = "markdown";
const imgPath = "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/12/16/sorry-note-rex.jpg?w968h681";
ot.sendPhoto(msg.chat.id, imgPath, { caption : caption, parse_mode: parse_mode } );