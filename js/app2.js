'use strict';

//global variables
var playerArray = [];
var cardArray = [];
var playerForm = document.getElementById('playerForm');
var playerList = document.getElementById('playerList');

//creating card objects using Card constructor
new Card('card1', 'Who is most likely to stub toe?');
new Card('card2', 'Who is most likely to sleep with a teddy bear?');
//constructors


function Card (name, content) {
  this.name = name;
  this.content = content;

  cardArray.push(this);
}

var render = function(){
    var cardContainer = document.getElementById('cardContainer');
    var pEl = document.createElement('p');
    pEl.textContent = cardArray['randwhendone'].content;  //need insert rng function
    cardContainer.appendChild(pEl);
// random number generator
function generateRandom () {
  Math.floor(Math.random() * cardArray.length);
}

// adding players names to the voting list

// function votingListForPlayers() {
//   var ulEl = document.createElement('ul');
//   var liEl = document.createElement('li');
//   for (var i = 0; i < playerArray.length; i++) {
//     console.log(playerArray[i]);
//     liEl.textContent = playerArray[i].name;
//     ulEl.appendChild(liEl);
//   }
//   playerList.appendChild(ulEl);
// }
// votingListForPlayers();
