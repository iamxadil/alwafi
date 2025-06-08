

// DOM Selectors
const sideMenu = document.querySelector('.side-menu');
const cancelButton = document.querySelector('.cancel-btn');
const twoBars = document.querySelectorAll('.two-bars-menu');
const darkModeButton = document.querySelectorAll('.dark-mode');
const wafiLogos = document.querySelectorAll('.wafi-logo');
const pageBody = document.querySelector('body');
const SearchButton = document.querySelector('.search-button');
const homeButton = document.querySelector('.home-button');
const sliderBorders = document.querySelectorAll('.slider-border');
const contBorders = document.querySelectorAll('.cont-border');

// Preloader Styling Based on Dark Mode
(function applyPreloaderDarkBackground() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  const preloader = document.getElementById('preloader');

  if (preloader) {
    preloader.style.backgroundColor = isDark ? '#121212' : '#ffffff';
    const svgPaths = preloader.querySelectorAll('.logo-stroke');
    svgPaths.forEach(path => {
      path.style.stroke = isDark ? 'white' : 'black';
      path.style.fill = 'none';
    });
  }
})();

// Preloader Animation
function runPreloaderAnimation() {
  window.addEventListener("load", function () {
    setTimeout(() => {
      document.querySelectorAll('.logo-stroke').forEach(path => {
        path.classList.add('filled');
      });

      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.style.transition = "opacity 0.5s ease";
        preloader.style.opacity = "0";

        setTimeout(() => {
          preloader.style.display = "none";
        }, 200);
      }
    }, 1500);
  });
}
runPreloaderAnimation();

// Side Menu Toggle
twoBars.forEach(bar => {
  bar.addEventListener('click', () => {
    if (!sideMenu) return;
    sideMenu.style.display = 'flex';
    sideMenu.style.opacity = '0';
    sideMenu.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      sideMenu.style.opacity = '1';
    }, 10);
  });
});

if (cancelButton && sideMenu) {
  cancelButton.addEventListener('click', () => {
    sideMenu.style.transition = 'opacity 0.5s ease';
    sideMenu.style.opacity = '0';
    setTimeout(() => {
      sideMenu.style.display = 'none';
    }, 500);
  });
}

// Toggle products sub-menu
const productsToggle = document.querySelector('.products-toggle');
if (productsToggle) {
  productsToggle.addEventListener('click', () => {
    const menu = document.querySelector('.products-menu');
    if (menu) {
      menu.classList.toggle('active');
    }
  });
}

// Load dark mode from localStorage
function loadDarkModePreference() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  const texts = document.querySelectorAll('h1, a, .bi-person, p, span, .name, .price, .cart-item, .quantity-controls, .remove-btn, i');
  const allButtons = document.querySelectorAll('button');
  const allInputs = document.querySelectorAll('input');
  const theTwoBars = document.querySelectorAll('.first-bar, .second-bar');
  const labels = document.querySelectorAll('label');
  const citySelect = document.querySelector('#citySelect');
  const contBorders = document.querySelectorAll('.cont-border');
  const sliderBorders = document.querySelectorAll('.slider-border')
  const filterButton = document.querySelector('.filter-button');
  
  if (isDark) {
    pageBody?.classList.add('dark-mode-style');
    texts.forEach(t => t.classList.add('dark-text'));
    allButtons.forEach(b => b.classList.add('dark-button'));
    allInputs.forEach(i => i.classList.add('dark-button'));
    theTwoBars.forEach(bar => bar.classList.add('dark-bars'));
    labels.forEach(label => label.classList.add('dark-label'));
    contBorders.forEach(border => border.classList.add('dark-border'));
    sliderBorders.forEach(slider => slider.classList.add('dark-border'));
    citySelect?.classList.add('dark-border');
    SearchButton?.classList.add('dark-search-button');
    filterButton.classList.add('dark-border');

    if (homeButton) homeButton.style.color = 'white';
    wafiLogos.forEach(logo => {
      logo.src = '../Assests/Icons/wafi-logo-outline-white.svg';
    });
  } else {
    homeButton.style.color = 'black';
    wafiLogos.forEach(logo => {
      logo.src = '../Assests/Icons/wafi-logo-outline.svg';
    });
  }

  console.log('[Dark Mode] Loaded preference:', isDark);
}

// Toggle dark mode manually
darkModeButton.forEach(button => {
  button.addEventListener('click', () => {
    const isDark = pageBody.classList.toggle('dark-mode-style');
    const texts = document.querySelectorAll('h1, a, .bi-person, p, span, .name, .price, .cart-item, .quantity-controls, .remove-btn, i');
    const allButtons = document.querySelectorAll('button');
    const allInputs = document.querySelectorAll('input');
    const theTwoBars = document.querySelectorAll('.first-bar, .second-bar');
    const filterButton = document.querySelector('.filter-button');
    const contBorders = document.querySelectorAll('.cont-border');

    sliderBorders.forEach(slider => slider.classList.toggle('dark-border'));
    texts.forEach(t => t.classList.toggle('dark-text'));
    allButtons.forEach(b => b.classList.toggle('dark-button'));
    allInputs.forEach(i => i.classList.toggle('dark-button'));
    theTwoBars.forEach(bar => bar.classList.toggle('dark-bars'));
    SearchButton?.classList.toggle('dark-search-button');
    homeButton.style.color = isDark ? 'white' : 'black';
    filterButton.classList.toggle('dark-border');
    contBorders.forEach(border => border.classList.toggle('dark-border'));

    wafiLogos.forEach(logo => {
      logo.src = isDark
        ? '../Assests/Icons/wafi-logo-outline-white.svg'
        : '../Assests/Icons/wafi-logo-outline.svg';
    });

    localStorage.setItem('darkMode', isDark);
  });
});

// Update Cart Badge
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count');
  if (!badge) return;

  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

// Setup Add to Cart
function setupAddToCartButtons() {
  document.body.addEventListener('click', (e) => {
    const button = e.target.closest('.add-to-cart');
    if (!button) return;

    // Prevent product card redirection
    e.stopPropagation();
    e.preventDefault();

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
    document.getElementById("continue-shopping").onclick = () => {
      cartPopup.style.display = "none";
    };
    cartPopup.style.display = "flex";
  });
}

// Product Card Navigation (ignore clicks from buttons inside)
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart')) return; // Prevent if add-to-cart is clicked

    const image = card.querySelector('.product-image').src;
    const name = card.dataset.name;
    const price = card.dataset.price;
    const sku = card.dataset.sku;
    const brand = card.dataset.brand;
    const color = card.dataset.color;
    const form = card.dataset.form;

    const productData = { image, name, price, sku, brand, color, form };
    localStorage.setItem('selectedProduct', JSON.stringify(productData));
    window.location.href = '../product/product.html';
  });
});

// Fav Item Toggle
document.querySelectorAll('.heart').forEach(heart => {
  heart.addEventListener('click', () => {
    const icon = heart.querySelector('i');
    icon.classList.toggle('bi-suit-heart');
    icon.classList.toggle('bi-suit-heart-fill');
  });
});

// Search Input Handling and Filtering Products by Category, Name, or Company
const searchInput = document.getElementById('products-search');
const productsContainer = document.querySelector('.discover-section .mob-items-container');

// Your full product list with category
const fullProducts = [
  { company: 'Asus', name: 'ROG STRIX G16', price: '2.000.000 IQD', img: 'Assests/Images/laptop-img.png', category: 'laptop' },
  { company: 'Fantech', name: 'WH06 WIRELESS', price: '75.000 IQD', img: 'Assests/Images/Headphone.png', category: 'headphone' },
  { company: 'Microsoft', name: 'XBOX JOYSTICK', price: '50.000 IQD', img: 'Assests/Images/Xbox-One-Controller.png', category: 'joystick' },
  { company: 'Apple', name: 'MacBook Air', price: '3.000.000 IQD', img: 'Assests/Images/macbook-air.png', category: 'laptop' },
  { company: 'Logitech', name: 'MX Master 3', price: '150.000 IQD', img: 'Assests/Images/mx-master3.png', category: 'mouse' },
  // Add more products here...
];

// Create product card HTML
function createProductCard(product) {
  return `
    <div class="mob-item-card cont-border">
      <div class="mob-item-pic cont-border">
        <img src="${product.img}" alt="${product.name}">
      </div>
      <div class="mob-item-details">
        <p class="comp-name">${product.company}</p>
        <h1 class="mob-item-name">${product.name}</h1>
        <p class="mob-item-price">${product.price}</p>
        <div class="heart">
          <i class="bi bi-suit-heart"></i>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(products) {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    productsContainer.innerHTML += createProductCard(product);
  });
}


// Initial render - only first 4 products
renderProducts(fullProducts.slice(0, 4));

// Search event
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  if (query === '') {
    // Show only first 4 products if input empty
    renderProducts(fullProducts.slice(0, 4));
  } else {
    // Filter products by name, company, or category
    const filteredProducts = fullProducts.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.company.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
    renderProducts(filteredProducts);
  }
});

// Init
document.addEventListener("DOMContentLoaded", function () {
  loadDarkModePreference();
  updateCartCount();
  setupAddToCartButtons();

  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      history.back();
    });
  });
});

// Export (if using modules)
export {
  wafiLogos,
  pageBody,
  darkModeButton,
  runPreloaderAnimation,
  SearchButton,
  setupAddToCartButtons,
  updateCartCount
};
