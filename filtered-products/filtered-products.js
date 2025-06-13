import '../main/index.js';
import { applyDarkModeToPage } from '../JavaScript/theme.js';
import { setupHeart } from '../JavaScript/mob-products.js';

const urlParams = new URLSearchParams(window.location.search);
const categoryType = urlParams.get('type');
const categoryContainer = document.querySelector('.category');
const categoryTitle = document.getElementById('category-title');
const searchInput = document.getElementById('products-search');



categoryTitle.textContent = categoryType ? categoryType : 'All Products';

let fullProducts = []; // Will hold products fetched from JSON

// Fetch products from JSON file
async function fetchProducts() {
  try {
    const response = await fetch('../JSON/allProducts.json');
    if (!response.ok) throw new Error('Failed to fetch products');
    const products = await response.json();
    fullProducts = products;
    initializePage();
  } catch (error) {
    console.error('Error loading products:', error);
    categoryContainer.innerHTML = '<p>Failed to load products.</p>';
  }
}

// Initialize page after loading products
function initializePage() {
  const filteredProducts = categoryType
    ? fullProducts.filter(p => p.category === categoryType)
    : fullProducts;

  renderProducts(filteredProducts);
  setupSearch(filteredProducts);
}

function createProductCard(product) {
  return `
    <div class="mob-item-card cont-border product-card"
     data-name="${product.name}"
     data-price="${product.price}"
     data-brand="${product.brand}"
     data-image="${product.image}">

  <!-- Product Image -->
  <div class="mob-item-pic cont-border">
    <img class="product-image" src="${product.image}" alt="${product.name}">
  </div>

  <!-- Product Details -->
  <div class="mob-item-details">
    <p class="comp-name">${product.brand}</p>
    <h1 class="mob-item-name">${product.name}</h1>
    <p class="mob-item-price">${product.price}</p>
  </div>

  <!-- Interaction Buttons -->
  <div class="interaction-buttons">
    <div class="heart cont-border"><i class="bi bi-suit-heart"></i></div>
    <div class="mob-add-to-cart cont-border"><i class="bi bi-plus"></i></div>
  </div>
</div>

  `;
}

function renderProducts(productsToRender) {
  if (!categoryContainer) return;
  categoryContainer.innerHTML = productsToRender.map(createProductCard).join('');
  setupInteractivity();


const isDark = localStorage.getItem('darkMode') === 'true';
applyDarkModeToPage(isDark);
setupHeart();

}

function setupInteractivity() {
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


}

function setupSearch(initialFilteredProducts) {
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    const searchedProducts = initialFilteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm)
    );

    renderProducts(searchedProducts);
  });
}

// Start by fetching products from JSON
fetchProducts();
