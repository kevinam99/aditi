const axios = require('axios')

const getChuckNorrisJoke = () =>
{
    return new Promise((resolve, reject) => {
        console.log('grtting chuck joke')
        axios.get("http://api.icndb.com/jokes/random")
             .then(response => {
                 console.log(response.data);
                 console.log("found chuck joke")
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
                 const joke = `Q. ${response.data.setup} \nA. ${response.data.punchline}`
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
                 resolve(response.data.contents.jokes[0].joke.text)
             })
             .catch(err => {
                 console.error(err.response.status)
                 if(err.response.status == 429) // too many requests
                 {
                     resolve(getrandomJoke())
                     reject(error)
                 }
                 reject(err.data)
             })
    })
}


// getChuckNorrisJoke();
// getrandomJoke();
// getJokeOfTheDay();

module.exports = {
    chuckNorrisJoke: getChuckNorrisJoke,
    randomJoke: getrandomJoke,
    jokeOfTheDay: getJokeOfTheDay
}