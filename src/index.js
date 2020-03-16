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
    console.log(titleSearch);
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
                    '<h3>' + data.Title + '</h3>' +
                    '<img src="' + data.Poster + '"/>' +
                    '<h3>' + "Released: " + data.Year + '</h3>' +
                    '<h3>' + "Rated: " + data.Rated + '</h3>' +
                    '<h3>' + "Release Date: " + data.Released + '</h3>' +
                    '<h3>' + "Runtime: " + data.Runtime + '</h3>'
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