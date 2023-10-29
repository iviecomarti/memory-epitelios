const isGameLocked = false;
const memoryCards = document.querySelectorAll('.memory-card');
const attemptsElement = document.getElementById('intentos');

let attempts = 0;
let hasFlippedCard = false;

function flipCard() {
  if (isGameLocked) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  attempts++;
  attemptsElement.textContent = attempts; // Update the attempts counter

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetGameState();
}

function unflipCards() {
  isGameLocked = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetGameState();
  }, 1000);
}

function resetGameState() {
  hasFlippedCard = false;
  isGameLocked = false;
  firstCard = null;
  secondCard = null;
}

// Shuffle the cards
(function shuffle() {
  // This is the change
  shuffle();
  memoryCards.forEach(card => {
    let randomPos = Math.floor(Math.random() * memoryCards.length);
    card.style.order = randomPos;
  });
})();

// Reset the game
function resetGame() {
  memoryCards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  // Array to store the random order
  const randomOrder = Array.from({ length: memoryCards.length }, (_, index) => index);

  // Shuffle the random order
  for (let i = memoryCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomOrder[i], randomOrder[j]] = [randomOrder[j], randomOrder[i]];
  }

  // Assign the new random order to the cards
  memoryCards.forEach((card, index) => {
    card.style.order = randomOrder[index];
  });

  attempts = 0;
  attemptsElement.textContent = attempts; // Reset the attempts counter
}

// Add event listener to the reset button
reiniciar.addEventListener('click', resetGame);

// Add event listeners to the memory cards
memoryCards.forEach(card => card.addEventListener('click', flipCard));
