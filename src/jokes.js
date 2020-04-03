const apis = {
    "chuck": "http://api.icndb.com/jokes/random",
    "random": "https://official-joke-api.appspot.com/random_joke" {setup, punchline},
    "jokeoftheday": "https://api.jokes.one/jod"
}

const axios = require('axios')

const getChuckNorrisJoke = () =>
{
    return new Promise((resolve, reject) => {
        axios.get("http://api.icndb.com/jokes/random")
             .then(response => {
                 console.log(response);
             })
             .catch(err => console.log(err))
    })
}

getChuckNorrisJoke();