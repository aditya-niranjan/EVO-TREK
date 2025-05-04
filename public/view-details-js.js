const nameEl = document.getElementById('product-name');
const priceEl = document.getElementById('product-price');
const nextBtn = document.getElementById('next-button');
const mainImg = document.getElementById('main-image');
const blurImg = document.getElementById('blurred-image');
const detailsContainer = document.querySelector('.details-container');



// Get the product ID from localStorage (or handle in another way)
const productId = localStorage.getItem('viewDetailsProductId');

// Fetch both product data and background image mapping
Promise.all([
  fetch('products.json').then(res => res.json()),
  fetch('bg-images.json').then(res => res.json())
]).then(([products, bgImageMap]) => {
  const product = products.find(p => p.id == productId);
  if (!product) return alert("Product not found!");

  nameEl.textContent = product.name;
  priceEl.textContent = `From Rs: ₹${product.price}`;

  const colors = Object.keys(product.images);
  let currentIndex = 0;

  // Function to update the view with the selected color's images and background
  function updateView(index) {
    const currentColor = colors[index];
    const nextColor = colors[(index + 1) % colors.length];

    // Update main and blur images
    mainImg.src = product.images[currentColor];
    blurImg.src = product.images[nextColor];
    blurImg.style.opacity = 0.9;

    // Update background based on the main image color (from bg-images.json)
    const bgImage = bgImageMap[currentColor];
    if (bgImage) {
      detailsContainer.style.backgroundImage = `url(${bgImage})`;
      // detailsContainer.style.backgroundRepeat = 'no-repeat'; // Ensure no repetition
      detailsContainer.style.backgroundSize = '50%'; // Ensure proper size
      // detailsContainer.style.backgroundPosition = 'center right'; // Position at the right
      // detailsContainer.style.transition = 'background-image 0.3s ease-in-out'; // Smooth transition
      // detailsContainer.style.borderRadious = '50%'; 
    }
  }

  


  updateView(currentIndex);



let hasClickedOnce = false;

// Initial view setup


nextBtn.addEventListener('click', () => {
  if (!hasClickedOnce) {
    hasClickedOnce = true;

  }

  


  // Step 1: Animate blur image to become next main (scale + move + fade)
  blurImg.style.transition = "all 0.6s ease-in";
  blurImg.style.transform = "scaleX(-1) rotate(13deg) scale(2.9)";
  blurImg.style.right = "38%";
  blurImg.style.top = "35%";
  blurImg.style.opacity = 1;
  // blurImg.style.filter = 'blur(0px)';

  // Step 2: Fade out main image
  mainImg.style.transition = "opacity all 0.9s ease-out";
  mainImg.style.opacity = 0.1;
  mainImg.style.scale = 0.9;


  // Step 3: After animation, update view
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % colors.length;

    // Swap main and blur image sources
    mainImg.src = blurImg.src;



    // Update blur image to the next one
    const nextColor = colors[(currentIndex + 1) % colors.length];
    blurImg.src = product.images[nextColor];

    // Reset blur position
    blurImg.style.transition = "none";
    blurImg.style.transform = "scaleX(-1) rotate(8deg) scale(0.9)";
    blurImg.style.right = "06%";
    blurImg.style.top = "0%";
    blurImg.style.opacity = 0.7;
    blurImg.style.filter = "blur(03px)";

    

    // Force reflow for instant reset
    void blurImg.offsetWidth;

    // Show main image again
    mainImg.style.transition = "opacity 0.7s ease";
    mainImg.style.opacity = 1;

    // Update background
    updateView(currentIndex);
  }, 600);
});
});

