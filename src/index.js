"use strict";
const $ = require('jquery');

$(document).ready(function () {
    const omdbKey = require('./keys.js');
    const {getMovies} = require('./api.js');
    const url = `http://www.omdbapi.com/?apikey=${omdbKey}&`;

// let yearInput = "";
// const yearSearch = url + `y=${yearInput}`;
// let idInput = "";
// const idSearch = url + `i=${idInput}`;


// Fetch user input
    $("#searchButton").click(function () {

            // Title Search function
            let titleInput = $('#userSearchValue').val();
            let titleFixed = titleInput.split(" ").join("+");
            let titleSearch = url + `&t=${titleFixed}`;
            apiCall();

            function apiCall() {

                if (titleInput === "") {
                    $("#mediaContainer").html("");
                    alert("No Movie Selected");
                }

                if (titleInput !== "") {
                    getMovieData();


                }


                // if ((movies.title).toLowerCase() === (titleInput).toLowerCase()) {
                //     populateCardDB(movies);


                // fetch(titleSearch)
                //     .then((response) => {
                //         return response.json();
                //     })
                //     .then((data) => {
                //         if ((data.Title).toLowerCase().includes((titleInput).toLowerCase())) {
                //             addMovie(data);
                //             populateCard(data);
                //         }
                //     })
            }
        }
    );


// Checks db.json for movie titles
    function getMovieData(checkIfMovieExists) {
        let movieList = [];
        fetch('./api/movies')
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                data.forEach(function (movieInfo) {
                    movieList.push((movieInfo.title).toLowerCase());
                })
            });
        return movieList;
    }


// Populates card with info.
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

    function populateCardDB(movies) {
        $("#mediaContainer").html("").append(
            '<div class="card" style="width: 18rem;">' +
            '<img src="' + movies.Poster + '" class="card-img-top" alt="' + movies.title + '"/>' +
            '<div class="card-body">' +
            '<div class="row">' +
            '<h5 class="card-title col-6 text-left">' + movies.Title + '</h5>' +
            '<a href="#" class="col-6 text-right">More Info</a>' +
            '</div>' +
            '<p class="card-text text-center">Rated: ' + movies.Rated + '</p>' +
            '<p class="card-text text-center">Released: ' + movies.Released + '</p>' +
            '<p class="card-text text-center">Runtime: ' + movies.Runtime + '</p>' +
            '</div>' +
            '</div>'
        )
    }

// // Populates card with info.
// function populateCard(data) {
//     $("#mediaContainer").html("").append(
//         '<div class="card" style="width: 18rem;">' +
//         '<img src="' + data.Poster + '" class="card-img-top" alt="' + data.Title + '"/>' +
//         '<div class="card-body">' +
//         '<div class="row">' +
//         '<h5 class="card-title col-6 text-left">' + data.Title + '</h5>' +
//         '<a href="#" class="col-6 text-right">More Info</a>' +
//         '</div>' +
//         '<p class="card-text text-center">Rated: ' + data.Rated + '</p>' +
//         '<p class="card-text text-center">Released: ' + data.Released + '</p>' +
//         '<p class="card-text text-center">Runtime: ' + data.Runtime + '</p>' +
//         '</div>' +
//         '</div>'
//     )
// }

// $('.submitButton').click(addMovie());


    function addMovie(data) {
        let userAddMovie = {
            title: data.Title,
            rating: data.Rated,     // IE PG-13
            poster: data.Poster,
            ratings: [              // IE MetaCritic 7.7
                data.Ratings[0],
                data.Ratings[1],
                data.Ratings[2]
            ],
            type: data.Type,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userAddMovie),
        };
        fetch('api/movies', options);
    }


// function mainRender() {
//     getMovies().then((movies) => {
//         console.log('Here are all the movies:');
//         movies.forEach(({title, rating}) => {
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

// Function to grab movie data from API and push it as an object into db.json file
// fetch(apiURL)
//     .then(response => response.json())
//     .then(response => {
//         console.log(response);
//         let userSearchMovie = {
//             title: response.Title,
//             rating: [response.Ratings[0], response.Ratings[1], response.Ratings[2]]
//         };
//         console.log(userSearchMovie);
//
//         //add eventlistener to 2 buttons, add to list and cancel
//         //search db.json for duplicate movie title before adding to server
//
//         let options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userSearchMovie),
//         };
//         fetch('api/movies', options);
//     });


});