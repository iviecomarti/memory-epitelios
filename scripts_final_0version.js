const cards = document.querySelectorAll('.memory-card');
const intentosElement = document.getElementById('intentos');

let intentos = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
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

  intentos++;
  intentosElement.textContent = intentos; // Actualiza el contador de intentos

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}



(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

function resetGame() {
    cards.forEach(card => {
      card.classList.remove('flip');
      card.addEventListener('click', flipCard);
    });
  
    // Array para almacenar el orden aleatorio
    const randomOrder = Array.from({ length: cards.length }, (_, index) => index);
  
    // Barajar el orden aleatorio
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomOrder[i], randomOrder[j]] = [randomOrder[j], randomOrder[i]];
    }
  
    // Asignar el nuevo orden aleatorio a las cartas
    cards.forEach((card, index) => {
      card.style.order = randomOrder[index];
    });
  
    intentos = 0;
    intentosElement.textContent = intentos; // Reinicia el contador de intentos
    lockBoard = false;
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
  }
  
reiniciar.addEventListener('click', resetGame);



cards.forEach(card => card.addEventListener('click', flipCard));
