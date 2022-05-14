var imdburl = "https://imdb-api.com/en/API/Top250Movies/k_ms032o15";
var randomNumber = 0;


fetch(imdburl)
  .then(function (response){
    return response.json();
  })
  .then(function (data){
    getRandomNumber();
    console.log(data.items[randomNumber].title);
  });


function getRandomNumber() {
  randomNumber = Math.floor(Math.random() * 249);
  }
  
getRandomNumber();
console.log(randomNumber)
