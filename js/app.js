var playerArray = [];
var playerForm = document.getElementById('playerForm');

function Player (name, id) {
  this.name = name;
  this.id = id;
  this.vote = 0;
  playerArray.push(this);
}

function playerEvent(event) {
  var nameArray = [];
  var idArray = [];
  nameArray.push(event.target.player1.value);
  nameArray.push(event.target.player2.value);
  nameArray.push(event.target.player3.value);
  nameArray.push(event.target.player4.value);
  idArray.push(event.target.player1.id);
  for (var i = 0; i < 4; i ++) {
    Player(nameArray[i], idArray[i]);
  }
}

playerForm.addEventListener('submit', playerEvent);