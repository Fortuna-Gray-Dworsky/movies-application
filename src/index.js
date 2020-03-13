// require style imports
const $ = require('jquery');
const {getMovies} = require('./api.js');
const apiKey = require('./keys.js');
const movieAPI = `http://www.omdbapi.com/?apikey=${apiKey}&t=star+wars`;        //working in syntax to search for title

fetch(movieAPI)
    .then(response => response.json())
    .then(response => console.log(response));

//Main Render
function mainRender() {
    $('.movie-info').html("");
    getMovies().then((movies) => {
        movies.forEach(({title, rating, id}) => {
            $('.movie-info').append(`<div>id#${id} - ${title} - rating: ${rating}</div>`);
        });
    });
}

mainRender();