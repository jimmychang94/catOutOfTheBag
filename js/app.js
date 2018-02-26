//global variables
var playerArray = [];
var cardArray = [];
var playerForm = document.getElementById('playerForm');
var playerList = document.getElementById('playerList');
//constructors
function Player (name, id) {
  this.name = name;
  this.id = id;
  this.vote = 0;
  this.cardWon = [];
  playerArray.push(this);
}

function Card (name, id, content) {
  this.name = name;
  this.id = id;
  this.content = content;

  cardArray.push(this);
}

//eventhandler
function playerEvent(event) {

  event.preventDefault();

  var nameArray = [];
  var playerIdArray = [];
  nameArray.push(event.target.player1.value);
  nameArray.push(event.target.player2.value);
  nameArray.push(event.target.player3.value);
  nameArray.push(event.target.player4.value);
  playerIdArray.push(event.target.player1.name);
  playerIdArray.push(event.target.player2.name);
  playerIdArray.push(event.target.player3.name);
  playerIdArray.push(event.target.player4.name);
  for (var i = 0; i < 4; i ++) {
    console.log(playerIdArray[i]);
    new Player(nameArray[i], playerIdArray[i]);
  }

}
//adding event listener
// playerForm.addEventListener('submit', playerEvent);

// adding players names to the voting list

function votingListForPlayers() {
  var ulEl = document.createElement('ul');
  var liEl = document.createElement('li');
  for (var i = 0; i < playerArray.length; i++) {
    console.log(playerArray[i]);
    liEl.textContent = playerArray[i].name;
    ulEl.appendChild(liEl);
  }
  playerList.appendChild(ulEl);
}
votingListForPlayers();