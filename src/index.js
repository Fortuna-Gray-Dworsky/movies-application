"use strict";
const $ = require('jquery');


$(document).ready(function () {

    const omdbKey = require('./keys.js');
    const {getMovies} = require('./api.js');
    const url = `http://www.omdbapi.com/?apikey=${omdbKey}&`;
    let movieTitleList = [];


    /* Converts the movie titles from db.json to an array to be
     iterated through to see if movie already exists locally */
    function getMovieTitles() {
        movieTitleList = [];
        getMovies().then(function (data) {
            data.forEach(function (movieInfo) {
                movieTitleList.push((movieInfo.Title).toLowerCase());
            });

            console.log(movieTitleList);
            return movieTitleList;
        })
    }
    getMovieTitles();



    // Render cards from either local server if available or API if not stored locally
    function seeIfMovieExistsLocally() {

        // Convert title to readable string for fetch url
        let titleInput = $('#userSearchValue').val();
        let titleFixed = titleInput.split(" ").join("+");
        let titleSearch = url + `&t=${titleFixed}`;


        // Check if input is empty
        if (titleInput === "") {
            $("#mediaContainer").html("").finish(alert("No Movie Selected"));

        }
        // Checks if in
        if ((movieTitleList).includes((titleInput).toLowerCase())) {
            console.log(`Movie List already contains ${titleInput}.`);
            console.log(`Fetching movie information`);
            renderCards(titleInput);

        } else if (!(movieTitleList).includes((titleInput.toLowerCase()))) {
            console.log("Oops! Movie not found, Searching for your movie now!");
            findMovieFromAPI(titleSearch);
        }


        // forEach to loop through for rendering the card the user searched for.
        function renderCards() {
            getMovies().then(function (data) {
                data.forEach(function (movie) {
                    if (movie.Title.includes(titleInput)) {
                        console.log("Now showing Information for: " + movie.Title);
                        populateCard(movie);
                    }
                })
            })
        }
    }








    // Searches API for movie information
    function findMovieFromAPI(titleSearch) {
        fetch(titleSearch)
            .then(response => response.json())
            .then(response => {
                let movieData = {
                    Title: response.Title,
                    Year: response.Year,
                    Rated: response.Rated,
                    Released: response.Released,
                    Runtime: response.Runtime,
                    Genre: response.Genre,
                    Director: response.Director,
                    Writer: response.Writer,
                    Actors: response.Actors,
                    Plot: response.Plot,
                    Language: response.Language,
                    Country: response.Country,
                    Awards: response.Awards,
                    Poster: response.Poster,
                    Ratings: response.Ratings,
                    Metascore: response.Metascore,
                    imdbRating: response.imdbRating,
                    imdbVotes: response.imdbVotes,
                    imdbID: response.imdbID,
                    Type: response.Type,
                    totalSeasons: response.totalSeasons
                };
                let options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(movieData)
                };
                fetch('api/movies', options);
            }).then( function () {
            movieTitleList = [];
            console.log("Found your movie, just a little bit more...");
            getMovieTitles();
            alert("Your movie has been found! Please search again.");
        })
    }








    // Renders card from db.json information
    function populateCard(movie) {
        $("#mediaContainer").html("").append(
            '<div class="card" style="width: 18rem;">' +
            '<img src="' + movie.Poster + '" class="card-img-top" alt="' + movie.Title + '"/>' +
            '<div class="card-body pt-0">' +
            '<div class="row">' +
            '<a href="#" class="col-12 text-right mr-0 mt-0 pt-0 pr-0">More Info</a>' +
            '</div>' +
            '<h5 class="card-title text-center">' + movie.Title + '</h5>' +
            '<div class="row">' +
            '<p class="col-6 card-text text-center">Rated: </p>' +
            `<p class="col-6 card-text text-center">${movie.Rated}</p>` +
            '</div>' +
            '<div class="row">'+
            '<p class="col-6 card-text text-center">Released: ' + '</p>' +
            `<p class="col-6 card-text text-center">${movie.Released}</p>` +
            '</div>' +
            '<div class="row">' +
            '<p class="col-6 card-text text-center">Runtime: ' + '</p>' +
            `<p class="col-6 card-text text-center">${movie.Runtime}</p>` +
            '</div>' +
            '</div>' +
            '</div>'
        )
    }





// User-submitted search: event-listener and potential API fetch
    $("#searchButton").click(function () {
        seeIfMovieExistsLocally();
    });

});