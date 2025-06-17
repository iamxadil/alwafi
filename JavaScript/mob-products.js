import { applyDarkModeToPage } from './theme.js';
import { filterButton } from './filter-button.js';
import { setupPagination } from './pagination.js';  // your separate pagination module

const productsContainer = document.querySelector('.discover-section .mob-items-container');
const searchInput = document.getElementById('products-search');
const PRODUCTS_PER_PAGE = 4;

let allProducts = [];
let currentPage = 1;
let filteredProducts = [];

// Create product card HTML
function createProductCard(product) {
  return `
    <div class="mob-item-card cont-border product-card"
         data-name="${product.name}"
         data-price="${product.price}"
         data-brand="${product.brand}"
         data-image="${product.image}">
      <div class="mob-item-pic cont-border">
        <img class="product-image" src="${product.image}" alt="${product.name}">
      </div>
      <div class="mob-item-details">
        <p class="comp-name">${product.brand}</p>
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

// Render products for current page
function renderProducts(products, page = 1) {
  if (!productsContainer) return;
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(start, end);

  productsContainer.innerHTML = paginatedProducts.map(createProductCard).join('');

  const isDark = localStorage.getItem('darkMode') === 'true';
  applyDarkModeToPage(isDark);

  setupHearts();
  setupProductClicks();
}

// Setup heart icon toggle
 function setupHearts() {
  document.querySelectorAll('.heart').forEach(heart => {
    heart.addEventListener('click', (e) => {
      e.stopPropagation();
      const icon = heart.querySelector('i');
      icon.classList.toggle('bi-suit-heart');
      icon.classList.toggle('bi-suit-heart-fill');
    });
  });
}

// Setup product card clicks for navigation
function setupProductClicks() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.heart')) return; // ignore heart clicks
      const imageEl = card.querySelector('.product-image');
      if (!imageEl) return;

      const image = imageEl.src;
      const { name, price, brand } = card.dataset;
      localStorage.setItem('selectedProduct', JSON.stringify({ image, name, price, brand }));
      window.location.href = '../product/product.html';
      filterButton();
    });
  });
}

// Filter products by search query
function filterProducts(query) {
  if (!query) return allProducts;
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}

// Setup search input event
function setupSearch() {
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    filteredProducts = filterProducts(query);
    currentPage = 1;
    renderProducts(filteredProducts, currentPage);
    setupPagination(filteredProducts.length, PRODUCTS_PER_PAGE, currentPage, onPageChange);
  });
}

// Handle page change event
function onPageChange(page) {
  currentPage = page;
  renderProducts(filteredProducts, currentPage);
  setupPagination(filteredProducts.length, PRODUCTS_PER_PAGE, currentPage, onPageChange);
}

// Initialization
async function initProducts() {
  try {
    const res = await fetch('../JSON/allProducts.json');
    allProducts = await res.json();

    filteredProducts = allProducts;
    currentPage = 1;

    renderProducts(filteredProducts, currentPage);

    setupSearch();

    setupPagination(filteredProducts.length, PRODUCTS_PER_PAGE, currentPage, onPageChange);

    filterButton();

  } catch (error) {
    console.error('Failed to load products:', error);
  }
}

document.addEventListener('DOMContentLoaded', initProducts);

export { initProducts, setupHearts };
