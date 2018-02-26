//global variables
var playerArray = [];
var cardArray = [];
var playerForm = document.getElementById('playerForm');

//creating card objects using Card constructor
new Card('card1', 'Who is most likely to stub toe?');
new Card('card2', 'Who is most likely to sleep with a teddy bear?');
//constructors
function Player (name, id) {
  this.name = name;
  this.id = id;
  this.vote = 0;
  this.cardWon = [];
  playerArray.push(this);
}

function Card (name, content) {
  this.name = name;
  this.content = content;

  cardArray.push(this);
}

//eventhandler
function playerEvent(event) {

  event.preventDefault();
  if (localStorage.playerArray > 0) {
    var playerArrayRetrieve = localStorage.getItem('playerArray');
    playerArray = JSON.parse(playerArrayRetrieve);
  } else {
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
      new Player(nameArray[i], playerIdArray[i]);
    }
  }
  var playerArrayStrigify = JSON.stringify(playerArray);
  localStorage.setItem('playerArray', playerArrayStrigify);
}
//adding event listener
playerForm.addEventListener('submit', playerEvent);