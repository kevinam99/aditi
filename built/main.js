"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const node_telegram_bot_api_1 = require("node-telegram-bot-api");
const express_1 = require("express");
const body_parser_1 = require("body-parser");
const app = express_1.default();
const mongoose_1 = require("mongoose");
const token = process.env.BOT_TOKEN;
const bot = new node_telegram_bot_api_1.default(token, { polling: false });
const user_model_1 = require("./models/user.model");
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Express app listening on port " + PORT);
});
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get('/', (request, response) => {
    response.redirect('https://t.me/kxvnbot');
});
const uri = process.env.ATLAS_URI;
mongoose_1.default.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("Connected to MongoDB!");
}).catch((error) => {
    console.log("Mongo not connected");
    console.error(error);
});
app.get('/', (req, res) => {
    res.send("Hey!");
});
function capitalizeWords(str) {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
const getIntent = fulfillment => {
    return fulfillment.queryResult.intent.displayName;
};
const getChatId = fulfillment => {
    return fulfillment.originalDetectIntentRequest.payload.data.from.id;
};
const getName = fulfillment => {
    return fulfillment.originalDetectIntentRequest.payload.data.from.first_name;
};
const subscribe = (id, first_name) => {
    const name = first_name;
    const userId = id;
    const newUser = new user_model_1.default({ name: name, id: userId });
    newUser.save((err, user) => {
        if (err) {
            console.error(err);
            if (err.code == 11000) {
                const message = `You are already subscribed, ${first_name}!`;
                bot.sendMessage(id, message);
            }
        }
        else if (!err) {
            const message = `You have been subscribed. Welcome aboard, ${first_name}!`;
            bot.sendMessage(id, message);
        }
    });
};
const unsubscribe = id => {
    const userId = id;
    user_model_1.default.findOne({ id: userId }, (err, user) => {
        if (err) {
            console.error(err);
        }
        else if (user == null) {
            const message = `You are already unsubscribed. Send 'subscribe' if you want to subscribe again.`;
            bot.sendMessage(id, message);
        }
        else if (user != null) {
            user_model_1.default.deleteOne({ id }, (err, response) => {
                if (!err && response) {
                    const message = `You have been unsubscribed. We're sad to see you go`;
                    bot.sendMessage(id, message);
                }
                else if (err) {
                    console.error(err);
                }
            });
        }
    });
};
function covidUpdates(fullfillment, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const covid19 = require('./covid19');
        let state = fullfillment.queryResult.parameters.state;
        let district = fullfillment.queryResult.parameters.district;
        state = state.toLowerCase();
        district = district.toLowerCase();
        state = capitalizeWords(state);
        if (state == "Andaman And Nicobar Islands") {
            state = "Andaman and Nicobar Islands";
        }
        district = capitalizeWords(district);
        const covid19ModuleResponse = yield covid19.getCovidData(state = state, district);
        // .then(covid19ModuleResponse  => {
        if (covid19ModuleResponse == "State not found") {
            const message = `${state} not found :(`;
            bot.sendMessage(id, message);
        }
        if (covid19ModuleResponse == "District not found") {
            const message = `${district} not found :(`;
            bot.sendMessage(id, message);
        }
        if (state && !district || district == null || district == undefined) {
            if (covid19ModuleResponse == 0) {
                console.log("in main.js, confirmed = " + covid19ModuleResponse);
                const message = `There are  ${covid19ModuleResponse} confirmed cases in ${state}. All information is sourced from volunteer-driven crowdsource data from this [page](https://covid19india.org/)`;
                bot.sendMessage(id, message, { parse_mode: "markdown", disable_web_page_preview: true });
            }
            else if (covid19ModuleResponse == 1) {
                console.log("in main.js, confirmed = " + covid19ModuleResponse);
                const message = `There is  ${covid19ModuleResponse} confirmed case in ${state}. All information is sourced from volunteer-driven crowdsource data from this [page](https://covid19india.org/)`;
                bot.sendMessage(id, message, { parse_mode: "markdown", disable_web_page_preview: true });
            }
            else if (covid19ModuleResponse > 1) {
                console.log("in main.js, confirmed = " + covid19ModuleResponse);
                const message = `There are  ${covid19ModuleResponse} confirmed cases in ${state}. All information is sourced from volunteer-driven crowdsource data from this [page](https://covid19india.org/)`;
                bot.sendMessage(id, message, { parse_mode: "markdown", disable_web_page_preview: true });
            }
        }
        else {
            if (covid19ModuleResponse == 0) {
                console.log("in main.js, confirmed = " + covid19ModuleResponse);
                const message = `There are  ${covid19ModuleResponse} confirmed cases here at ${district}, ${state}. All information is sourced from volunteer-driven crowdsource data from this [page](https://covid19india.org/)`;
                bot.sendMessage(id, message, { parse_mode: "markdown", disable_web_page_preview: true });
            }
            else if (covid19ModuleResponse == 1) {
                console.log("in main.js, confirmed = " + covid19ModuleResponse);
                const message = `There is  ${covid19ModuleResponse} confirmed case here at ${district}, ${state}.All information is sourced from volunteer-driven crowdsource data from this [page](https://covid19india.org/)`;
                bot.sendMessage(id, message, { parse_mode: "markdown", disable_web_page_preview: true });
            }
            else if (covid19ModuleResponse > 1) {
                console.log("in main.js, confirmed = " + covid19ModuleResponse);
                const message = `There are ${covid19ModuleResponse} confirmed cases here at ${district}, ${state}.
                                        All information is sourced from volunteer-driven crowdsource data from this [page](https://covid19india.org/).`;
                bot.sendMessage(id, message, { parse_mode: "markdown", disable_web_page_preview: true });
            }
        }
        // });
    });
}
function getJoke(fullfillment) {
    return __awaiter(this, void 0, void 0, function* () {
        const jokes = require('./jokes');
        const joke_type = fullfillment.queryResult.parameters.type.toLowerCase();
        if (joke_type == "") {
            const joke = yield jokes.randomJoke();
            return joke;
        }
        else if (joke_type == "joke of the day") {
            const joke = yield jokes.jokeOfTheDay();
            return joke;
        }
        else if (joke_type == "chuck" || joke_type == "norris") {
            const joke = yield jokes.chuckNorrisJoke();
            return joke;
        }
    });
}
const sayHi = (id, first_name) => {
    const message = `Hello, ${first_name}`;
    bot.sendMessage(id, message);
};
app.post('/updates', (request, response) => {
    response.send("Hey there. Received event at webhook!");
    // console.log(request)
    const id = getChatId(request.body);
    const name = getName(request.body);
    // sayHi(id, name)
    if (getIntent(request.body) == "Subscribe") {
        try {
            subscribe(id, name);
        }
        catch (err) {
            console.log(err);
        }
    }
    if (getIntent(request.body) == "Unsubscribe - yes") {
        unsubscribe(id);
    }
    if (getIntent(request.body) == "Covid updates") {
        covidUpdates(request.body, id).catch(err => {
            bot.sendMessage(id, err);
            console.log(err);
        });
    }
    if (getIntent(request.body) == "Jokes") {
        const joke = getJoke(request.body)
            .then(joke => {
            console.log(joke);
            bot.sendMessage(id, joke);
        })
            .catch(err => console.log(err));
    }
    bot.on('webhook_error', (error) => {
        console.log(error.code); // => 'EPARSE'
    });
});
// bot.onText(/\/start/, (msg) => {
//     bot.sendMessage(id, "Welcome, " + msg.from.first_name + ". Click on subscribe to subscribe to the feed. To unsubscribe anytime, send \"Unsubscribe\" anytime", {
//     "reply_markup": {
//         "keyboard": [["Subscribe me!"], ["Unsubscribe me"]]
//         }
//     });
// });
// bot.onText(/\/help/, (msg) => {
//     bot.sendMessage(id, "Hi, " + msg.from.first_name + ". Send \"subscribe\" to subscribe to the feed. To unsubscribe anytime, send \"Unsubscribe\" ", {
//     "reply_markup": {
//         "keyboard": [["Subscribe me!"], ["Unsubscribe me"]]
//         }
//     });
// });
