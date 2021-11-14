const form = document.querySelector('form');
const searchInput = document.querySelector('input');
const resultsList = document.querySelector('#results');

const BASE_URL = 'https://mycineinfo.herokuapp.com/';

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
    event.preventDefault();

    const searchTerm = searchInput.value;
    getSearchResult(searchTerm)
    .then (showResults);
}

function getSearchResult(searchTerm){
    return fetch(`${BASE_URL}search/${searchTerm}`)
    .then(res => res.json());
}

function showResults(results) {
    console.log(results);
    results.forEach(movie => {
        const li = document.createElement('li');
        const img = document.createElement('img');        
        li.appendChild(img);
        img.src = movie.poster;
        const a = document.createElement('a');
        a.textContent = movie.titolo;
        a.href = '/movie.html?movieID=' + movie.movieID;
        li.appendChild(a);
        resultsList.appendChild(li);
    });
}