const fetch = require('node-fetch');
const cheerio = require('cheerio');

//url per la ricerca generale di film
const url = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';
//url per la ricerca di un film specifico con il suo ID
const movieUrl = 'https://www.imdb.com/title/';

//costanti per utilizzo della cache
const cache = {};
const movieCache = {};

//definizione della funzione per la ricerca dei film
function searchMovies(searchTerm){

    //se c'è qualcosa nella cache che corrisponde al valore si searchTerm, la seconda volta che si farà lo scraping sarà istantaneo
    if (cache[searchTerm]){
        return Promise.resolve(cache[searchTerm]);
    };

    return fetch(`${url}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
        //creo un array per contenere i film 
        const movies = [];

        const $ = cheerio.load(body);

        //prelevo dalla classe findResult gli elementi che mi servono 
        $('.findResult').each(function(i, element){
            const $element = $(element);
            //prevelo il titolo dei film
            const $title = $element.find('td.result_text a')
            //prelevo le immagini di copertina dei film
            const $image = $element.find('td a img');

            //prelevo l'id del film per la ricerca di un singolo fil,
            const movieID = $title.attr('href').match(/title\/(.*)\//)[1];
            
            //dichiaro la variabile movie che dovrà contenere gli oggetti che ho prelevato
            const movie = {
                titolo: $title.text(),
                poster: $image.attr('src'),
                movieID
            };
            //aggiungo all'array il film 
            movies.push(movie);
        });
        //salva la ricerca nella cache in caso di scraping ridondante
        cache[searchTerm] = movies;

        return movies;
    });
}

//definizione della funzione per la ricerca di uno specifico film
function getMovie(movieID){

    if(movieCache[movieID]){
        return Promise.resolve(movieCache[movieID]);
    };

    return fetch(`${movieUrl}${movieID}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);

        //prelevo il titolo del film
        const $title = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > h1");
        const title = $title.text();

        //prelevo la durata del film
        const $runTime = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > div.TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2.hWHMKr > ul > li:nth-child(3)");
        const durata = $runTime.text();

        //prelevo il o i generi
        //creo un array che contiene i generi
        const $genre = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.Hero__MediaContentContainer__Video-kvkd64-2.kmTkgc > div.Hero__ContentContainer-kvkd64-10.eaUohq > div.Hero__MetaContainer__Video-kvkd64-4.kNqsIK > div.GenresAndPlot__ContentParent-cum89p-8.bFvaWW.Hero__GenresAndPlotContainer-kvkd64-11.twqaW > div");
        const generi = $genre.text();

        //prelevo la data di pubblicazione
        const $releaseDate = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > div.TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2.hWHMKr > ul > li:nth-child(1) > span");
        const dataRilascio = $releaseDate.text();

        //prelevo la valutazione/rating
        const $rating = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.RatingBar__RatingContainer-sc-85l9wd-0.hNqCJh.TitleBlock__HideableRatingBar-sc-1nlhx7j-4.bhTVMj > div > div:nth-child(1) > a > div > div > div.AggregateRatingButton__ContentWrap-sc-1ll29m0-0.hmJkIS > div.AggregateRatingButton__Rating-sc-1ll29m0-2.bmbYRW > span.AggregateRatingButton__RatingScore-sc-1ll29m0-1.iTLWoV");
        const valutazione = $rating.text();

        //prelevo l'immagine di copertina
        const $poster = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.Hero__MediaContentContainer__Video-kvkd64-2.kmTkgc > div.Hero__MediaContainer__Video-kvkd64-3.FKYGY > div > div.Media__PosterContainer-sc-1x98dcb-1.dGdktI > div > div.ipc-media.ipc-media--poster-27x40.ipc-image-media-ratio--poster-27x40.ipc-media--baseAlt.ipc-media--poster-l.ipc-poster__poster-image.ipc-media__img > img");
        const copertina = $poster.attr('src');

        //prelevo la trama
        const $summary = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.Hero__MediaContentContainer__Video-kvkd64-2.kmTkgc > div.Hero__ContentContainer-kvkd64-10.eaUohq > div.Hero__MetaContainer__Video-kvkd64-4.kNqsIK > div.GenresAndPlot__ContentParent-cum89p-8.bFvaWW.Hero__GenresAndPlotContainer-kvkd64-11.twqaW > p > span.GenresAndPlot__TextContainerBreakpointXL-cum89p-2.gCtawA");
        const trama = $summary.text();

        //prelevo lo scrittore
        const $writer = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section.ipc-page-section.ipc-page-section--base.StyledComponents__CastSection-y9ygcu-0.fswvJC.celwidget > ul > li:nth-child(2) > div > ul");
        const scrittore = $writer.text();

        //prelevo il o i registi
        const $director = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section.ipc-page-section.ipc-page-section--base.StyledComponents__CastSection-y9ygcu-0.fswvJC.celwidget > ul > li:nth-child(1) > div > ul > li > a");
        const regista = $director.text();

        //prelevo gli attori protagonisti
        const $stars = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section.ipc-page-section.ipc-page-section--base.StyledComponents__CastSection-y9ygcu-0.fswvJC.celwidget > div.ipc-shoveler.title-cast__grid > div.ipc-sub-grid.ipc-sub-grid--page-span-2.ipc-sub-grid--wraps-at-above-l.ipc-shoveler__grid");
        const attori = $stars.text();

        //prelevo il budget utilizzato per realizzare il film
        const $budget = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section:nth-child(50) > div.styles__MetaDataContainer-sc-12uhu9s-0.cgqHBf > ul > li:nth-child(1) > div > ul > li > span");
        const budget = $budget.text();

        //prelevo gli incassi totali del botteghino
        const $gross = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section:nth-child(50) > div.styles__MetaDataContainer-sc-12uhu9s-0.cgqHBf > ul > li:nth-child(4) > div > ul > li > span");
        const incassi = $gross.text();

        //prelevo il trailer
        const $trailer = $("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.Hero__MediaContentContainer__Video-kvkd64-2.kmTkgc > div.Hero__MediaContainer__Video-kvkd64-3.FKYGY > div > div.Media__SlateContainer-sc-1x98dcb-4.dDhYrh > div.ipc-slate.ipc-slate--baseAlt.ipc-slate--dynamic-width.Slatestyles__SlateContainer-sc-1t1hgxj-0.hZESQm.undefined.celwidget.ipc-sub-grid-item.ipc-sub-grid-item--span-4 > a");
        const trailer = $trailer.attr('href');


        //ritorno gli elementi che voglio visualizzare
        const movie = {movieID, 
                        title,
                        durata,
                        generi,
                        dataRilascio,
                        valutazione,
                        copertina,
                        trama,
                        scrittore,
                        regista,
                        attori,
                        budget,
                        incassi,
                        trailer: `https://www.imdb.com${trailer}`
        };
        //salva il film nella cache in caso di scraping ridondante
        movieCache[movieID] = movie;

        return movie;
    });    
};

//esport le funzioni di scraper.js
module.exports = {
    searchMovies,
    getMovie
};

   