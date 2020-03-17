"use strict";

const $ = require('jquery');
$(document).ready(function () {

    const omdbKey = require('./keys.js');
    const {getMovies} = require('./api.js');
    const url = `http://www.omdbapi.com/?apikey=${omdbKey}&`;
    let movieTitleList = [];

    // Stores db.json movie titles inside empty array
    function getMovieTitles() {
        fetch('./api/movies')
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                data.forEach(function (movieInfo) {
                    movieTitleList.push(movieInfo.title);
                })
            });
        return movieTitleList;
    }

    getMovieTitles();


    // User-submitted search: event-listener and potential API fetch
    $("#searchButton").click(function () {

        // Convert title to readable string for fetch url
        let titleInput = $('#userSearchValue').val();
        let titleFixed = titleInput.split(" ").join("+");
        let titleSearch = url + `&t=${titleFixed}`;

        // Render cards from either local server or API
        function renderMovieCards() {
            // Check if input is empty
            if (titleInput === "") {
                $("#mediaContainer").html("");
                alert("No Movie Selected");
            }
            // Check if movie is in db.json
            else if (movieTitleList.indexOf(titleInput) !== -1) {
                fetch('./api/movies')
                    .then(function (resp) {
                        return resp.json();
                    })
                    .then(function (data) {
                        return populateCardDB(data[movieTitleList.indexOf(titleInput)]);
                    });
            }
            // Function to grab movie data from API and push it as an object into db.json file
            else {
                fetch(titleSearch)
                    .then(response => response.json())
                    .then(response => {
                        movieTitleList.push(response.Title);
                        let userSearchMovie = {
                            title: response.Title,
                            rating: [response.Ratings[0], response.Ratings[1], response.Ratings[2]],
                            poster: response.Poster,
                            ratings: response.Ratings,
                            type: response.Type
                        };
                        let options = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(userSearchMovie),
                        };
                        fetch('api/movies', options);
                        populateCard(response);
                    });
            }

        }
        renderMovieCards();
    });


    // Render card with API information
    function populateCard(data) {
        $("#mediaContainer").html("").append(
            '<div class="card" style="width: 18rem;">' +
            '<img src="' + data.Poster + '" class="card-img-top" alt="' + data.Title + '"/>' +
            '<div class="card-body">' +
            '<div class="row">' +
            '<h5 class="card-title col-6 text-left">' + data.Title + '</h5>' +
            '<a href="#" class="col-6 text-right">More Info</a>' +
            '</div>' +
            '<p class="card-text text-center">Rated: ' + data.Rated + '</p>' +
            '<p class="card-text text-center">Released: ' + data.Released + '</p>' +
            '<p class="card-text text-center">Runtime: ' + data.Runtime + '</p>' +
            '</div>' +
            '</div>'
        )
    }

    // Render card with db.json information
    function populateCardDB(movie) {
        $("#mediaContainer").html("").append(
            '<div class="card" style="width: 18rem;">' +
            '<img src="' + movie.poster + '" class="card-img-top" alt="' + movie.title + '"/>' +
            '<div class="card-body">' +
            '<div class="row">' +
            '<h5 class="card-title col-6 text-left">' + movie.title + '</h5>' +
            '<a href="#" class="col-6 text-right">More Info</a>' +
            '</div>' +
            '<p class="card-text text-center">Rated: ' + movie.rating + '</p>' +
            // '<p class="card-text text-center">Released: ' + movie.released + '</p>' +
            // '<p class="card-text text-center">Runtime: ' + movie.runtime + '</p>' +
            '</div>' +
            '</div>'
        )
    }

    // // User-submitted addition to movies - adds data to db.json
    // $('.addMovieButton').click(addMovie());
    //
    // function addMovie() {
    //     let userAddMovie = {
    //         title: `${#userTitle}`,
    //         rating: data.rated,
    //     };
    //     let options = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(userAddMovie),
    //     };
    //     fetch('api/movies', options);
    // }


// function mainRender() {
//     getMovies().then((movies) => {
//         console.log('Here are all the movies:');
//         movies.forEach(({title, ratin}) => {
//             populateCard(title, rating);
//         });
//     }).catch((error) => {
//         alert('Oh no! Something went wrong.\nCheck the console for details.');
//         console.log(error);
//     });
// }


//New Movie Add
// $('.submitButton').click(function () {
//     //Store user-submitted title
//     let userTitle = $('#userTitle').val();
//     //Store user-submitted rating
//     let userRating = $('#userRating').val();
//
//     let userAddMovie = {
//         title: userTitle,
//         rating: userRating
//     };
//     let options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userAddMovie),
//     };
//     fetch('api/movies', options);
//     userTitle = "";
//     userRating = "";
//     mainRender();
// });


})
;