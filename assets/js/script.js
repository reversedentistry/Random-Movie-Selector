

// -----
var imdburl = "https://imdb-api.com/en/API/Top250Movies/k_ms032o15";
var randomNumber = 0;
var randomMovieDiv = document.querySelector("#random-movie");
var randomBtn = document.querySelector("#random-btn");
var randomBtnPokemon = document.querySelector("#random-btn-pokemon");
var poster = document.querySelector("#random-movie-poster")
getRandomNumber();



// two functions to fetch from the movie and pokemon apis respectively
function getRandomMovie(){
  fetch(imdburl)
    .then(function (response){
      return response.json();
    })
    .then(function (data){
      getRandomNumber();
      randomMovieDiv.innerHTML = "Movie Name: " + data.items[randomNumber].title + "<br /> Ranking: " + data.items[randomNumber].rank + "<br /> IMDB Rating: " + data.items[randomNumber].imDbRating
      poster.setAttribute("src", data.items[randomNumber].image)
    });
};

function getRandomPokemon(){
  getRandomNumber();
  var randomString = randomNumber.toString();
  var pokeurl = "https://pokeapi.co/api/v2/pokemon/" + randomString;
  var pokemonSprite = document.querySelector("#pokemon-sprite")
  fetch(pokeurl)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data);
      pokemonSprite.setAttribute("src", data.sprites.front_default)
    })
  }


// funtion to grab a random number
function getRandomNumber() {
  randomNumber = Math.floor(Math.random() * 249);
  }

// Event listeners for the two buttons to get random movie or random pokemon
randomBtn.addEventListener("click", getRandomMovie);
// randomBtnPokemon.addEventListener("click", getRandomPokemon)

let searchBtn = document.querySelector("#search-btn"); 
let moviePosterEl = document.querySelector("#movie-poster");

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
  let moviePoster = document.createElement("img"); 
  moviePoster.src = movieData.poster;
  moviePosterEl.append(moviePoster); 
  
  let movieTitle = document.createElement("h3");
}