const dotenv = require('dotenv');
dotenv.config();
console.log()

const Promise = require('bluebird');
Promise.config({
  cancellation: true
});
const TelegramBot = require('node-telegram-bot-api');
const secrets = require('../secrets.json')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const token = secrets.token;
const bot = new TelegramBot(token, {polling: false});
let User = require('../models/user.model');

const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
    console.log("Express app listening on port " + PORT);
});

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
    return fulfillment.originalDetectIntentRequest.payload.data.from.id;
}

function getName(fulfillment)
{
    return fulfillment.originalDetectIntentRequest.payload.data.from.first_name;
}

function subscribe(id, first_name)
{
    const name = first_name
    const userId = id; 
    const newUser = new User({name: name, id: userId});

    newUser.save((err, user) => {
        if(err)
        {
            console.error(err)
            if(err.code == 11000)
            {
                const message = `You are already subscribed, ${first_name}!`;
                bot.sendMessage(id, message)
            }
        }

        
        else if(!err)
        {
            const message = `You have been subscribed. Welcome aboard, ${first_name}!`;
            bot.sendMessage(id, message);
        }
    })
          
    
}

function unsubscribe(id)
{   
    const userId = id;
    User.findOne({id: userId}, (err, user) => {
        if(err)
        {
            console.error(err)
        }

        else if(user == null)
        {
            const message = `You are already unsubscribed. Send 'subscribe' if you want to subscribe again.`;
            bot.sendMessage(id, message);   
        }
        else if(user != null)
        {
            User.deleteOne({id}, (err, response) =>{
                if(!err && response)
                {
                    const message = `You have been unsubscribed. We're sad to see you go`;
                    bot.sendMessage(id, message);
                }
                else if(err)
                {
                    console.error(err);
                }
                
            })
        }

        
        
    });
    
}

function sayHi(id, first_name)
{
    const message = `Hello, ${first_name}`;
    bot.sendMessage(id, message);
}



app.post('/updates', (request, response) => {
    response.send("Hey there. Received event at webhook!");
    // console.log(request)
    const id = getChatId(request.body)
    const name = getName(request.body)
    // sayHi(id, name)

    if(getIntent(request.body) == "Subscribe")
    {
        subscribe(id, name, () => console.log(`${name}, subscribed`));
    }

    if(getIntent(request.body) == "Unsubscribe - yes")
    {
        unsubscribe(getChatId(request.body))
    }
    // console.log(request.body.originalDetectIntentRequest.payload.data.from.id)
    


    bot.on('webhook_error', (error) => {
        console.log(error.code);  // => 'EPARSE'
      });
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


const uri = "mongodb+srv://kevinam99:baloney5000@cluster0-f2cdt.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Connected to MongoDB!");
}).catch((error)=>{
    console.log("Mongo not connected");
    console.error(error);
});
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



