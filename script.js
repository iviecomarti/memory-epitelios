const imageNames = ['img1', 'img2', 'img3', 'img4', 'img5'];
const folder1Path = '/img'; // Replace with the path to your first folder
const folder2Path = '/img_text'; // Replace with the path to your second folder
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

// Take the first 3 image names from the shuffled array
const selectedImageNames = imageNames.slice(0, 3);

// Iterate through the selected image names
for (const imageName of selectedImageNames) {
  // Create an array with the corresponding image paths from both folders
  const imagePaths = [`${folder1Path}/${imageName}.png`, `${folder2Path}/${imageName}.png`];

  // Shuffle the image paths to randomize the order
  shuffleArray(imagePaths);

  // Add the shuffled image paths to the selected images array
  selectedImages.push(imagePaths[0], imagePaths[1]);
}

console.log(selectedImages);

document.addEventListener('DOMContentLoaded', function() {
    const memoryGameContainer = document.querySelector('.memory-game');
  
    // Define the back face image path
    const backFacePath = '../xano/xano.png';
  
    // Iterate through the selected image pairs
    selectedImages.forEach((imagePath, index) => {
      const memoryCard = document.createElement('div');
      memoryCard.classList.add('memory-card');
  
      // Create the front face image element
      const frontFace = document.createElement('img');
      frontFace.classList.add('front-face');
      frontFace.src = imagePath; // Use the image path from selectedImages
      frontFace.alt = `Image ${index + 1}`;
  
      // Create the back face image element
      const backFace = document.createElement('img');
      backFace.classList.add('back-face');
      backFace.src = backFacePath;
      backFace.alt = 'Back Face';
  
      // Append the front and back faces to the memory card element
      memoryCard.appendChild(frontFace);
      memoryCard.appendChild(backFace);
  
      // Append the memory card to the memory game container
      memoryGameContainer.appendChild(memoryCard);
    });
  });