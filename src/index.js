
// require style imports
const {getMovies} = require('./api.js');
const apiKey = require('./keys.js');
const movieAPI = `http://www.omdbapi.com/?apikey=${apiKey}&t=`;

// function test () {
  fetch(movieAPI)
      .then(response => response.json())
      .then(response => console.log(response));
// }
// test();



getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

