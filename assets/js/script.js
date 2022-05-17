var imdburl = "https://imdb-api.com/en/API/Top250Movies/k_ms032o15";
var randomNumber = 0;
var randomMovieDiv = document.querySelector("#random-movie");
var randomBtn = document.querySelector("#random-btn");


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


// POKEMON FUNCTIONS
// -------------------------------------------------------------------------------------------------
var randomNumberPokemon = 0;
var randomBtnPokemon = document.querySelector("#random-btn-pokemon");
var poster = document.querySelector("#random-movie-poster")
var pokemonNameAnswer = ""
var pokemonAnswerSubmit = document.querySelector("#pokemonSubmit");
var score = localStorage.getItem("Score");


// function to grab random pokemon from api on clicking start button.
// also hides the start container and unhides the actual quiz
function getRandomPokemon(){
  getRandomNumberPokemon();
  var randomString = randomNumberPokemon.toString();
  var pokeurl = "https://pokeapi.co/api/v2/pokemon/" + randomString;
  var pokemonSprite = document.querySelector("#pokemon-sprite")
  var pokemonSpriteTwo = document.querySelector("#pokemon-sprite-two")
  var quizStart = document.querySelector(".quizStart")
  var quiz = document.querySelector(".quiz")
  quizStart.classList.add("hidden")
  quiz.classList.remove("hidden")
  var scoreDisplay = document.querySelector(".scoreDisplay");
  scoreDisplay.innerHTML = "SCORE: " + score

  fetch(pokeurl)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data);
      pokemonSprite.setAttribute("src", data.sprites.front_default)
      pokemonSpriteTwo.setAttribute("src", data.sprites.back_default);
      pokemonNameAnswer = data.species.name
      console.log(pokemonNameAnswer)
    })
  }

// function to see if they guessed the pokemon correctly
function guessCheck(event){
  event.preventDefault();
  var pokemonNameGuess = document.querySelector("#pokemonNameGuess").value.toLowerCase();
  console.log(pokemonNameGuess);
  console.log(score)
  var scoreDisplay = document.querySelector(".scoreDisplay");
  var yesPikachu = document.querySelector(".yesPikachu");
  var noPikachu = document.querySelector(".noPikachu");
  
  
  if (pokemonNameGuess == pokemonNameAnswer) {
    score++
    localStorage.setItem("Score", score)
    scoreDisplay.innerHTML = "SCORE: " + score
    yesPikachu.classList.remove("hidden")
    yesPikachu.setAttribute("src", "./assets/Images/PikachuYes1.gif")
  } else {
    score--
    localStorage.setItem("Score", score)
    scoreDisplay.innerHTML = "SCORE: " + score
    noPikachu.classList.remove("hidden")
    noPikachu.setAttribute("src", "./assets/Images/PikachuNo2.gif")
  }
}



pokemonAnswerSubmit.addEventListener("click", guessCheck)
// END OF POKEMON 
// -----------------------------------------------------------------------------------------------------


// funtions to grab a random numbers
function getRandomNumber() {
  randomNumber = Math.floor(Math.random() * 249);
}

function getRandomNumberPokemon() {
  randomNumberPokemon = Math.floor(Math.random() * 500);
}

// Event listeners for the two buttons to get random movie or random pokemon

randomBtnPokemon.addEventListener("click", getRandomPokemon)
// randomBtn.addEventListener("click", getRandomMovie);
















// sheryl
// let searchBtn = document.querySelector("#search-btn"); 

// searchBtn.addEventListener("click", search)


// function search() {
//     let movieSearch = document.querySelector("#title-search").value;    
//     fetch('http://www.omdbapi.com/?apikey=3649a4e3&t=' + movieSearch)
//         .then(function (response) {
//           return response.json();
//         })
//         .then(function (data) {
//             console.log(data); 
//         })
//         .catch(err => console.error(err));
// }