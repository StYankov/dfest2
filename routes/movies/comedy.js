const axios = require('axios').default;
const parse = require('./parseImdb');

async function getMovies() {
    const response = await axios.get(`https://www.imdb.com/search/title/?genres=comedy`);

    return parse(response.data);
}

module.exports = getMovies;