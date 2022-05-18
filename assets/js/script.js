

// -----
var imdburl = "https://imdb-api.com/en/API/Top250Movies/k_ms032o15";
var randomNumber = 0;
var randomMovieDiv = document.querySelector("#random-movie");
var randomBtn = document.querySelector("#random-btn");
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
  let movieTitle = document.createElement("h3");
  movieTitle.textContent = movieData.Title; 
  console.log(movieTitle); 
  movDetailsEl.append(movieTitle); 
  
  let moviePoster = document.createElement("img"); 
  moviePoster.src = movieData.Poster;
  console.log(movieData.Poster); 
  moviePosterEl.append(moviePoster); 
  
  let movieDirector = document.createElement("p"); 
  movieDirector.textContent = "Directed by: " + movieData.Director; 
  movDetailsEl.append(movieDirector); 
  
  let movieRelease = document.createElement("p"); 
  movieRelease.textContent = "Released: " + movieData.Released; 
  movDetailsEl.append(movieRelease); 

  let moviePlot = document.createElement("p"); 
  moviePlot.textContent = "Plot: " + '"' + movieData.Plot + '"'; 
  movDetailsEl.append(moviePlot); 

  let movieCast = document.createElement("p"); 
  movieCast.textContent = "Cast: " + movieData.Actors; 
  movDetailsEl.append(movieCast); 

  let movieRating = document.createElement("p"); 
  movieRating.textContent = "Rated: " + movieData.Rated; 
  movDetailsEl.append(movieRating); 

  let movieGross = document.createElement("p"); 
  movieGross.textContent = "Box Office: " + movieData.BoxOffice; 
  movDetailsEl.append(movieRating); 
  
}