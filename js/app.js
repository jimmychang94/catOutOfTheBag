'use strict';

//global variables
var playerArray = [];
var imageArray = [];
var randomImage = [];
var playerIcon = [];
var playerForm = document.getElementById('playerForm');
var selfiePicArray =[];
var selfieLogo = '';

//constructors
function Player (name, id) {
  this.name = name;
  this.id = id;
  this.vote = 0;
  this.cardWon = [];
  this.win = 0;
  this.filepath = '';
  this.selfieLogo = '';
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
    
    // imgEl.src = imageArray[rand].filepath;
    imgEl.src = selfiePic;
  }
}
function renderSelfie() {
  var imgEl = document.getElementById('img0');
  playerIcon.push(imageArray[0].filepath);
}

// Selfie

var selfiePic = [];
(function() {
  var selfieCam, takeSelfie, imageProcessor, selfies, takeSelfieButton;
  function startup(){
    selfieCam = document.getElementById('selfie-cam');
    takeSelfieButton = document.getElementById('takeSelfieButton'),
    imageProcessor = document.getElementById('image-processor');
    selfies = document.getElementById('selfies');

    imageProcessor.width = 320;
    imageProcessor.height = 240;

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
    context.drawImage(selfieCam, 0, 0, 320, 240);
    var imageURL = imageProcessor.toDataURL();

    var img = document.createElement('img');
    img.setAttribute('src', imageURL);
		console.log();
		selfiePic = imageURL;
    selfies.appendChild(img);
    var img0 = document.getElementById('img0');
    img0.src = imageURL;
    
    selfiePicArray.push(imageURL)
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
    new Player(nameArray[i], playerIdArray[i], selfiePicArray[i]);
    playerArray[i].filepath = playerIcon[i];
    playerArray[i].selfieLogo = selfiePicArray[i];
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