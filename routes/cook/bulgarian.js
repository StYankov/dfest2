const axios = require('axios').default;
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function getData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.tasteatlas.com/50-most-popular-foods-in-bulgaria');
    await new Promise(req => setTimeout(req, 3400));

    const dishes1HTML = await page.evaluate(() => document.body.innerHTML);

    await page.goto('https://www.tasteatlas.com/most-popular-food-in-bulgaria');
    await new Promise(req => setTimeout(req, 1000));

    const dishes2HTML = await page.evaluate(() => document.body.innerHTML);

    return parseData(dishes2HTML).reverse().concat(parseData(dishes1HTML).reverse());
}

function parseData(html) {
    const $ = cheerio.load(html);
    const recepies = $('.top-list-article__item');

    const results = [];
    recepies.each(function(i, el) {
        const names = $(this).find('.top-list-article__item-title .middle a'); 
        results.push({
            name: names.eq(1).text(),
            url: 'https://www.tasteatlas.com/' + $(this).find('.more-info a').first().attr('href'),
            image: $(this).find('.top-list-article__item-image img').first().attr('src'),
            type: 'recipe',
            body: {
                type: names.eq(0).text(),
                description: $(this).find('.description').attr('read-more-txt').replace(/(<([^>]+)>)/gi, "")
            }
        });
    });

    return results;
}

module.exports = getData;