const cheerio = require('cheerio');

function parse(html) {
    const $ = cheerio.load(html);
    const result = [];
    const movies = $('.lister-item');
    movies.each(function(i, el) {
        result.push({
            name: $(this).find('.lister-item-header a').first().text(),
            url: 'https://www.imdb.com' + $(this).find('.lister-item-header a').first().attr('href'),
            image: $(this).find('.lister-item-image img').first().attr('src'),
            body: $(this).find('.ratings-bar').next('p').first().text(),
            type: 'movies'
        })
    });

    return result;
}

module.exports = parse;