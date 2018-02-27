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

function clearVotes () {
  for (var i = 0; i < playerArray.length; i ++) {
    playerArray[i].vote = 0;
  }
}

// Finds who has the most votes
var playerWin = null;
function winner () {
  var voteArray = [];
  for (var i = 0; i < playerArray.length; i ++) {
    voteArray.push(playerArray[i].vote);
  }
  var largestNum = Math.max(...voteArray);
  playerWin = voteArray.indexOf(largestNum);
  playerArray[playerWin].win += 1;
}

// This checks to see if everyone has voted and then gives the next array
function nextCard () {
  if (playerNum === playerArray.length) {
    winner();
    clearVotes();
    playerNum = 0;
    playerList.removeEventListener('submit', votingEvent);
    playerList.style.display = 'none';
    // For the new card
    pEl.textContent = '';
    render();
    playerHeader.textContent = playerArray[playerWin].name + ' won the last round! ' + playerArray[playerNum].name + ' please vote!';
    playerList.style.display = 'block';
    playerList.addEventListener('submit', votingEvent);
  }

}

// submit event
function votingEvent (event) {

  event.preventDefault();

  var votingArray = [];
  votingArray.push(event.target.player1.checked);
  votingArray.push(event.target.player2.checked);
  votingArray.push(event.target.player3.checked);
  votingArray.push(event.target.player4.checked);


  for(var i = 0; i < playerArray.length; i ++) {
    if (votingArray[i]) {
      playerNum += 1;
      playerArray[i].vote += 1;
      if (playerNum < playerArray.length) {
        playerHeader.textContent = playerArray[playerNum].name + ', please vote!';
      } else {
        nextCard();
      }
      event.target.reset();
      return;
    }
  }

  event.target.reset();
}

playerList.addEventListener('submit', votingEvent);