// mob-products.js
import { applyDarkModeToPage } from './theme.js';
const productsContainer = document.querySelector('.discover-section .mob-items-container');


// product list
const fullProducts = [
  { company: 'Asus', name: 'ROG STRIX G16', price: '2.000.000 IQD', img: 'Assests/Images/laptop-img.png', category: 'laptop' },
  { company: 'Fantech', name: 'WH06 WIRELESS', price: '75.000 IQD', img: 'Assests/Images/Headphone.png', category: 'headphone' },
  { company: 'Microsoft', name: 'XBOX JOYSTICK', price: '50.000 IQD', img: 'Assests/Images/Xbox-One-Controller.png', category: 'joystick' },
  { company: 'Apple', name: 'MacBook Air', price: '3.000.000 IQD', img: 'Assests/Images/macbook-air.png', category: 'laptop' },
  { company: 'Logitech', name: 'MX Master 3', price: '150.000 IQD', img: 'Assests/Images/mx-master3.png', category: 'mouse' },
];

function createProductCard(product) {
  return `
    <div class="mob-item-card cont-border product-card"
         data-name="${product.name}"
         data-price="${product.price}"
         data-brand="${product.company}"
         data-image="${product.img}">

      <div class="mob-item-pic cont-border">
        <img class="product-image" src="${product.img}" alt="${product.name}">
      </div>

      <div class="mob-item-details">
        <p class="comp-name">${product.company}</p>
        <h1 class="mob-item-name">${product.name}</h1>
        <p class="mob-item-price">${product.price}</p>
      </div>

      <div class="interaction-buttons">
        <div class="heart cont-border"><i class="bi bi-suit-heart"></i></div>
        <div class="mob-add-to-cart cont-border"><i class="bi bi-plus"></i></div>
      </div>

    </div>
  `;
}



function renderProducts(products) {
  if (!productsContainer) return;
  productsContainer.innerHTML = '';
  products.forEach(p => productsContainer.innerHTML += createProductCard(p));

  const isDark = localStorage.getItem('darkMode') === 'true';
  applyDarkModeToPage(isDark);

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.heart')) return; // allow heart click without navigating
      const imageEl = card.querySelector('.product-image');
      if (!imageEl) return;

      const image = imageEl.src;
      const { name, price, brand } = card.dataset;
      localStorage.setItem('selectedProduct', JSON.stringify({ image, name, price, brand }));
      window.location.href = '../product/product.html';
    });
  });

  }

  function setupHeart() {
    document.querySelectorAll('.heart').forEach(heart => {
      heart.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = heart.querySelector('i');
        icon.classList.toggle('bi-suit-heart');
        icon.classList.toggle('bi-suit-heart-fill');
      });
    });
  }

function setupSearch() {
  const searchInput = document.getElementById('products-search');
  
  if (!searchInput) return;
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = query === ''
      ? fullProducts.slice(0, 4)
      : fullProducts.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.company.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );

    renderProducts(filtered);
    setupHeart();
  });
}




function initProducts() {
  renderProducts(fullProducts.slice(0, 4));
  setupSearch();
  setupHeart();
}

export {
  initProducts,
  renderProducts,
  setupHeart
};
