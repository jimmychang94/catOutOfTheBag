var cardArray = [];
var listContent = document.getElementById('cardList');

//constructor for the cards
function Card (name, content) {
  this.name = name;
  this.content = content;
  cardArray.push(this);
}

//creating card objects using Card constructor
new Card('card1', 'Who is most likely to stub a toe?');
new Card('card2', 'Who is most likely to sleep with a teddy bear?');
new Card('card3', 'Who is most likely to live a secrect life?');
new Card('card4', 'Who is the best dancer?');
new Card('card5', 'Most likely to be famous?');
new Card('card6', 'Looks most like a celebirty?');
new Card('card7', 'Who likes to talk the most?');
new Card('card8', 'Who was popular in elementary?');
new Card('card8', 'Eats peanut butter, pickles, and mayo sandwiches?');
new Card('card9', 'Who likes Justin Biebers music?');
new Card('card10', 'Who is most like Ozzy Osborne?');
new Card('card11', 'Who acts most like a daredevil?');
new Card('card12', 'Most likely to get a tattoo?');
new Card('card13', 'Who steals candy from babies?');
new Card('card14', 'Most addicted to their phone?');
new Card('card15', 'Who has expensive tastes in clothes?');
new Card('card16', 'Uses FaceBook the most?');
new Card('card17', 'Person that hates their job the most?');
new Card('card18', 'Who watches Keeping Up With The Kardashians?');
new Card('card19', 'Most prepared for zombie apocalypse?');
new Card('card20', 'Who is the funniest?');
new Card('card21', 'Who has all their money in BitCoin?');

function listOfAllCards() {
  for(var i = 0; i < cardArray.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = cardArray[i].content;
    listContent.appendChild(liEl);
  }
}

listOfAllCards();
