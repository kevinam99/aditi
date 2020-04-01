const Promise = require('bluebird');
Promise.config({
  cancellation: true
});
const TelegramBot = require('node-telegram-bot-api');
const secrets = require('../secrets.json')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const token = secrets.token;


app.listen(5000, function(){
    console.log("Express app listening on port " + 5000);
});

const bot = new TelegramBot(token, {polling: false});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("Hey!")
})

function getIntent(fulfillment)
{
    return fulfillment.queryResult.intent.displayName;
}

function getChatId(fulfillment)
{
    return fulfillment.body.originalDetectIntentRequest.payload.data.from.id;
}

function getName(fulfillment)
{
    return fulfillment.body.originalDetectIntentRequest.payload.data.from.first_name;
}

function subscribe(id, first_name)
{
    
}

function unsubscribe(id)
{

}

function sayHi(id, first_name)
{

}



app.post('/updates', (request, response) => {
    res.send("Hey there. Received event at webhook!");

    console.log(request.body.originalDetectIntentRequest.payload.data.from.id)
    bot.sendMessage(id, `You have been subscribed. Welcome aboard, ${name}!`);

});



bot.on('message', (msg) => {

    if (msg.text.toString().toLowerCase().indexOf("hi") === 0 || msg.text.toString().toLowerCase().indexOf("hey") === 0 || msg.text.toString().toLowerCase().includes("hello")) {
        bot.sendMessage(msg.from.id, "Hello, " + msg.from.first_name + "!") ;
        bot.sendMessage(msg.from.id, "Enter the /start command to get started, if you haven't subscribed yet");
    } 
        
    
    else if (msg.text.toString().toLowerCase().includes("bye")) {
        bot.sendMessage(msg.from.id, "Hope to see you around again , Bye");
    } 

    // else if(msg.text.toString().toLowerCase().indexOf("subscribe") === 0){
    //     bot.sendMessage(msg.from.id, "You have been subscribed. Welcome aboard!")
    // }
    
    else if(msg.text.toString().toLowerCase().indexOf("unsubscribe") === 0){
        bot.sendMessage(msg.from.id, "You have been unsubscribed. We're sad to see you go :(")
    }

    else if(msg.text.toString().toLowerCase().includes("thank")){
        bot.sendMessage(msg.from.id, "You're welcome, " + msg.from.first_name);
    }

    else{
        // bot.sendPhoto(msg.from.id, "/home/kevin/Pictures/sendpic.jpg");
        const imgPath = "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/12/16/sorry-note-rex.jpg?w968h681";
        bot.sendPhoto(msg.chat.id, imgPath, { caption : "Sorry, I can't help you with that at the moment :). Please contact [Kevin](github.com/kevinam99) for this purpose. Send /start to get started.", "parse_mode": "markdown" } );

        
    }


    })

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(id, "Welcome, " + msg.from.first_name + ". Click on subscribe to subscribe to the feed. To unsubscribe anytime, send \"Unsubscribe\" anytime", {
    "reply_markup": {
        "keyboard": [["Subscribe me!"], ["Unsubscribe me"]]
        }
    });
        
});

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(id, "Hi, " + msg.from.first_name + ". Send \"subscribe\" to subscribe to the feed. To unsubscribe anytime, send \"Unsubscribe\" ", {
    "reply_markup": {
        "keyboard": [["Subscribe me!"], ["Unsubscribe me"]]
        }
    });
        
});



bot.on('webhook_error', (error) => {
    console.log(error.code);  // => 'EPARSE'
  });