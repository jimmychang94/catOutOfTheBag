//global variables
var playerArray = [];
var cardArray = [];
var playerForm = document.getElementById('playerForm');

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
  playerIdArray.push(event.target.player1.id);
  playerIdArray.push(event.target.player2.id);
  playerIdArray.push(event.target.player3.id);
  playerIdArray.push(event.target.player4.id);
  for (var i = 0; i < 4; i ++) {
    console.log(playerIdArray[i]);
    new Player(nameArray[i], playerIdArray[i]);
  }

}
//adding event listener
playerForm.addEventListener('submit', playerEvent);