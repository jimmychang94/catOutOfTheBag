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
new Card('card3', 'Who is most likely to live a secrect life?');
new Card('card4', 'Who is the best dancer?');
new Card('card5', 'Most likely to be famous?');
new Card('card6', 'Looks most like a celebirty?');
new Card('card7', 'Who likes to talk the most?');

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
function winner () {
  var voteArray = [];
  for (var i = 0; i < playerArray.length; i ++) {
    voteArray.push(playerArray[i].vote);
  }
  var largestNum = Math.max(...voteArray);
  var playerWin = voteArray.indexOf(largestNum);
  playerArray[playerWin].win += 1;
}

// finds the number of wins

function numberOfWins() {
  var winArray = [];
  for (var i = 0; i < playerArray.length; i++) {
    winArray.push(playerArray[i].win);
  }
  return winArray;
}

function playerNames() {
  var nameArray = [];
  for (var i = 0; i < playerArray.length; i ++) {
    nameArray.push(playerArray[i].name);
  }
  return nameArray;
}

function nextCard () {
  playerNum += 1;
  if (playerNum === playerArray.length) {
    winner();
    clearVotes();
    playerNum = 0;
    playerList.removeEventListener('submit', votingEvent);
    playerList.style.display = 'none';
    // Results!!!!
    drawBarGraph();
  }

  if(false) {
    // For the new card
    pEl.textContent = '';
    render();
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
      playerArray[i].vote += 1;
      nextCard();
      playerHeader.textContent = playerArray[playerNum].name + ', please vote!';
      event.target.reset();
      return;
    }
  }

  event.target.reset();
}

playerList.addEventListener('submit', votingEvent);

// Making the graph

function drawBarGraph() {
  var winArray = numberOfWins();
  var nameArray = playerNames();
  var data = {
    labels: nameArray,
    datasets: [{
      label: 'Bar Graph Of Votes',
      data: winArray,
      backgroundColor: [
        'bisque',
        'darkgray',
        'burlywood',
        'lightblue',
      ],
    }]
  };
  var ctx = document.getElementById('playerWinsChart');
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
      },
      scales: {
        yAxes: [{
          ticks: {
            max: 10,
            min: 0,
            stepSize: 1.0
          }
        }]
      }
    }
  });
}
