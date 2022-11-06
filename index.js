/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleMovies` variable below to gain access to an array of movies.

  Keep in mind that your functions must still have and use a parameter for accepting all movies.
*/
const exampleMovies = require("./movies");
// Do not change the line above.

/**
 * getAllMovieTitles()
 * -----------------------------
 * Returns all of titles from an array of movies. If the inputted `movies` array is empty, return `[]`.
 * @param {Object[]} movies - An array of movies. See the `movies.js` file for an example of this array.
 * @returns {string[]} An array of strings, which are movie titles.
 *
 * EXAMPLE:
 *  getAllMovieTitles(movies);
 *  //> [
      "Toy Story 4",
      "Inside Out",
      "Coco",
      "Incredibles 2",
      "Moana",
      "How to Train Your Dragon",
      "Paddington",
      "The Lion King",
      "Fantasia",
      "James and the Giant Peach",
    ];
 */
function getAllMovieTitles(movies) {
  let movieArray = []; // array we'll return
  for (const movie of movies) {
    // loop through movies
    movieArray.push(movie.title); // add current movie's title to returned array
  }
  return movieArray; // return final array
}

/**
 * getHighestMetascore()
 * -----------------------------
 * Returns the highest `metascore` among all movies. If the inputted `movies` array is empty, return `0`.
 * @param {Object[]} movies - An array of movies. See the `movies.js` file for an example of this array.
 * @returns {number} The highest `metascore` of all movies.
 *
 * EXAMPLE:
 *  getHighestMetascore(movies);
 *  //> 96
 */
function getHighestMetascore(movies) {
  let highestScore = 0; // what we'll return, accumulator
  let holderScore; // intermediate array
  for (const movie of movies) {
    // loop through movies
    let score = movie.ratings[2].value; // pull out the Metacritic score
    holderScore = score.split("/"); // split the string at the slash into an array with two elements
    if (Number(holderScore[0]) > highestScore) {
      // make a number out of the first element in that array, and test if it's the highest score so far
      highestScore = Number(holderScore[0]); // replace our accumulator with highest score so far
    }
  }
  return highestScore; // return our var
}

/**
 * getAverageIMDBRating()
 * -----------------------------
 * Averages all of the IMDB ratings from all movies and returns it, as a number. If the inputted `movies` array is empty, return `0`.
 * @param {Object[]} movies - An array of movies. See the `movies.js` file for an example of this array.
 * @returns {number} The average IMDB rating across all movies.
 *
 * EXAMPLE:
 *  getAverageIMDBRating(movies);
 *  //> 7.76
 */
function getAverageIMDBRating(movies) {
  let averageScore = 0; // what we'll return
  let scoreArray = []; // intermediate array for holding numbers we collect

  if (!movies.length) {
    return averageScore;
  } // if no movies are passed into the function, return zero
  for (const movie of movies) {
    // loop through movies
    let score = movie.ratings[0].value; // pull the iMDB score out of the ratings array in the current movie object
    let scoreValue = score.split("/"); // split the string at the slash into an array with two elements
    scoreArray.push(Number(scoreValue[0])); // convert the string into a number and add it to our intermediate array
  }
  let sum = 0; // the sum of all scores
  for (const number of scoreArray) {
    // loop through intermediate array
    sum += number; // get total sum of all numbers in array
  }
  averageScore = sum / scoreArray.length; // calculate the average
  return averageScore; // return the average
}

/**
 * countByRating()
 * -----------------------------
 * Returns an object where the keys are movie ratings and the values are the number of movies in the array with that rating. If the inputted `movies` array is empty, return `{}`.
 * @param {Object[]} movies - An array of movies. See the `movies.js` file for an example of this array.
 * @returns {Object} An object where keys are movie ratings (e.g. "PG") and the values are how many movies in the array have that rating (e.g. 7).
 *
 * EXAMPLE:
 *  countByRating(movies);
 *  //> { G: 3, PG: 7 }
 */
function countByRating(movies) {
  let ratingsObject = {}; // the object we'll return
  for (const movie of movies) {
    // loop through movies
    if (ratingsObject[movie.rated]) {
      // check for a key of the current movie's rating in the object
      ratingsObject[movie.rated]++; // increment the value for that key
    } else {
      ratingsObject[movie.rated] = 1; // else create the key in the object and initialize it's value to 1
    }
  }
  return ratingsObject; // return final object
}

/**
 * findById()
 * -----------------------------
 * Returns a movie object from an array of objects based on the ID. If the inputted `movies` array is empty or the ID does not match any movie, return `null`.
 * @param {Object[]} movies - An array of movies. See the `movies.js` file for an example of this array.
 * @param {string} id - A unique `imdbID`.
 * @returns {Object|null} The movie object with the matching `imdbID`.
 *
 * EXAMPLE:
 *  findById(movies, "tt1979376");
 *  //> {
      // Toy Story 4
    };
 */
function findById(movies, id) {
  let movie = null; // movie we'll return

  if (!movies.length) {
    // if no movies are passed to the fn, return null
    return movie;
  }
  for (const movie of movies) {
    // loop through movies
    if (movie.imdbID === id) {
      // check if current movie's id matches the parameter id
      return movie; // if it matches, return the current movie
    }
  }
  return movie;
}

/**
 * filterByGenre()
 * -----------------------------
 * Returns all movie objects with a matching genre. Case-insensitive. If the inputted `movies` array is empty or no movies match the inputted `genre`, return `[]`.
 * @param {Object[]} movies - An array of movies. See the `movies.js` file for an example of this array.
 * @param {string} genre - The genre of a movie. (e.g. "Fantasy")
 * @returns {Object[]} An array of movies where at least one of the genres matches the `genre` inputted.
 *
 * EXAMPLE:
 *  filterByGenre(movies, "Mystery");
 *  //> [
      {
        // Coco
      }
    ]
 *
 * EXAMPLE:
 *  filterByGenre(movies, "Horror")
 *  //> []
 */
function filterByGenre(movies, genre) {
  let genreMovies = []; // the array we'll return
  genre = genre[0].toUpperCase() + genre.slice(1).toLowerCase(); // normalize the genre parameter string so it is capitalized like the genres in the movies array
  for (const movie of movies) {
    // loop through the array
    if (movie.genre.split(", ").includes(genre)) {
      // split the movie genre string into an array, and check if that array includes the genre parameter string as one of its elements
      genreMovies.push(movie); // add the movie object to the final array if it passes the test
    }
  }
  return genreMovies; // return final array
}

/**
 * getAllMoviesReleasedAtOrBeforeYear()
 * -----------------------------
 * Returns all movie objects with a `released` year equal to or less than the given year.
 * @param {Object[]} movies - An array of movies. See the `movies.js` file for an example of this array.
 * @param {number} year - A year as a number. (e.g. 2000)
 * @returns {Object[]} An array of movies where the `released` year is equal to or less than the inputted year.
 *
 * EXAMPLE:
 *  getAllMoviesReleasedAtOrBeforeYear(movies, 2000);
 *  //> [
      {
        // The Lion King
      },
      {
        // Fantasia
      },
      {
        // James and the Giant Peach
      }
    ];
 */
function getAllMoviesReleasedAtOrBeforeYear(movies, year) {
  movieArray = []; // array we'll return

  for (const movie of movies) {
    // loop through movies
    let movieYear = Number(movie.released.split(" ")[2]); // split the 'released' string at the spaces and convert the third element, the year, into a number
    if (movieYear <= year) {
      // check if that year is less than or equal to the year parameter
      movieArray.push(movie); // if so, add movie to our final array
    }
  }
  return movieArray; // return relevant movies
}

/**
 * getBiggestBoxOfficeMovie()
 * -----------------------------
 * Returns the name of the movie with the highest `boxOffice` amount.
 * @param {Object[]} movies - An array of movies. See the `movies.js` file for an example of this array.
 * @returns {string} The name of the movie that made the most money at the box office.
 *
 * EXAMPLE:
 *  getBiggestBoxOfficeMovie(movies);
 *  //> "Incredibles 2"
 */
function getBiggestBoxOfficeMovie(movies) {
  let boxOfficeHighest = 0; // accumulator
  let highBOMovie = null; // what we return

  for (const movie of movies) {
    // looping through movies
    let boxOfficeNum = Number(movie.boxOffice.replace(/[^0-9]/g, "")); // Regex to strip out anything that's not a digit from our boxOffice string
    if (boxOfficeNum > boxOfficeHighest) {
      // is the current movie's box office bigger than what we have stored?
      boxOfficeHighest = boxOfficeNum; // replace accumulator var with current highest value
      highBOMovie = movie.title; // replace return var with current movie's title
    }
  }
  return highBOMovie;
}

// Do not change anything below this line.
module.exports = {
  getAllMovieTitles,
  getHighestMetascore,
  getAverageIMDBRating,
  countByRating,
  findById,
  filterByGenre,
  getAllMoviesReleasedAtOrBeforeYear,
  getBiggestBoxOfficeMovie,
};
