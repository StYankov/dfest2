const axios = require('axios').default;
const parse = require('./parseImdb');

async function getMovies() {
    const response = await axios.get(`https://www.imdb.com/search/title/?genres=sci-fi&title_type=feature&explore=genres`);

    return parse(response.data);
}

module.exports = getMovies;