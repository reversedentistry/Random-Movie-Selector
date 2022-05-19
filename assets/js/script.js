

// -----
var imdburl = "https://imdb-api.com/en/API/Top250Movies/k_ms032o15";
var randomNumber = 0;
var randomMovieDiv = document.querySelector("#random-movie");
var randomBtn = document.querySelector("#random-btn");
var poster = document.querySelector("#random-movie-poster")


getRandomNumber();



// two functions to fetch from the movie and pokemon apis respectively
function getRandomMovie() {
  fetch(imdburl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getRandomNumber();
      randomMovieDiv.innerHTML = "Movie Name: " + data.items[randomNumber].title + "<br /> Ranking: " + data.items[randomNumber].rank + "<br /> IMDB Rating: " + data.items[randomNumber].imDbRating
      poster.setAttribute("src", data.items[randomNumber].image)
    });
};


// funtion to grab a random number
function getRandomNumber() {
  randomNumber = Math.floor(Math.random() * 249);
}

// Event listeners for the two buttons to get random movie or random pokemon
randomBtn.addEventListener("click", getRandomMovie);
// randomBtnPokemon.addEventListener("click", getRandomPokemon)

let searchBtn = document.querySelector("#search-btn");
let moviePosterEl = document.querySelector("#movie-poster");
let movDetailsEl = document.querySelector("#movie-details");

searchBtn.addEventListener("click", search);


function search() {
  let movieSearch = document.querySelector("#title-search").value;
  fetch('http://www.omdbapi.com/?apikey=3649a4e3&t=' + movieSearch)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayMovie(data);
    })
    .catch(err => console.error(err));
}

function displayMovie(movieData) {
  let movieTitle = document.querySelector("#title");
  movieTitle.textContent = movieData.Title;

  let moviePoster = document.querySelector("#poster");
  moviePoster.src = movieData.Poster;
  
  let movieDirector = document.querySelector("#director");
  movieDirector.innerHTML = "<strong>Directed by:</strong> " + movieData.Director;

  let movieRelease = document.querySelector("#release-date");
  movieRelease.innerHTML = "<strong>Released:</strong> " + movieData.Released;

  let moviePlot = document.querySelector("#plot");
  moviePlot.innerHTML = "<strong>Plot:</strong> " + '"' + movieData.Plot + '"';

  let movieCast = document.querySelector("#cast");
  movieCast.innerHTML = "<strong>Cast:</strong> " + movieData.Actors;

  let movieRating = document.querySelector("#rating");
  movieRating.innerHTML = "<strong>Rated:</strong> " + movieData.Rated;

  let movieGross = document.querySelector("#box-office");
  movieGross.innerHTML = "<strong>Box Office:</strong> " + movieData.BoxOffice;

}; 