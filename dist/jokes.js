"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const getChuckNorrisJoke = () => {
    console.log('grtting chuck joke');
    axios_1.default.get("http://api.icndb.com/jokes/random")
        .then(response => {
        console.log(response.data);
        console.log("found chuck joke");
        return (response.data.value.joke);
    })
        .catch(err => {
        console.log(err);
        return (err);
    });
};
const getrandomJoke = () => {
    axios_1.default.get("https://official-joke-api.appspot.com/random_joke")
        .then(response => {
        const joke = `Q. ${response.data.setup} \nA. ${response.data.punchline}`;
        console.log(joke);
        return (joke);
    })
        .catch(err => {
        console.log(err);
        return (err);
    });
};
const getJokeOfTheDay = () => {
    axios_1.default.get("https://api.jokes.one/jod")
        .then(response => {
        console.log(response.data.contents.jokes[0].joke.text);
        return (response.data.contents.jokes[0].joke.text);
    })
        .catch(err => {
        console.error(err.response.status);
        if (err.response.status == 429) {
            return (getrandomJoke());
        }
        return (err.data);
    });
};
exports.default = {
    chuckNorrisJoke: getChuckNorrisJoke,
    randomJoke: getrandomJoke,
    jokeOfTheDay: getJokeOfTheDay
};
//# sourceMappingURL=jokes.js.map