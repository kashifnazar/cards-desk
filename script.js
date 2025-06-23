let deck_id

const shuffle = async () => {
  const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  const data = await response.json();
  deck_id = data.deck_id;
}

const drawCard = async () => {
  if (!deck_id) {
    alert('Please shuffle the deck first!');
    return;
  }
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
  const data = await response.json();
  if (data.cards.length === 0) {
    alert('No more cards in the deck!');
    return;
  }
  const card = data.cards[0];
  const cardElement = document.createElement('div');

  //random number between -45 and 45 for rotation
  const randomRotation = Math.floor(Math.random() * 91) - 45;

  cardElement.style = `transform: rotate(${randomRotation}deg)`;
  cardElement.className = 'card';
  cardElement.innerHTML = `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;
  document.getElementById('card-container').appendChild(cardElement);
}

// Shuffle the deck when the page loads
window.addEventListener('DOMContentLoaded', () => {
  shuffle()
});

// Add event listener to the shuffle button
document.getElementById('draw-button').addEventListener('click', drawCard);

// Start over
document.getElementById('start-over-button').addEventListener('click', () => {
  document.getElementById('card-container').innerHTML = '';
  deck_id = null;
  shuffle();
});