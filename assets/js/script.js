

// -----
var imdburl = "https://imdb-api.com/en/API/Top250Movies/k_ms032o15";
var randomNumber = 0;
var randomMovieDiv = document.querySelector("#random-movie");
var randomBtn = document.querySelector("#random-btn");
var poster = document.querySelector("#random-movie-poster");
var saveImdb = document.querySelector(".imdbSave");
var saveList = document.querySelector("#saveList");
var movieTitle = ""
getRandomNumber();

// funtion to grab a random number
function getRandomNumber() {
  randomNumber = Math.floor(Math.random() * 249);
  }

//function to fetch imdb api
function getRandomMovie(){
  fetch(imdburl)
    .then(function (response){
      return response.json();
    })
    .then(function (data){
      getRandomNumber();
      movieTitle = data.items[randomNumber].title
      randomMovieDiv.innerHTML = "Movie Name: " + data.items[randomNumber].title + "<br /> Ranking: " + data.items[randomNumber].rank + "<br /> IMDB Rating: " + data.items[randomNumber].imDbRating
      poster.setAttribute("src", data.items[randomNumber].image)
    });
};

// function to save whatever movie is being displayed
function saveRandomMovie(){
  console.log(movieTitle)
  var movieTitleList = JSON.parse(localStorage.getItem("movielist"));
  if (movieTitleList == null){
    movieTitleList = []
  }
  movieTitleList.push(movieTitle);
  localStorage.setItem("movielist", JSON.stringify(movieTitleList));
  saveList.innerHTML = "Movies Save to Watch Later: " + "<br /><b>Title:</b> " + movieTitle;
}



// Event listeners for the two buttons to get random movie
randomBtn.addEventListener("click", getRandomMovie);

// Add event listener for saving movie
saveImdb.addEventListener("click", saveRandomMovie)

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