const axios = require('axios').default;
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function getData() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.udemy.com/courses/search/?src=ukw&q=knitting`);
    await new Promise(req => setTimeout(req, 1000));

    const udemyHTML = await page.evaluate(() => document.body.innerHTML);

    await page.goto(`https://www.skillshare.com/browse/knitting`);
    await new Promise(req => setTimeout(req, 1000));
    const skillshareHTML = await page.evaluate(() => document.body.innerHTML);

    const udemyData = parseUdemyData(udemyHTML);
    const skillShareData = parseSkillShareData(skillshareHTML);

    return [...udemyData].concat(skillShareData);
}

module.exports = getData;

function parseUdemyData(html) {
    const $ = cheerio.load(html);
    const courses = $('.course-list--container--3zXPS > div');

    const result = [];
    courses.each(function(i, el) {
        result.push({
            name: $(this).find('.course-card--course-title--2f7tE').first().text(),
            url: $(this).find('a').first().attr('href'),
            image: $(this).find('img').first().attr('src'),
            type: 'knitting',
            body:  {
                price: $(this).find('.price-text--container--Ws-fP > .price-text--price-part--Tu6MH:first-child').text(),
                description: $(this).find('.course-card--course-headline--yIrRk').text()
            }
        });
    });

    return result;
}

function parseSkillShareData(html) {
    const $ = cheerio.load(html);
    const courses = $('.ss-card:not(.hidden)');

    const result = [];

    courses.each(function(i, el) {
        result.push({
            name: $(this).find('.ss-card__title').first().text(),
            url: $(this).find('.ss-card__thumbnail').first().attr('href'),
            image: $(this).find('.thumbnail-img').first().attr('src'),
            type: 'knitting',
            body: {
                price: '',
                description: ''
            }
        });
    });

    return result;
}