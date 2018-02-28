'use strict';

//global variables
var playerArray = [];
var cardArray = [];
var randomCard = [];
var playerNum = 0;
var playerList = document.getElementById('playerList');
var playerHeader = document.getElementById('playerHeader');
var cardContainer = document.getElementById('cardContainer');
var newGame = document.getElementById('newGame');
var endGame = 0;

//creating card objects using Card constructor
new Card('card1', 'Who is most likely to stub a toe?');
new Card('card2', 'Who is most likely to sleep with a teddy bear?');
new Card('card3', 'Who is most likely to live a secrect life?');
new Card('card4', 'Who is the best dancer?');
new Card('card5', 'Most likely to be famous?');
new Card('card6', 'Looks most like a celebirty?');
new Card('card7', 'Who likes to talk the most?');
new Card('card8', 'Who was populair in elementary?');
new Card('card8', 'Eats peanut butter, pickles, and mayo sandwiches?');
new Card('card9', 'Who likes Justin Biebers music?');
new Card('card10', 'Who is most like Ozzy Osborne?');
new Card('card11', 'Who acts most like a daredevil?');
new Card('card12', 'Most likely to get a tattoo?');
new Card('card13', 'Who steals candy from babies?');
new Card('card14', 'Most addictied to their phone?');
new Card('card15', 'Who has expensive tastes in clothes?');
new Card('card16', 'Uses FaceBook the most?');
new Card('card17', 'Person that hates their job the most?');
new Card('card18', 'Who watches Keeping Up With The Kardashians?');
new Card('card19', 'Most prepared for zombie apocalypse?');
new Card('card20', 'Who is the funniest?');
new Card('card21', 'Who has all their money in BitCoin?');

//constructor for the cards

function Card (name, content) {
  this.name = name;
  this.content = content;

  cardArray.push(this);
}

// gets players names from local storage and parse them

function getPlayerNamesFromLocalStorage() {
  var playerArrayRetrieved = localStorage.getItem('playerArray');
  playerArray = JSON.parse(playerArrayRetrieved);
}

getPlayerNamesFromLocalStorage();

// adding players names to the form and switches username after every vote

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
  while(randomCard.length < cardArray.length) {
    var randomNum = generateRandom();
    while(!randomCard.includes(randomNum)) {
      randomCard.push(randomNum);
    }
  }

  var rand = randomCard.shift();
  pEl.textContent = cardArray[rand].content;
  cardContainer.appendChild(pEl);
}

// random number generator

function generateRandom () {
  return Math.floor(Math.random() * cardArray.length);
}
render();

// clears votes

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
  //game over
  for (i = 0; i < playerArray.length; i++) {
    if (playerArray[i].win > endGame) {
      playerList.removeEventListener('submit', votingEvent);
      playerList.style.display = 'none';
      cardContainer.style.display = 'none';
      console.log('game over');
      drawBarGraph();
      newGame.style.display = 'block';
      return;
    }
  }
}

// finds the number of wins and pushes them into the winArray[]

function numberOfWins() {
  var winArray = [];
  for (var i = 0; i < playerArray.length; i++) {
    winArray.push(playerArray[i].win);
  }
  return winArray;
}

// takes players names and pushes them into the nameArray[]

function playerNames() {
  var nameArray = [];
  for (var i = 0; i < playerArray.length; i ++) {
    nameArray.push(playerArray[i].name);
  }
  return nameArray;
}

// This checks to see if everyone has voted and then gives the next array

function nextCard () {
  if (playerNum === playerArray.length) {
    winner();
    clearVotes();
    playerNum = 0;

    // For the new card
    pEl.textContent = '';
    render();
    playerHeader.textContent = playerArray[playerWin].name + ' won the last round! ' + playerArray[playerNum].name + ' please vote!';
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

  if(!votingArray.includes(true)) {
    alert('Please vote on someone!');
    return;
  }

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
            max: 5,
            min: 0,
            stepSize: 1.0
          }
        }]
      }
    }
  });
}
