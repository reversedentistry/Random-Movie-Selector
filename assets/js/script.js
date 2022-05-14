var imdburl = "https://imdb-api.com/en/API/Top250Movies/k_ms032o15";
var randomNumber = 0;
var randomMovieDiv = document.querySelector("#random-movie");
var randomBtn = document.querySelector("#random-btn");
var randomBtnPokemon = document.querySelector("#random-btn-pokemon");
var poster = document.querySelector("#random-movie-poster")
var pokemonNameGuess = document.querySelector("#pokemonNameGuess");
var pokemonNameAnswer = ""
var pokemonAnswerSubmit = document.querySelector("#pokemonSubmit");



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
      pokemonNameAnswer = data.species.name
      console.log(pokemonNameAnswer)
    })
  }

// function to see if they guessed the pokemon correctly
function guessCheck(event){
  event.preventDefault()
  var realGuess = pokemonNameGuess.value()
  console.log(realGuess)

  // if (realGuess == data.species.name) {
  //   alert("nice!")
  // } else {
  //   alert("no.")
  // }
}

// funtion to grab a random number
function getRandomNumber() {
  randomNumber = Math.floor(Math.random() * 249);
  }

// Event listeners for the two buttons to get random movie or random pokemon
randomBtn.addEventListener("click", getRandomMovie);
randomBtnPokemon.addEventListener("click", getRandomPokemon)

pokemonAnswerSubmit.addEventListener("click", guessCheck)














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