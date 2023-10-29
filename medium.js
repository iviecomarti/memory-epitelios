document.addEventListener('DOMContentLoaded', function () {
    const memoryGameContainer = document.querySelector('.memory-game');
    
    
    const imageNames = ['img1', 'img2', 'img3', 'img4', 'img5','img6','img7','img8'];
    const folder1Path = './img'; // Replace with the path to your first folder
    const folder2Path = './img-text'; // Replace with the path to your second folder
    const selectedImages = [];
    
  
    // Shuffle the image pairs
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    // Shuffle the image names to randomize the selection
    shuffleArray(imageNames);

    const selectedImageNames = imageNames.slice(0, 6);

    
    for (const imageName of selectedImageNames) {
    // Create an array with the corresponding image paths from both folders
    const imagePaths = [`${folder1Path}/${imageName}.png`, `${folder2Path}/${imageName}.png`];

    // Shuffle the image paths to randomize the order
     shuffleArray(imagePaths);

    // Add the shuffled image paths to the selected images array
    selectedImages.push(imagePaths[0], imagePaths[1]);
    }

  
    // Create memory card elements for each image pair
    function createMemoryCards(images) {
      memoryGameContainer.innerHTML = '';
  
      images.forEach((image, index) => {
        const memoryCard = document.createElement('div');
        memoryCard.classList.add('memory-card');
        //in this way the data-framework is the propper name of the img
        memoryCard.dataset.framework = image.split('/')[2];

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = image;
        frontFace.alt = `Image ${index + 1}`;
        const backFace = document.createElement('img');
        backFace.classList.add('back-face');
        backFace.src = '../xano/xano.png'; // Add your back face image path
        backFace.alt = 'Back Face';
        memoryCard.appendChild(frontFace);
        memoryCard.appendChild(backFace);
        memoryGameContainer.appendChild(memoryCard);
      });
    }
  
    
  
    // Use your selectedImages array here to create memory cards
    //here shuflle everything in order to put it random
    createMemoryCards(selectedImages);
    const cards = document.querySelectorAll('.memory-card');

    // Shuffle the cards
    (function shuffle() {
        cards.forEach(card => {
          let randomPos = Math.floor(Math.random() * cards.length);
          card.style.order = randomPos;
        });
      })();
      


    //let's do the fliping part of the game. 

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
        intentosElement.textContent = intentos;
      
        
        checkForMatch();
      }
      
      function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
      
        isMatch ? disableCards() : unflipCards();
      }
      
      
      function unflipCards() {
        isGameLocked = true; // Change to a regular variable
      
        setTimeout(() => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');
      
          resetBoard();
        }, 1000);
      }

      function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
      
        resetBoard();
      }

      function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
      }

      

  // Add a click event listener to each memory card
  const memoryCards = document.querySelectorAll('.memory-card');
  memoryCards.forEach(card => card.addEventListener('click', flipCard));




  let hasShownEndGameMessage = false;


  function resetGame() {
    // Shuffle the image names array
  shuffleArray(imageNames);

  // Create a new array for the selected images
  const selectedImages = [];

  // Iterate over the shuffled image names array and add the corresponding image paths to the selected images array
  for (const imageName of imageNames) {
    const imagePaths = [`${folder1Path}/${imageName}.png`, `${folder2Path}/${imageName}.png`];
    shuffleArray(imagePaths);
    selectedImages.push(imagePaths[0], imagePaths[1]);
  }

  // Iterate over the memory cards array and update the src and data-framework attributes of each memory card based on the selected images array
  const memoryCards = document.querySelectorAll('.memory-card');
  for (let i = 0; i < memoryCards.length; i++) {
    const memoryCard = memoryCards[i];
    const image = selectedImages[i];
    memoryCard.querySelector('.front-face').src = image;
    memoryCard.dataset.framework = image.split('/')[2];
    memoryCard.classList.remove('flip');
  }
  
    intentos = 0;
    intentosElement.textContent = intentos; // Reinicia el contador de intentos
    lockBoard = false;
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
    hasShownEndGameMessage = false;

    removeEndGameMessage();


    for (const memoryCard of memoryCards) {
        memoryCard.addEventListener('click', flipCard);
      }

      
    
  }
  
    reiniciar.addEventListener('click', resetGame);

    const memoryCardsArray = Array.from(memoryCards);
    memoryCardsArray.forEach(card => card.addEventListener('click', function () {
     if (isGameOver()) {
         showEndGameMessage(intentos);
        }
    }));
     




    function isGameOver() {
        const memoryCards = document.querySelectorAll('.memory-card');
        const memoryCardsArray = Array.from(memoryCards);
        return memoryCardsArray.every(card => card.classList.contains('flip'));
      }
   
      // Add a function to show the end game message
      function showEndGameMessage(intentos) {
        const message = `¡Enhorabuena!, has usado ${intentos} intentos`;
        const endGameMessageElement = document.getElementById('end-game-message');
        endGameMessageElement.innerHTML = message;
    
        // Set the flag to true to indicate that the end game message has been shown.
        hasShownEndGameMessage = true;

        endGameMessageElement.style.display = 'block';
    }
     
     
    

     // Add a function to remove the end game message
     function removeEndGameMessage() {
        const endGameMessageElement = document.getElementById('end-game-message');
        endGameMessageElement.innerHTML = ''; // Clear the message
        hasShownEndGameMessage = false;

        endGameMessageElement.style.display = 'none';
    }




  
  
 
    

    
  });
  