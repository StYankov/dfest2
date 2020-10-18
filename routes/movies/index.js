const custom = require('./custom');

function getMovies(serach) {
    switch(serach) {
        default:
            return () => custom(serach);
    }
}

module.exports = getMovies;