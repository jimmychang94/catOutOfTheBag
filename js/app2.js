var playerList = document.getElementById('playerList');

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