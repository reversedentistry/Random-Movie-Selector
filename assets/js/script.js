var imdburl = "https://imdb-api.com/en/API/Top250Movies/k_ms032o15";
var randomNumber = 0;
var randomMovieDiv = document.querySelector("#random-movie");
var randomBtn = document.querySelector("#random-btn");


function getRandomMovie(){
  fetch(imdburl)
    .then(function (response){
      return response.json();
    })
    .then(function (data){
      getRandomNumber();
      randomMovieDiv.innerHTML = data.items[randomNumber].title
    });


  function getRandomNumber() {
    randomNumber = Math.floor(Math.random() * 249);
    }
};
  

console.log(randomNumber)

randomBtn.addEventListener("click", getRandomMovie);
