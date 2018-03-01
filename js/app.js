'use strict';

//global variables
var playerArray = [];
var imageArray = [];
var randomImage = [];
var playerIcon = [];
var playerForm = document.getElementById('playerForm');

//constructors
function Player (name, id) {
  this.name = name;
  this.id = id;
  this.vote = 0;
  this.cardWon = [];
  this.win = 0;
  this.filepath = '';
  playerArray.push(this);
}

function ImageGenerator (id, filepath) {
  this.id = id;
  this.filepath = filepath;
  imageArray.push(this);
}

function generateRandom () {
  return Math.floor(Math.random() * imageArray.length);
}

function render() {
  while(randomImage.length < 4) {
    var randomNum = generateRandom();
    while(!randomImage.includes(randomNum)) {
      randomImage.push(randomNum);
    }
  }
  for (var i = 0; i < 4; i ++) {
    var rand = randomImage.shift();
    var imgEl = document.getElementById('img' + i);
    playerIcon.push(imageArray[rand].filepath);
    // imgEl.src = imageArray[rand].filepath;
    imgEl.src = selfiePic;
  }
}

// Selfie

var selfiePic = '';
(function() {
  var selfieCam, takeSelfie, imageProcessor, selfies, takeSelfieButton;
  function startup(){
    selfieCam = document.getElementById('selfie-cam');
    takeSelfieButton = document.getElementById('takeSelfieButton'),
    imageProcessor = document.getElementById('image-processor');
    selfies = document.getElementById('selfies');

    imageProcessor.width = 640;
    imageProcessor.height = 480;

    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        video:true,
        audio:false
      }, function (stream) {
        window.URL = window.URL || webkitURL;
        var streamURL = window.URL.createObjectURL(stream);
        selfieCam.src = streamURL;
        selfieCam.play();
      }, function (error) {
        console.log(error);
      });
    }

    takeSelfieButton.addEventListener('click', takeSelfie);
  }
  function takeSelfie() {
    var context = imageProcessor.getContext('2d');
    console.log(selfieCam);
    context.drawImage(selfieCam, 0, 0, 640, 480);
    var imageURL = imageProcessor.toDataURL();

    var img = document.createElement('img');
    img.setAttribute('src', imageURL);
		console.log();
		selfiePic = imageURL;
    selfies.appendChild(img);
    var img1 = document.getElementById('img1');
    img1.src = imageURL;
  }
  window.addEventListener('load', startup);
})();




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
    playerArray[i].filepath = playerIcon[i];
    playerArray[i].filepath = selfiePic;
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

createImageObjects();
render();

//adding event listener
playerForm.addEventListener('submit', playerEvent);