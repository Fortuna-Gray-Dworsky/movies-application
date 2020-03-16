// require style imports
const $ = require('jquery');
const {getMovies} = require('./api.js');
const apiKey = require('./keys.js');
const apiURL = `http://www.omdbapi.com/?apikey=${apiKey}&t=star+wars`;
//working in syntax to search for title


//Function to grab movie data from API and push it as an object into db.json file
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


//New Movie Add
$('.submitButton').click(function () {
    //Store user-submitted title
    let userTitle = $('#userTitle').val();
    //Store user-submitted rating
    let userRating = $('#userRating').val();

    let userAddMovie = {
        title: userTitle,
        rating: userRating
    };
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAddMovie),
    };
    fetch('api/movies', options);
    userTitle = "";
    userRating = "";
    mainRender();
});