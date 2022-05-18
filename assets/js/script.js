

// -----
var imdburl = "https://imdb-api.com/en/API/Top250Movies/k_ms032o15";
var randomNumber = 0;
var randomMovieDiv = document.querySelector("#random-movie");
var randomBtn = document.querySelector("#random-btn");
var poster = document.querySelector("#random-movie-poster");
var saveImdb = document.querySelector(".imdbSave");
var saveList = document.querySelector("#saveList");
var clearSaveImdb = document.querySelector(".imdbClearSave")
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
      console.log(data)
      movieTitle = data.items[randomNumber].title
      randomMovieDiv.innerHTML = "Movie Name: " + data.items[randomNumber].title + "<br /> Ranking: " + data.items[randomNumber].rank + "<br /> IMDB Rating: " + data.items[randomNumber].imDbRating
      poster.setAttribute("src", data.items[randomNumber].image)
    });
};

// function to save whatever movie is being displayed
function saveRandomMovie(){
  console.log(movieTitle)
  var movieTitleList = localStorage.getItem("movielist")
  if (movieTitleList.length > 0){
    var movieTitleListFull = JSON.parse(localStorage.getItem("movielist"));
    movieTitleListFull.push(movieTitle);
    localStorage.setItem("movielist", JSON.stringify(movieTitleListFull));
    renderSavedMovies();
  }
  
}


// function to load local storage array of saved movies and also update the html page to display stored movies
function renderSavedMovies(){
localStorage.setItem("movielist", [])
  var renderList = localStorage.getItem("movielist")
  console.log(renderList)
  if (renderList.length > 0){
    var fullRenderList = JSON.parse(localStorage.getItem("movielist"))
    var text = ""
    var iterator = 1
    for (let x of fullRenderList){
      text += "<b>Title " + iterator + ": </b>" + x + "<br>";
      iterator++
    }
  
  } else {
    text = ""
  }
  saveList.innerHTML = text;

}

renderSavedMovies();

function clearSavedMovies(){
  localStorage.setItem("movielist", "")
  renderSavedMovies();
}

// Event listeners for the two buttons to get random movie
randomBtn.addEventListener("click", getRandomMovie);

// Add event listener for saving movie
saveImdb.addEventListener("click", saveRandomMovie)

// event listener to clear saved movies
clearSaveImdb.addEventListener("click", clearSavedMovies)

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