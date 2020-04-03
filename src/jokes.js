const axios = require('axios')

const getChuckNorrisJoke = () =>
{
    return new Promise((resolve, reject) => {
        axios.get("http://api.icndb.com/jokes/random")
             .then(response => {
                 console.log(response.data.value.joke);
                 resolve(response.data.value.joke)
             })
             .catch(err => {
                console.log(err)
                reject(err)
             })
    })
}

const getrandomJoke = () => {
    return new Promise((resolve, reject) => {
        axios.get("https://official-joke-api.appspot.com/random_joke")
             .then(response => {
                 const joke = `${response.data.setup} \n ${response.data.punchline}`
                 console.log(joke);
                 resolve(joke)
             })
             .catch(err => {
                 console.log(err)
                 reject(err)
             })
    })
}

const getJokeOfTheDay = () => {
    return new Promise((resolve, reject) => {
        axios.get("https://api.jokes.one/jod")
             .then(response => {
                //  const joke = `${response.data.setup} \n ${response.data.punchline}`
                 console.log(response.data.contents.jokes[0].joke.text);
                //  resolve(joke)
             })
             .catch(err => {
                 console.log(err)
                 reject(err)
             })
    })
}


getChuckNorrisJoke();
getrandomJoke();
getJokeOfTheDay();