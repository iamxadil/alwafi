import '../main/index.js';
import { applyDarkModeToPage } from '../JavaScript/theme.js';

const urlParams = new URLSearchParams(window.location.search);
const categoryType = urlParams.get('type');

const categoryContainer = document.querySelector('.category');
const categoryTitle = document.getElementById('category-title');

categoryTitle.textContent = categoryType ? categoryType : 'All Products';

const products = [
  { name: "ROG STRIX G16", brand: "Asus", price: "2.000.000 IQD", image: "../Assests/Images/laptop-img.png", category: "laptops" },
  { name: "ROG STRIX G16", brand: "Asus", price: "2.000.000 IQD", image: "../Assests/Images/laptop-img.png", category: "laptops" },
  { name: "WH06 WIRELESS", brand: "Fantech", price: "75.000 IQD", image: "../Assests/Images/Headphone.png", category: "headphones" },
  { name: "XBOX JOYSTICK", brand: "Microsoft", price: "50.000 IQD", image: "../Assests/Images/Xbox-One-Controller.png", category: "joysticks" },
];

const filteredProducts = categoryType
  ? products.filter(p => p.category === categoryType)
  : products;

// Clear all children except the title
Array.from(categoryContainer.children).forEach(child => {
  if (child.id !== 'category-title') categoryContainer.removeChild(child);
});

filteredProducts.forEach(product => {
  const card = document.createElement('div');
  card.className = 'mob-item-card cont-border product-card';
  card.dataset.name = product.name;
  card.dataset.price = product.price;
  card.dataset.brand = product.brand;
  card.dataset.image = product.image;

  card.innerHTML = `
    <div class="mob-item-pic cont-border">
      <img class="product-image" src="${product.image}" alt="${product.name}">
    </div>
    <div class="mob-item-details">
      <p class="comp-name">${product.brand}</p>
      <h1 class="mob-item-name">${product.name}</h1>
      <p class="mob-item-price">${product.price}</p>
      <div class="heart"><i class="bi bi-suit-heart"></i></div>
    </div>
  `;

  categoryContainer.appendChild(card);
});

// Apply dark mode
const isDark = localStorage.getItem('darkMode') === 'true';
applyDarkModeToPage(isDark);

// Handle heart toggle
document.querySelectorAll('.heart').forEach(heart => {
  heart.addEventListener('click', (e) => {
    e.stopPropagation();
    const icon = heart.querySelector('i');
    icon.classList.toggle('bi-suit-heart');
    icon.classList.toggle('bi-suit-heart-fill');
  });
});

// Handle navigation to product.html
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('.heart')) return;
    const imageEl = card.querySelector('.product-image');
    if (!imageEl) return;

    const image = imageEl.src;
    const { name, price, brand } = card.dataset;
    localStorage.setItem('selectedProduct', JSON.stringify({ image, name, price, brand }));
    window.location.href = '../product/product.html';
  });
});
