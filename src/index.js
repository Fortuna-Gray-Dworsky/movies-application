"use strict";
const $ = require('jquery');

$(window).on("load", function () {
    $(".loader-wrapper").fadeOut("slow");
}).ready(function () {

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


    // User-submitted search: event-listener and potential API fetch
    $("#searchButton").click(function () {
        seeIfMovieExistsLocally();
    });


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
        // Checks if movie is in db.json
        else if ((movieTitleList).includes((titleInput).toLowerCase())) {
            console.log(`Movie List already contains ${titleInput}.`);
            console.log(`Fetching movie information`);
            getMovies().then(function (data) {
                data.forEach(function (movie) {
                    if (((movie.Title).toLowerCase()).includes((titleInput).toLowerCase())) {
                        populateCard(movie);
                    }
                })
            })
        }
        //Fetch movie data from API
        else {
            console.log("Oops! Movie not found, Searching for your movie now!");
            findMovieFromAPI(titleSearch);
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
                if (confirm("Movie found! Would you like to add it to your list?") === true) {
                    fetch('api/movies', options);
                    movieTitleList.push((response.Title).toLowerCase());
                    populateCard(response);
                } else {
                    alert("Ok! Movie not added");
                    populateCard(response);
                }
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
            '<div class="row">' +
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
});
