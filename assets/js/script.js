

// -----
var imdburl = "https://imdb-api.com/en/API/Top250Movies/k_3hg8o4xp";
// https://imdb-api.com/en/API/Top250Movies/k_3hg8o4xp shadowww
// https://imdb-api.com/en/API/Top250Movies/k_ms032o15
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
function getRandomMovie() {
  fetch(imdburl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getRandomNumber();
      console.log(data)
      movieTitle = data.items[randomNumber].title
      randomMovieDiv.innerHTML = "Movie Name: " + data.items[randomNumber].title + "<br /> Ranking: " + data.items[randomNumber].rank + "<br /> IMDB Rating: " + data.items[randomNumber].imDbRating
      poster.setAttribute("src", data.items[randomNumber].image)
    });
};

// function to save whatever movie is being displayed
function saveRandomMovie() {
  console.log(movieTitle)
  var movieTitleList = localStorage.getItem("movielist")
  if (movieTitleList.length > 0) {
    var movieTitleListFull = JSON.parse(localStorage.getItem("movielist"));
    movieTitleListFull.push(movieTitle);
    localStorage.setItem("movielist", JSON.stringify(movieTitleListFull));
    renderSavedMovies();
  } else {
    var newMovieList = []
    newMovieList.push(movieTitle);
    localStorage.setItem("movielist", JSON.stringify(newMovieList));
    renderSavedMovies()
  }

}


// function to load local storage array of saved movies and also update the html page to display stored movies
function renderSavedMovies() {
  var renderList = localStorage.getItem("movielist")
  console.log(renderList)
  if (renderList == null) {
    localStorage.setItem("movielist", [])
  } else if (renderList.length > 0) {
    var fullRenderList = JSON.parse(localStorage.getItem("movielist"))
    var text = ""
    var iterator = 1
    for (let x of fullRenderList) {
      text += "<b>Title " + iterator + ": </b>" + x + "<br>";
      iterator++
    }
  } else {
    text = ""
  }
  saveList.innerHTML = text;

}

renderSavedMovies();

function clearSavedMovies() {
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
      if (data.Response === "False") {
        console.log(data.Response);
        let modalEl = document.querySelector("#bad-search");
        modalEl.classList.remove("aria-hidden");
        modalEl.classList.add("show");
        modalEl.style.display = "block";

        document.querySelectorAll('[data-dismiss]').forEach(item => {
          item.addEventListener("click", close);

        });
        function close() {
          modalEl.style.display = "none";
          modalEl.classList.remove("show");
          modalEl.classList.add("aria-hidden");
        }

      } else {
        displayMovie(data);
      }
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