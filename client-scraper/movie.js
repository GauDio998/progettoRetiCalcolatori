const main = document.querySelector('main');
const movieID = window.location.search.match(/movieID=(.*)/)[1];
const BASE_URL = 'https://mycineinfo.herokuapp.com/';


function getMovie(movieID) {
    return fetch(`${BASE_URL}movie/${movieID}`)
    .then(res => res.json());
}

function revealMovie(movie){
    console.log(movie);
    const section = document.createElement('section');
    main.appendChild(section);

    section.outerHTML = `
                            <section class="row">
                            <h1 ${movie.titolo}</h1>
                                <div class="col-sm-12">
                                    <img src="${movie.poster}" class='img-fluid"/>
                                </div>
                            </section>`
}

getMovie(movieID)
.then(revealMovie);