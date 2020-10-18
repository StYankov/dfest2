const axios = require('axios').default;

async function getMovies(search) {
    const str = search.toLowerCase().replace(' ', '_');
    const response = await axios.get(`https://v2.sg.media-imdb.com/suggestion/${str[0]}/${str}.json`, { headers: { 'Accept': 'application/json' } });
    const result = [];

    for(const movie of response.data.d) {
        result.push({
            name: movie.l,
            url: `https://www.imdb.com/title/${movie.id}?ref_=nv_sr_srsg_0`,
            image: movie.i && movie.i.imageUrl,
            type: 'movies',
            body: {
                year: movie.y || '',
            }
        })
    }

    return result;
}

module.exports = getMovies;