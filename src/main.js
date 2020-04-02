const dotenv = require('dotenv');
dotenv.config();

const Promise = require('bluebird');
Promise.config({
  cancellation: true
});
const TelegramBot = require('node-telegram-bot-api');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: false});
let User = require('../models/user.model');

const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
    console.log("Express app listening on port " + PORT);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.redirect('https://t.me/kxvnbot');
})
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Connected to MongoDB!");
}).catch((error)=>{
    console.log("Mongo not connected");
    console.error(error);
});


app.get('/', (req, res) => {
    res.send("Hey!")
})

const getIntent = fulfillment =>
{
    return fulfillment.queryResult.intent.displayName;
}

const getChatId = fulfillment =>
{
    return fulfillment.originalDetectIntentRequest.payload.data.from.id;
}

const getName = fulfillment =>
{
    return fulfillment.originalDetectIntentRequest.payload.data.from.first_name;
}

const subscribe = (id, first_name) =>
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

const unsubscribe = id =>
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

const sayHi = (id, first_name) =>
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

    if(getIntent(request.body) == "Covid updates")
    {
        const covid19 = require('./covid19.js');
        const state = request.body.parameters.state;
        const district = request.body.parameters.district;  
        const response = covid19.getCovidData(state, district)
        console.log(response);

    }

    bot.on('webhook_error', (error) => {
        console.log(error.code);  // => 'EPARSE'
      });
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



