const puppeteer = require('puppeteer');

(async () => {
    const movieUrl = 'https://www.themoviedb.org/movie/24428-the-avengers';

    let browser = await puppeteer.launch( {headless: false, defaultViewport: false});
    let page = await browser.newPage();

    await page.goto(movieUrl, {awaitUntill: 'networkidle2'});

    let movie = await page.evaluate(() => {
        let titolo = document.querySelector("#original_header > div.header_poster_wrapper.true > section > div.title.ott_true > h2 > a").innerText;
        let generi = document.querySelector("#original_header > div.header_poster_wrapper.true > section > div.title.ott_true > div > span.genres").innerText;
        let durata = document.querySelector("#original_header > div.header_poster_wrapper.true > section > div.title.ott_true > div > span.runtime").innerText;
        let dataRilascio = document.querySelector("#original_header > div.header_poster_wrapper.true > section > div.title.ott_true > div > span.release").innerText;
        let copertina = document.querySelector("#original_header > div.poster_wrapper.true > div.poster > div.image_content.backdrop > img").src;
        let trama = document.querySelector("#original_header > div.header_poster_wrapper.true > section > div.header_info > div").innerText;
        let scrittore = document.querySelector("#original_header > div.header_poster_wrapper.true > section > div.header_info > ol > li:nth-child(3)").innerText;
        let regista = document.querySelector("#original_header > div.header_poster_wrapper.true > section > div.header_info > ol > li:nth-child(1)").innerText;
        let budget = document.querySelector("#media_v4 > div > div > div.grey_column > div > section > div:nth-child(1) > div > section.facts.left_column > p:nth-child(4)").innerText;
        let incassi = document.querySelector("#media_v4 > div > div > div.grey_column > div > section > div:nth-child(1) > div > section.facts.left_column > p:nth-child(5)").innerText;
        let trailer = document.querySelector("#media_scroller > div > div.video.card.no_border > div > a").href;

        return {titolo, generi, durata, dataRilascio, copertina, trama, scrittore, regista, budget, incassi, trailer}
    });

    console.log(movie);

    await browser.close();
})();