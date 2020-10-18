const custom = require('./custom');
const scifi = require('./scifi');
const comedy = require('./comedy');
const romantic = require('./romantic');
const horror = require('./horror');

function getMovies(serach) {
    switch(serach) {
        case 'sci-fi':
        case 'scifi':
            return scifi;
        case 'comedy':
            return comedy;
        case 'horror':
            return horror;
        case 'romantic':
            return romantic;
        default:
            return () => custom(serach);
    }
}

module.exports = getMovies;