const puppeteer = require('puppeteer');

(async () => {

    //variabile che contiene l'url
    let movieUrl = 'https://www.imdb.com/title/tt0848228/';

    //inizializzo il browser
    let browser = await puppeteer.launch( {defaultViewport: false});
    //inizializzo page
    let page = await browser.newPage( {waitUntill: 'networkidle2'});

    //verrà aperta la pagina web che corrisponde al nostro movieUrl
    await page.goto(movieUrl);

    //funzione che valuta la pagina web 
    let movie = await page.evaluate(() => {

        //informazioni che devo raschiare
        let titolo = document.querySelector("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > h1").innerText;
        let dataRilascio = document.querySelector("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > div.TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2.hWHMKr > ul > li:nth-child(1) > span").innerText;
        let durata = document.querySelector("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > div.TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2.hWHMKr > ul > li:nth-child(3)").innerText;
        let generi = document.querySelector("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.Hero__MediaContentContainer__Video-kvkd64-2.kmTkgc > div.Hero__ContentContainer-kvkd64-10.eaUohq > div.Hero__MetaContainer__Video-kvkd64-4.kNqsIK > div.GenresAndPlot__ContentParent-cum89p-8.bFvaWW.Hero__GenresAndPlotContainer-kvkd64-11.twqaW > div").innerText;
        let valutazione = document.querySelector("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.Hero__MediaContentContainer__Video-kvkd64-2.kmTkgc > div.Hero__ContentContainer-kvkd64-10.eaUohq > div.Hero__MetaContainer__Video-kvkd64-4.kNqsIK > div.RatingBar__RatingContainer-sc-85l9wd-0.hNqCJh.Hero__HideableRatingBar-kvkd64-12.hBqmiS > div > div:nth-child(1) > a > div > div > div.AggregateRatingButton__ContentWrap-sc-1ll29m0-0.hmJkIS > div.AggregateRatingButton__Rating-sc-1ll29m0-2.bmbYRW > span.AggregateRatingButton__RatingScore-sc-1ll29m0-1.iTLWoV").innerText;
        let copertina = document.querySelector("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.Hero__MediaContentContainer__Video-kvkd64-2.kmTkgc > div.Hero__MediaContainer__Video-kvkd64-3.FKYGY > div > div.Media__PosterContainer-sc-1x98dcb-1.dGdktI > div > a").href;
        let regista = document.querySelector("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section.ipc-page-section.ipc-page-section--base.StyledComponents__CastSection-y9ygcu-0.fswvJC.celwidget > ul > li:nth-child(1) > div > ul > li > a").innerText;
        let trama = document.querySelector("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section:nth-child(30) > div.Storyline__StorylineWrapper-sc-1b58ttw-0.iywpty > div.ipc-overflowText.ipc-overflowText--pageSection.ipc-overflowText--height-long.ipc-overflowText--long.ipc-overflowText--base > div.ipc-html-content.ipc-html-content--base > div").innerText;
        let budget = document.querySelector("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section:nth-child(50) > div.styles__MetaDataContainer-sc-12uhu9s-0.cgqHBf > ul > li:nth-child(1) > div > ul > li > span").innerText;
        let incassi = document.querySelector("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section:nth-child(50) > div.styles__MetaDataContainer-sc-12uhu9s-0.cgqHBf > ul > li:nth-child(4) > div > ul > li > span").innerText;
        let trailer = document.querySelector("#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.Hero__MediaContentContainer__Video-kvkd64-2.kmTkgc > div.Hero__MediaContainer__Video-kvkd64-3.FKYGY > div > div.Media__SlateContainer-sc-1x98dcb-4.dDhYrh > div.ipc-slate.ipc-slate--baseAlt.ipc-slate--dynamic-width.Slatestyles__SlateContainer-sc-1t1hgxj-0.hZESQm.undefined.celwidget.ipc-sub-grid-item.ipc-sub-grid-item--span-4 > a").href;

        return {titolo, dataRilascio, durata, generi, valutazione, copertina, regista, trama, budget, incassi, trailer}
    });
    //stampo l'oggetto
    console.log(movie);

    //una volta finito lo scrape delle informazioni chiudo il browser.
    await browser.close();
})();