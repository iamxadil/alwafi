// Main JS File

const homeButton = document.querySelector('.home-button');
const sideMenu = document.querySelector('.side-menu');
const twoBars = document.querySelector('.two-bars-menu');
const cancelButton = document.querySelector('.cancel-btn');
const texts = document.querySelectorAll('h1, a, .bi-person, p, span');
const allButtons = document.querySelectorAll('button');
const allInputs = document.querySelectorAll('input');
const pageBody = document.querySelector('body');
const SearchButton = document.querySelector('.search-button');
const theTwoBars = document.querySelectorAll('.first-bar, .second-bar');
const wafiLogo = document.querySelector('.wafi-logo');
const darkModeButton = document.querySelector('.dark-mode');

// Preloader Animation
function runPreloaderAnimation() {
  window.addEventListener("load", function () {
    setTimeout(() => {
      document.querySelectorAll('.logo-stroke').forEach(path => {
        path.classList.add('filled');
      });

      const preloader = document.getElementById("preloader");
      preloader.style.transition = "opacity 0.5s ease";
      preloader.style.opacity = "0";

      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 2000);
  });
}

runPreloaderAnimation();

// Side menu toggle
if (twoBars && sideMenu && cancelButton) {
  twoBars.addEventListener('click', () => {
    sideMenu.style.display = 'flex';
    sideMenu.style.opacity = '0';
    sideMenu.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      sideMenu.style.opacity = '1';
    }, 10);
  });

  cancelButton.addEventListener('click', () => {
    sideMenu.style.transition = 'opacity 0.5s ease';
    sideMenu.style.opacity = '0';
    setTimeout(() => {
      sideMenu.style.display = 'none';
    }, 500);
  });
}

const productsToggle = document.querySelector('.products-toggle');
if (productsToggle) {
  productsToggle.addEventListener('click', () => {
    document.querySelector('.products-menu').classList.toggle('active');
  });
}

// Load dark mode from localStorage
function loadDarkModePreference() {
  const isDark = localStorage.getItem('darkMode') === 'true';

  if (isDark) {
    pageBody.classList.add('dark-mode-style');
    texts.forEach(text => text.classList.add('dark-text'));
    allButtons.forEach(button => button.classList.add('dark-button'));
    allInputs.forEach(input => input.classList.add('dark-button'));
    theTwoBars.forEach(bar => bar.classList.add('dark-bars'));
    SearchButton.classList.add('dark-search-button');
    homeButton.style.color = 'white';
    wafiLogo.src = '../Assests/Icons/wafi-logo-outline-white.svg';
  } else {
    homeButton.style.color = 'black';
    wafiLogo.src = '../Assests/Icons/wafi-logo-outline.svg';
  }
}

// Dark Mode Toggle
if (darkModeButton) {
  darkModeButton.addEventListener('click', () => {
    const isDark = pageBody.classList.toggle('dark-mode-style');

    texts.forEach(text => text.classList.toggle('dark-text'));
    allButtons.forEach(button => button.classList.toggle('dark-button'));
    allInputs.forEach(input => input.classList.toggle('dark-button'));
    theTwoBars.forEach(bar => bar.classList.toggle('dark-bars'));
    SearchButton.classList.toggle('dark-search-button');

    homeButton.style.color = isDark ? 'white' : 'black';
    wafiLogo.src = isDark
      ? '../Assests/Icons/wafi-logo-outline-white.svg'
      : '../Assests/Icons/wafi-logo-outline.svg';

    localStorage.setItem('darkMode', isDark);
  });
}

// Add to Cart - unified with popup modal
function setupAddToCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();

      const name = button.getAttribute("data-name");
      const price = button.getAttribute("data-price");
      const image = button.getAttribute("data-image");

      const item = { name, price, image, quantity: 1 };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find(i => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();

      // Show popup after adding item to cart
      const cartPopup = document.getElementById("cart-popup");
      cartPopup.querySelector('.popup-content').innerHTML = `
        <p>Item added to cart:</p>
        <div class="popup-item">
          <img src="${image}" alt="${name}" style="width: 100px; height: auto; margin-bottom: 10px;">
          <h2 style="margin: 0;">${name}</h2>
          <p style="margin: 0;">Price: ${Number(price).toLocaleString()} IQD</p>
        </div>
        <div class="popup-buttons">
          <button id="continue-shopping">Continue Shopping</button>
          <a href="../cart/cart.html"><button id="go-to-cart">Go to Cart</button></a>
        </div>
      `;

      // Re-attach event listener for continue shopping button
      document.getElementById("continue-shopping").addEventListener("click", () => {
        cartPopup.style.display = "none";
      });

      cartPopup.style.display = "flex";
    });
  });
}

// Update Cart Count Badge
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count');

  if (badge) {
    if (totalItems > 0) {
      badge.textContent = totalItems;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }
}

// Initialize on DOMContentLoaded

document.addEventListener("DOMContentLoaded", function () {
  loadDarkModePreference();
  updateCartCount();
  setupAddToCartButtons();
});

// Product Card click to pass data and redirect
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const image = card.querySelector('.product-image').src;
    const name = card.dataset.name;
    const price = card.dataset.price;
    const sku = card.dataset.sku;
    const brand = card.dataset.brand;
    const color = card.dataset.color;
    const form = card.dataset.form;

    const productData = {
      image,
      name,
      price,
      sku,
      brand,
      color,
      form
    };

    // Save data to localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(productData));

    // Redirect to product page
    window.location.href = '../product/product.html';
  });
});

// Export for modules
export { wafiLogo, pageBody, darkModeButton, runPreloaderAnimation, SearchButton, setupAddToCartButtons, updateCartCount };
