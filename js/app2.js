//global variables
var playerArray = [];
var cardArray = [];
var playerForm = document.getElementById('playerForm');

//creating card objects using Card constructor
new Card('card1', 'Who is most likely to stub toe?');
new Card('card2', 'Who is most likely to sleep with a teddy bear?');
//constructors


function Card (name, content) {
  this.name = name;
  this.content = content;

  cardArray.push(this);
}