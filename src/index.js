/**
 * es6 modules and imports
 */
const $ = require('jquery');
import sayHello from './hello';
import {fetch} from "whatwg-fetch";
sayHello('World');

/**
 * require style imports
 */
const omdbKey = require('./keys.js');
const {getMovies} = require('./api.js');
const url = `http://www.omdbapi.com/?apikey=${omdbKey}&`;




let yearInput = "";
const yearSearch = url + `y=${yearInput}`;
let idInput = "";
const idSearch = url + `i=${idInput}`;


// Fetch user input

$("#searchButton").click( function () {
    // Title Search function
    let titleInput = $('#userSearchValue').val();
    let titleFixed = titleInput.split(" ").join("+");
    let titleSearch = url + `&t=${titleFixed}` ;
    apiCall();

    function apiCall() {
        fetch(titleSearch)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                $("#mediaContainer").html("");
                $("#mediaContainer").append(
                    '<div class="card" style="width: 18rem;">' +
                        '<img src="' + data.Poster + '" class="card-img-top" alt="' + data.Title + '"/>' +
                        '<div class="card-body">' +
                            '<h5 class="card-title">' + data.Title + '</h5>' +
                            '<p class="card-text">Rated: ' + data.Rated + '</p>' +
                            '<p class="card-text">Released: ' + data.Released + '</p>' +
                            '<p class="card-text">Runtime: ' + data.Runtime + '</p>' +
                        '</div>' +
                    '</div>'
                )
            })
    }


});


// Fetch movie information
function apiCall() {
    fetch(titleSearch)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
}







getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});