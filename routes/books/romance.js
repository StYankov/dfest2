const axios = require('axios');
const { parseGoodReadsData, parseManyBooksData } = require('./_helpers');

async function getData() {
    const manyBooksResponse = await axios.get('https://manybooks.net/search-book?mnybks_comment_rate%5Brate_5%5D=1&language=All&field_genre%5B38%5D=38&sticky=All&created_op=%3C&created%5Bvalue%5D=0&created%5Bmin%5D=&created%5Bmax%5D=&author_uid_op=%3E%3D&author_uid%5Bvalue%5D=0&author_uid%5Bmin%5D=&author_uid%5Bmax%5D=&sort_by=field_downloads');
    const manyBooksData = parseManyBooksData(manyBooksResponse.data);

    const goodReadsResponse = await axios.get('https://www.goodreads.com/list/show/84922.Top_100_Romance_Novels_on_Goodreads');
    const goodReadsData = parseGoodReadsData(goodReadsResponse.data);

    let response = [...manyBooksData].concat(goodReadsData);

    return response;
}

module.exports = getData;