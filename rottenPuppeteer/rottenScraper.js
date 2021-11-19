//importo puppeteer
const puppeteer = require('puppeteer');

//dichiaro la funzione 
(async () => {
    //dicharo l'indirizzo url della pagina sulla quale voglio eseguire lo scraping
    const movieUrl = 'https://www.rottentomatoes.com/m/marvels_the_avengers';

    //apro il browser, defaultViewport serve per visualizzare il sito a schermo intero
    let browser = await puppeteer.launch( {headless: false, defaultViewport: false});
    
    let page = await browser.newPage();

    await page.goto(movieUrl, {awaitUntill: 'networkidle2'});

    //codice per la ricerca delle informazioni
    let movie = await page.evaluate(() => {
        let titolo = document.querySelector("#topSection > div.thumbnail-scoreboard-wrap > score-board > h1").innerText;
        let valutazioneSito = document.querySelector("#topSection > div.thumbnail-scoreboard-wrap > score-board").shadowRoot.querySelector("div > div.scores-container > div.tomatometer-container > div > score-icon-critic").shadowRoot.querySelector("div > span.percentage").innerText;
        let valutazioneAudience = document.querySelector("#topSection > div.thumbnail-scoreboard-wrap > score-board").shadowRoot.querySelector("div > div.scores-container > div.audience-container > div > score-icon-audience").shadowRoot.querySelector("div > span.percentage").innerText;
        let durata = document.querySelector("#mainColumn > section.panel.panel-rt.panel-box.movie_info.media > div > div > ul > li:nth-child(9) > div.meta-value > time").innerText;
        let generi = document.querySelector("#mainColumn > section.panel.panel-rt.panel-box.movie_info.media > div > div > ul > li:nth-child(2) > div.meta-value.genre").innerText;
        let dataRilascio = document.querySelector("#mainColumn > section.panel.panel-rt.panel-box.movie_info.media > div > div > ul > li:nth-child(7) > div.meta-value > time").innerText;
        let copertina = document.querySelector("#poster_link > img").src;
        let trama = document.querySelector("#movieSynopsis").innerText;
        let scrittore = document.querySelector("#mainColumn > section.panel.panel-rt.panel-box.movie_info.media > div > div > ul > li:nth-child(6) > div.meta-value > a").innerText;
        let regista = document.querySelector("#mainColumn > section.panel.panel-rt.panel-box.movie_info.media > div > div > ul > li:nth-child(4) > div.meta-value > a").innerText;
        let produttore = document.querySelector("#mainColumn > section.panel.panel-rt.panel-box.movie_info.media > div > div > ul > li:nth-child(5) > div.meta-value > a").innerText;

        //ritorno un unico grande oggetto
        return {titolo, generi, valutazioneSito, valutazioneAudience, durata, dataRilascio, copertina, trama, scrittore, regista, produttore}
    });

    //stampo il risultato 
    console.log(movie);

    //chiudo il browser
    await browser.close();
})();