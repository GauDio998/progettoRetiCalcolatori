//importo express
const express = require ('express');
//importo cors che permette a qualsiasi server di accedere alle risorse della mia applicazione
const cors = require('cors');
//importo il file scraper.js
const scraper = require('./scraper');

//creo l'app express
const app = express();

app.use(cors());

//Percorso di base localhost:3000
app.get('/', (req, res) => {
    res.json({
        message: 'Progetto reti di calcolatori'
    })
});

//perorso per la ricerca di film 
app.get('/search/:title', (req, res) => {
    //passo dalla funzione searchMovies il titolo da posizionare nella barra di ricerca
    scraper
    .searchMovies(req.params.title)
    //restituisco l'oggetto movies in formato json
    .then(movies => {
        res.json(movies);
    });
});

//percorso per la ricerca di un film specifico attraverso l'uso del suo specifico ID
app.get('/movie/:movieID', (req, res) => {
    //passo dalla funzione searchMovies l'ID del film da posizionare nella barra di ricerca
    scraper
    .getMovie(req.params.movieID)
    //restituisco il film specificato dall'ID in formato json
    .then(movie => {
        res.json(movie);
    });
});


//creo il server e mi metto in ascolto sulla porta 3000 localhost
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server in ascolto sulla porta 3000');
});