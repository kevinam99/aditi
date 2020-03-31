const TelegramBot = require('node-telegram-bot-api');
const secrets = require('./secrets.json')
// replace the value below with the Telegram token you receive from @BotFather
const token = secrets.token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


bot.on('message', (msg) => {

    if (msg.text.toString().toLowerCase().indexOf("hi") === 0 || msg.text.toString().toLowerCase().indexOf("hey") === 0 || msg.text.toString().toLowerCase().includes("hello")) {
        bot.sendMessage(msg.from.id, "Hello, " + msg.from.first_name + "!") ;
        bot.sendMessage(msg.from.id, "Enter the /start command to get started, if you haven't subscribed yet");
    } 
        
    
    else if (msg.text.toString().toLowerCase().includes("bye")) {
        bot.sendMessage(msg.from.id, "Hope to see you around again , Bye");
    } 

    else if(msg.text.toString().toLowerCase().indexOf("subscribe") === 0){
        bot.sendMessage(msg.from.id, "You have been subscribed. Welcome aboard!")
    }
    
    else if(msg.text.toString().toLowerCase().indexOf("unsubscribe") === 0){
        bot.sendMessage(msg.from.id, "You have been unsubscribed. We're sad to see you go :(")
    }

    else if(msg.text.toString().toLowerCase().includes("thank")){
        bot.sendMessage(msg.from.id, "You're welcome, " + msg.from.first_name);
    }

    else{
        // bot.sendPhoto(msg.from.id, "/home/kevin/Pictures/sendpic.jpg");
        const img = "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/12/16/sorry-note-rex.jpg?w968h681";
        bot.sendPhoto(msg.chat.id, img, { caption : "Sorry, I can't help you with that at the moment :). Please contact [Kevin](github.com/kevinam99) for this purpose. Send /start to get started.", "parse_mode": "markdown" } );

        
    }


    })

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.from.id, "Welcome, " + msg.from.first_name + ". Click on subscribe to subscribe to the feed. To unsubscribe anytime, send \"Unsubscribe\" anytime", {
    "reply_markup": {
        "keyboard": [["Subscribe me!"], ["Unsubscribe me"]]
        }
    });
        
});

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.from.id, "Hi, " + msg.from.first_name + ". Send \"subscribe\" to subscribe to the feed. To unsubscribe anytime, send \"Unsubscribe\" ", {
    "reply_markup": {
        "keyboard": [["Subscribe me!"], ["Unsubscribe me"]]
        }
    });
        
});

bot.on('polling_error', (error) => {
    console.log(error);  // => 'EFATAL'
});

