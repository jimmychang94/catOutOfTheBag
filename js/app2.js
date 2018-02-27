'use strict';

//global variables
var playerArray = [];
var cardArray = [];
var randomCard = [];
var playerNum = 0;
var playerList = document.getElementById('playerList');
var playerHeader = document.getElementById('playerHeader');

//creating card objects using Card constructor
new Card('card1', 'Who is most likely to stub toe?');
new Card('card2', 'Who is most likely to sleep with a teddy bear?');

//constructors

function Card (name, content) {
  this.name = name;
  this.content = content;

  cardArray.push(this);
}

function getPlayerNamesFromLocalStorage() {
  var playerArrayRetrieved = localStorage.getItem('playerArray');
  playerArray = JSON.parse(playerArrayRetrieved);
}

getPlayerNamesFromLocalStorage();

// adding players names to the voting list

function votingListForPlayers() {
  playerHeader.textContent = playerArray[playerNum].name + ', please vote!';
  var labels = document.getElementsByClassName('player');
  for (var i = 0; i < playerArray.length; i++) {
    labels[i].textContent = playerArray[i].name;
  }
}
votingListForPlayers();

var pEl = document.createElement('p');
function render() {
  while(randomCard.length < 2) {
    var randomNum = generateRandom();
    while(!randomCard.includes(randomNum)) {
      randomCard.push(randomNum);
    }
  }

  var rand = randomCard.shift();
  var cardContainer = document.getElementById('cardContainer');
  pEl.textContent = cardArray[rand].content;
  cardContainer.appendChild(pEl);
}

// random number generator
function generateRandom () {
  return Math.floor(Math.random() * cardArray.length);
}
render();

function votingEvent (event) {

  event.preventDefault();
  
  playerNum += 1;
  if (playerNum === playerArray.length) {
    playerNum = 0;
    playerList.removeEventListener('submit', votingEvent);
    playerList.style.display = 'none';
    // generateChart();
    // Results!!!!
  }

  if(false) {
    // For the new card
    pEl.textContent = '';
    render();
    playerList.style.display = 'block';
    playerList.addEventListener('submit', votingEvent);
  }

  var votingArray = [];
  votingArray.push(event.target.player1.checked);
  votingArray.push(event.target.player2.checked);
  votingArray.push(event.target.player3.checked);
  votingArray.push(event.target.player4.checked);


  for(var i = 0; i < playerArray.length; i ++) {
    if (votingArray[i]) {
      playerArray[i].vote += 1;
      playerHeader.textContent = playerArray[playerNum].name + ', please vote!';
      event.target.reset();
      return;
    }
  }

  event.target.reset();
}

playerList.addEventListener('submit', votingEvent);