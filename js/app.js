'use strict';

//global variables
var playerArray = [];
var imageArray = [];
var randomImage = [];
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

function ImageGenerator (id, src) {
  this.id = id;
  this.src = src;
  imageArray.push(this);
}

function generateRandom () {
  Math.floor(Math.random() * imageArray.length);
}

function render() {
  while(randomImage.length < 4) {
    var randomNum = generateRandom();
    while(!randomImage.includes(randomNum)) {
      randomImage.push(randomNum);
    }
  }

  var rand = randomImage.shift();
  var imgEl = document.getElementById(imageArray[rand].id)
  pEl.textContent = imageArray[rand].content;
  cardContainer.appendChild(pEl);
  cardContainer.style.transition = '1s';
  cardContainer.style.transform = 'rotateY(360deg)';
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

  // for(var i = 0; i < nameArray.length; i ++) {
  //   if (nameArray[i] === '') {
  //     nameArray.splice(i, 1);
  //     playerIdArray.splice(i, 1);
  //   }
  // }

  if (nameArray.includes('')) {
    alert('Please include all player names!');
    return;
  }

  for (var i = 0; i < nameArray.length; i ++) {
    new Player(nameArray[i], playerIdArray[i]);
  }

  var playerArrayStrigify = JSON.stringify(playerArray);
  localStorage.setItem('playerArray', playerArrayStrigify);
  window.location.href = 'game.html';
}

function createImageObjects () {
  for (var i = 1; i < 10; i ++) {
    new ImageGenerator ('icon' + i, 'img/icon' + i + '.png');
  }
}

//adding event listener
playerForm.addEventListener('submit', playerEvent);