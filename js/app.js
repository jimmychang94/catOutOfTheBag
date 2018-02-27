'use strict';

//global variables
var playerArray = [];
var playerForm = document.getElementById('playerForm');

//constructors
function Player (name, id) {
  this.name = name;
  this.id = id;
  this.vote = 0;
  this.cardWon = [];
  this.win = 0;
  playerArray.push(this);
}

//eventhandler
function playerEvent(event) {

  event.preventDefault();

  if (localStorage.playerArray > 0) {
    localStorage.clear();
  }

  var nameArray = [];
  var playerIdArray = [];
  playerArray = [];
  nameArray.push(event.target.player1.value);
  nameArray.push(event.target.player2.value);
  nameArray.push(event.target.player3.value);
  nameArray.push(event.target.player4.value);
  playerIdArray.push(event.target.player1.name);
  playerIdArray.push(event.target.player2.name);
  playerIdArray.push(event.target.player3.name);
  playerIdArray.push(event.target.player4.name);
  for (var i = 0; i < nameArray.length; i ++) {
    new Player(nameArray[i], playerIdArray[i]);
  }

  var playerArrayStrigify = JSON.stringify(playerArray);
  localStorage.setItem('playerArray', playerArrayStrigify);
}

//adding event listener
playerForm.addEventListener('submit', playerEvent);